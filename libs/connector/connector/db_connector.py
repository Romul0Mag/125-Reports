import csv
import os
from io import StringIO
from typing import TYPE_CHECKING, Iterable, List, Optional

import pg8000
from google.cloud.sql.connector import Connector, IPTypes
from sqlalchemy import create_engine, engine

if TYPE_CHECKING:
    import pandas

# connect_with_connector_auto_iam_authn initializes a connection pool for
# a Cloud SQL instance of Postgres using the Cloud SQL Python Connector
# with Automatic IAM Database Authentication.


def connect_with_iam(
    db_iam_user: Optional[str] = None,
    instance_connection_name: Optional[str] = None,
    db_name: Optional[str] = None,
    db_config: dict = {},
) -> engine.base.Engine:
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.
    instance_connection_name = (
        instance_connection_name or os.environ["INSTANCE_CONNECTION_NAME"]
    )  # e.g. 'project:region:instance'
    db_iam_user = (
        db_iam_user or os.environ["DB_IAM_USER"]
    )  # e.g. 'sa-name@project-id.iam'
    db_name = db_name or os.environ["DB_NAME"]  # e.g. 'my-database'

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_iam_user,
            db=db_name,
            enable_iam_auth=True,
            ip_type=ip_type,
        )
        return conn

    # The Cloud SQL Python Connector can be used with SQLAlchemy
    # using the 'creator' argument to 'create_engine'
    pool = create_engine(
        "postgresql+pg8000://",
        creator=getconn,
        **db_config
        # ...
    )
    return pool


def connect_with_unixsocket(db_config: dict = {}) -> engine.base.Engine:
    # [START cloud_sql_postgres_sqlalchemy_create_socket]
    # Remember - storing secrets in plaintext is potentially unsafe. Consider using
    # something like https://cloud.google.com/secret-manager/docs/overview to help keep
    # secrets secret.
    db_user = os.environ["DB_USER"]
    db_pass = os.environ["DB_PASS"]
    db_name = os.environ["DB_NAME"]
    db_socket_dir = os.environ.get("DB_SOCKET_DIR", "/cloudsql")
    instance_connection_name = os.environ["INSTANCE_CONNECTION_NAME"]

    pool = create_engine(
        # Equivalent URL:
        # postgresql+pg8000://<db_user>:<db_pass>@/<db_name>
        #                         ?unix_sock=<socket_path>/<cloud_sql_instance_name>/.s.PGSQL.5432
        # Note: Some drivers require the `unix_sock` query parameter to use a different key.
        # For example, 'psycopg2' uses the path set to `host` in order to connect successfully.
        engine.url.URL.create(
            drivername="postgresql+pg8000",
            username=db_user,  # e.g. "my-database-user"
            password=db_pass,  # e.g. "my-database-password"
            database=db_name,  # e.g. "my-database-name"
            query={
                "unix_sock": "{}/{}/.s.PGSQL.5432".format(
                    db_socket_dir, instance_connection_name  # e.g. "/cloudsql"
                )  # i.e "<PROJECT-NAME>:<INSTANCE-REGION>:<INSTANCE-NAME>"
            },
        ),
        **db_config,
    )
    # [END cloud_sql_postgres_sqlalchemy_create_socket]
    pool.dialect.description_encoding = None
    return pool


def init_connection_engine(
    db_iam_user: Optional[str] = None,
    instance_connection_name: Optional[str] = None,
    db_name: Optional[str] = None,
    method: str = "iam",
    **kwargs: str,
) -> engine.base.Engine:
    pool_size = kwargs.get("pool_size")
    pool_timeout = kwargs.get("pool_timeout")
    db_config = {
        # [START cloud_sql_postgres_sqlalchemy_limit]
        # Pool size is the maximum number of permanent connections to keep.
        "pool_size": pool_size or 5,
        # Temporarily exceeds the set pool_size if no connections are available.
        "max_overflow": 2,
        # The total number of concurrent connections for your application will be
        # a total of pool_size and max_overflow.
        # [END cloud_sql_postgres_sqlalchemy_limit]
        # [START cloud_sql_postgres_sqlalchemy_backoff]
        # SQLAlchemy automatically uses delays between failed connection attempts,
        # but provides no arguments for configuration.
        # [END cloud_sql_postgres_sqlalchemy_backoff]
        # [START cloud_sql_postgres_sqlalchemy_timeout]
        # 'pool_timeout' is the maximum number of seconds to wait when retrieving a
        # new connection from the pool. After the specified amount of time, an
        # exception will be thrown.
        "pool_timeout": pool_timeout or 30,  # 30 seconds
        # [END cloud_sql_postgres_sqlalchemy_timeout]
        # [START cloud_sql_postgres_sqlalchemy_lifetime]
        # 'pool_recycle' is the maximum number of seconds a connection can persist.
        # Connections that live longer than the specified amount of time will be
        # reestablished
        "pool_recycle": 1800,  # 30 minutes
        # [END cloud_sql_postgres_sqlalchemy_lifetime]
    }

    match method:
        case "iam":
            return connect_with_iam(
                db_iam_user, instance_connection_name, db_name, db_config
            )
        case "unixsocket":
            return connect_with_unixsocket(db_config)
        case _:
            raise ValueError('Use "iam" or "unixsocket" for method')


def pg8000_insert_copy(
    table: "pandas.io.sql.SQLTable",
    conn: engine.base.Connection,
    keys: List[str],
    data_iter: Iterable,
) -> None:
    """
    Execute SQL statement inserting data

    Parameters
    ----------
    table : pandas.io.sql.SQLTable
    conn : sqlalchemy.engine.Engine or sqlalchemy.engine.Connection
    keys : list of str
        Column names
    data_iter : Iterable that iterates the values to be inserted
    """
    # gets a DBAPI connection that can provide a cursor
    dbapi_conn = conn.connection
    cur = dbapi_conn.cursor()
    s_buf = StringIO()
    writer = csv.writer(s_buf)
    writer.writerows(data_iter)
    s_buf.seek(0)

    columns = ", ".join(['"{}"'.format(k) for k in keys])
    if table.schema:
        table_name = "{}.{}".format(table.schema, table.name)
    else:
        table_name = table.name

    sql = "COPY {} ({}) FROM STDIN WITH CSV".format(table_name, columns)
    cur.execute(sql, stream=s_buf)

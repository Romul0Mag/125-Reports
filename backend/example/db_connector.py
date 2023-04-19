import models
from connector import init_connection_engine, pg8000_insert_copy
import pandas as pd
from sqlalchemy.orm import Session, sessionmaker

def get_session() -> Session:
    """
    To config DB settings, set:
    DB_IAM_USER, DB_NAME and INSTANCE_CONNECTION_NAME
    """
    """
    TODO: You can set pool_size=1, pool_timeout=30 after rebasing with changes in
    START-344
    """
    engine = init_connection_engine()
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def insert_dataframe_users(
    df: pd.DataFrame,
    session: Session,
) -> None:
    
    df.to_sql(
        models.Users.__tablename__,
        session.connection(),
        if_exists="append",
        method=pg8000_insert_copy,
        index=False,
    )

def get_user_id(email: str, session: Session) -> str:
    row = session.query(models.Users).filter(models.Users.email == email).first()

    if row is None:
        raise ValueError("Could not find user email")
    
    return row["user_id"]

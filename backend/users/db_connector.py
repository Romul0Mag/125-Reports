import models
from connector import init_connection_engine, pg8000_insert_copy
import pandas as pd
from sqlalchemy.orm import sessionmaker


class Db:
    def __init__(self) -> None:
        """
        To config DB settings, set the following env vars:
        DB_IAM_USER, DB_NAME and INSTANCE_CONNECTION_NAME
        """
        self.engine = init_connection_engine()
        self.session = sessionmaker(bind=self.engine)()
    
    def insert_dataframe_users(self, df: pd.DataFrame) -> None:
        df.to_sql(
            models.Users.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_user_from_user_email(self, user_email: str):
        row = self.session.query(models.Users).filter(models.Users.email == user_email).order_by(models.Users.created_at.desc()).first()
        return row
    
    def get_users_from_user_email(self, user_email: str):
        rows = self.session.query(models.Users).filter(models.Users.email == user_email).all()
        return rows
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

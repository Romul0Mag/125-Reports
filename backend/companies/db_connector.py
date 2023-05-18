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
    
    def insert_dataframe_companies(self, df: pd.DataFrame) -> None:
        df.to_sql(
            models.Companies.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_company_from_address_id(self, address_id: str):
        row = self.session.query(models.Companies).filter(models.Companies.address_id == address_id).order_by(models.Companies.created_at.desc()).first()
        return row
    
    def get_company_from_company_name(self, company_name: str):
        rows = self.session.query(models.Companies).filter(models.Companies.name == company_name).all()
        return rows
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

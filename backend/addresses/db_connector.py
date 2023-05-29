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
    
    def insert_dataframe_addresses(self, df: pd.DataFrame) -> None:
        df.to_sql(
            models.Addresses.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_address_from_cep(self, cep: str):
        row = self.session.query(models.Addresses).filter(models.Addresses.cep == cep).first()
        return row
    
    def get_addresses_from_cep(self, cep: str):
        rows = self.session.query(models.Addresses).filter(models.Addresses.cep == cep).all()
        return rows

    def get_address_from_company_name(self, company_name):
        row = self.session.query(models.Addresses).join(models.Companies, models.Companies.address_id==models.Addresses.address_id).filter(models.Companies.name == company_name).first()
        return row
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

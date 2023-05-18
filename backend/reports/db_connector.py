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
    
    def insert_dataframe_reports(self, df: pd.DataFrame) -> None:
        df.to_sql(
            models.Reports.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_report_from_equipment_id(self, equipment_id: str):
        row = self.session.query(models.Reports).filter(models.Reports.equipment_id == equipment_id).order_by(models.Reports.created_at.desc()).first()
        return row
    
    def get_report_from_company_name(self, company_name: str):
        rows = self.session.query(models.Reports).join(models.Companies, models.Companies.company_id == models.Reports.company_id).filter(models.Companies.name == company_name).all()
        return rows
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

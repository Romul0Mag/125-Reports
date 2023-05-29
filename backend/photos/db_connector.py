import models
from connector import init_connection_engine, pg8000_insert_copy
import pandas as pd
from sqlalchemy.orm import sessionmaker


class Db:
    model = models.Photos
    def __init__(self) -> None:
        """
        To config DB settings, set the following env vars:
        DB_IAM_USER, DB_NAME and INSTANCE_CONNECTION_NAME
        """
        self.engine = init_connection_engine()
        self.session = sessionmaker(bind=self.engine)()
    
    def insert_dataframe(self, df: pd.DataFrame) -> None:
        df.to_sql(
            self.model.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_photos_from_report_id(self, report_id: str):
        rows = self.session.query(self.model).filter(self.model.report_id == report_id, self.model.is_active.is_(True)).order_by(self.model.created_at.desc()).all()
        return rows

    def get_photos_from_user_id(self, user_id: str):
        rows = self.session.query(self.model).join(models.Reports, models.Reports.report_id==self.model.report_id).filter(models.Reports.user_id == user_id, self.model.is_active.is_(True)).order_by(self.model.created_at.desc()).all()
        return rows

    def get_photos_from_company_name(self, company_name: str):
        rows = self.session.query(self.model).join(models.Reports, models.Reports.report_id==self.model.report_id).join(models.Companies, models.Companies.company_id==models.Reports.company_id).filter(models.Companies.name == company_name, self.model.is_active.is_(True)).order_by(self.model.created_at.desc()).all()
        return rows
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

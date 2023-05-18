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
    
    def insert_dataframe_equipment(self, df: pd.DataFrame) -> None:
        df.to_sql(
            models.Equipments.__tablename__,
            self.session.connection(),
            if_exists="append",
            method=pg8000_insert_copy,
            index=False,
        )

    def get_equipment_from_series_number(self, series_number: str):
        row = self.session.query(models.Equipments).filter(models.Equipments.series_number == series_number).order_by(models.Equipments.created_at.desc()).first()
        return row
    
    def get_equipments_from_series_number(self, series_number: str):
        rows = self.session.query(models.Equipments).filter(models.Equipments.series_number == series_number).all()
        return rows
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

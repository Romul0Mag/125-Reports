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

    def get_report_from_equipment_id(self, equipment_id: str) -> str:
        row = self.session.query(models.Reports).filter(models.Reports.equipment_id == equipment_id).first()
        return row
    
    def commit(self) -> None:
        self.session.commit()

    def rollback(self) -> None:
        self.session.rollback()

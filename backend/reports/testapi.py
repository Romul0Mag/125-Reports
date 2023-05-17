from fastapi.testclient import TestClient
from main import app  # assuming your FastAPI app is named "app" and in the "main.py" file
import pandas as pd
import uuid

client = TestClient(app)

def test_create_report():
    report_data = {
        "company_id": str(uuid.uuid4()),
        "equipment_id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "type": "preventiva"
    }  # replace with actual fields of your ReportCreate model
    response = client.post("/reports/", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["company_id"] == report_data["company_id"]
    assert data["equipment_id"] == report_data["equipment_id"]
    assert data["user_id"] == report_data["user_id"]
    assert data["type"] == report_data["type"]


test_create_report()
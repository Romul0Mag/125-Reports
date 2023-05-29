from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

client = TestClient(app)

def test_create_report():
    report_data = {
        "company_id": '99950f0a-6eac-408a-8b5a-1302b1d572b0',
        "equipment_id": 'c8229bbc-2fb2-4f1d-bc01-0dba8490a569',
        "user_id": '678ad847-65be-40f6-9c61-348b9e99f29a',
        "type": "preventiva"
    } 
    response = client.post("/reports/", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["company_id"] == report_data["company_id"]
    assert data["equipment_id"] == report_data["equipment_id"]
    assert data["user_id"] == report_data["user_id"]
    assert data["type"] == report_data["type"]


def test_read_report():
    name = "PiriEnterprise"
    response = client.get(f"/reports/company_name={name}")
    assert response.status_code == 200
    data = response.json()
    #assert data["name"] == name
    for object in data:
        print(object["report_id"])

#test_create_report()

test_read_report()
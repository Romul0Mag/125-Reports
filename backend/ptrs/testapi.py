from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

def test_create_ptr():
    report_data = {
        "report_id": '7ce7f290-32f4-4bce-8504-a7eca3542d23',
        "tension": 23.4,
        "resistence": 1.11,
    }
    response = client.post("/ptrs/", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["report_id"] == report_data["report_id"]
    assert data["tension"] == report_data["tension"]
    assert data["resistence"] == report_data["resistence"]

def test_read_ptrs():
    name = "PiriEnterprise"
    response = client.get(f"/ptrs/company_name={name}")
    assert response.status_code == 200
    data = response.json()
    for object in data:
        print(object["ptr_id"])

test_create_ptr()

test_read_ptrs()
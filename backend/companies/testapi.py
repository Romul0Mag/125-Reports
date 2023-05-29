from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

client = TestClient(app)

def test_create_company():
    report_data = {
        "address_id": 'b21dc5e6-c8d3-4a16-8e13-061e89a6a448',
        "name": '125Enterteinment',
        "phone_number": '12999999999',
    }
    response = client.post("/companies/", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["address_id"] == report_data["address_id"]
    assert data["name"] == report_data["name"]
    assert data["phone_number"] == report_data["phone_number"]


def test_read_company():
    name = "PiriEnterprise"
    response = client.get(f"/companies/company_name={name}")
    assert response.status_code == 200
    data = response.json()
    for object in data:
        print(object["company_id"])

#test_create_company()

test_read_company()
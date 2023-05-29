from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

def test_create_equipment():
    equipments_data = {
        "manufacturer": 'Equipment_manufacturer2',
        "model": 'Equipment_model2',
        "power": 'Equipment_power2',
        "series_number": "Equipment_series_number2",
        "fabrication_date": "10/11/2021"
    } 
    response = client.post("/equipments/", json=equipments_data)
    assert response.status_code == 200
    data = response.json()
    assert data["manufacturer"] == equipments_data["manufacturer"]
    assert data["model"] == equipments_data["model"]
    assert data["power"] == equipments_data["power"]
    assert data["series_number"] == equipments_data["series_number"]


def test_read_equipment():
    series_number = "Equipment_series_number"
    response = client.get(f"/equipments/{series_number}")
    assert response.status_code == 200
    data = response.json()
    #assert data["name"] == name
    for object in data:
        print(object["manufacturer"])

test_create_equipment()

test_read_equipment()
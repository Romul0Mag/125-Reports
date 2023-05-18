from fastapi.testclient import TestClient
from main import app  # assuming your FastAPI app is named "app" and in the "main.py" file
import pandas as pd
import uuid

client = TestClient(app)

def test_create_address():
    address_data = {
        "address_id": 'b21dc5e6-c8d3-4a16-8e13-061e89a6a448',
        "street": 'H8A',
        "city": 'São José dos Campos',
        "state": "SP",
        "cep": '12228-460',
        "country": 'BR'
    } 
    response = client.post("/addresses/", json=address_data)
    assert response.status_code == 200
    data = response.json()
    assert data["address_id"] == address_data["address_id"]
    assert data["street"] == address_data["street"]
    assert data["city"] == address_data["city"]
    assert data["state"] == address_data["state"]
    assert data["cep"] == address_data["cep"]
    assert data["country"] == address_data["country"]


def test_read_address():
    cep = "12228-460"
    response = client.get(f"/addresses/{cep}")
    assert response.status_code == 200
    data = response.json()
    #assert data["name"] == name
    for object in data:
        print(object["address_id"])

test_create_address()

test_create_address()
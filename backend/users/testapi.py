from fastapi.testclient import TestClient
from main import app  # assuming your FastAPI app is named "app" and in the "main.py" file
import pandas as pd
import uuid

client = TestClient(app)

def test_create_user():
    user_data = {
        "name": 'Rodrigo Souza Cardoso',
        "phone_number": '18981294701',
        "email": 'rodrigo.cardoso',
    } 
    response = client.post("/users/", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == user_data["name"]
    assert data["phone_number"] == user_data["phone_number"]
    assert data["email"] == user_data["email"]


def test_read_user():
    user_email = "rodrigo.cardoso"
    response = client.get(f"/users/{user_email}")
    assert response.status_code == 200
    data = response.json()

    for object in data:
        print(object["name"])

#test_create_user()

test_read_user()
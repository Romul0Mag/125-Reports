from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

client = TestClient(app)

def test_create_photo():
    data = {
        "report_id": '7ce7f290-32f4-4bce-8504-a7eca3542d23',
        "photo_id": "23e7f290-32f4-4bce-8504-a7eca3542d23",
    }
    response = client.post("/photos/", json=data)
    assert response.status_code == 200
    data = response.json()
    assert data["report_id"] == data["report_id"]
    assert data["photo_id"] == data["photo_id"]

def test_read_photos_from_company_name():
    name = "PiriEnterprise"
    response = client.get(f"/photos/company_name={name}")
    assert response.status_code == 200
    data = response.json()
    for object in data:
        print(object["photo_id"])

test_create_photo()

test_read_photos_from_company_name()
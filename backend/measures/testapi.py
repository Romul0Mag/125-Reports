from fastapi.testclient import TestClient
from fastapi import FastAPI
from main import router  # assuming your FastAPI app is named "app" and in the "main.py" file

app = FastAPI()
app.include_router(router)

client = TestClient(app)

def test_create_measure():
    report_data = {
        "report_id": '7ce7f290-32f4-4bce-8504-a7eca3542d23',
        "type": 'entrada',
        "v": 23.4,
        "c": 1.11,
        "p": 13.3,
        "total_current": 7.11,
        "total_pot": 17.99
    }
    response = client.post("/measures/", json=report_data)
    assert response.status_code == 200
    data = response.json()
    assert data["report_id"] == report_data["report_id"]
    assert data["type"] == report_data["type"]
    assert data["v"] == report_data["v"]
    assert data["c"] == report_data["c"]
    assert data["p"] == report_data["p"]
    assert data["total_current"] == report_data["total_current"]
    assert data["total_pot"] == report_data["total_pot"]


def test_read_measures():
    name = "PiriEnterprise"
    response = client.get(f"/measures/{name}")
    assert response.status_code == 200
    data = response.json()
    for object in data:
        print(object["measure_id"])

test_create_measure()

test_read_measures()
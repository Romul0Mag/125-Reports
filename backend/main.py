from fastapi import FastAPI
from companies.main import router as companies_router
from equipments.main import router as equipments_router
from ptrs.main import router as ptrs_router
from addresses.main import router as addresses_router
from reports.main import router as reports_router
from measures.main import router as measures_router
from users.main import router as users_router
from photos.main import router as photos_router

app = FastAPI()

app.include_router(companies_router)
app.include_router(equipments_router)
app.include_router(ptrs_router)
app.include_router(addresses_router)
app.include_router(reports_router)
app.include_router(measures_router)
app.include_router(users_router)
app.include_router(photos_router)
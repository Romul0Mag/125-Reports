rev:=-1
.EXPORT_ALL_VARIABLES:
DB_IAM_USER:=$(shell echo $(shell gcloud config get account) | sed 's/.gserviceaccount.com//')
DB_NAME:=prod_125_reports
INSTANCE_CONNECTION_NAME=atlantean-depot-382822:us-central1:prod-125-reports

init:
	@poetry install
	@poetry run pip install --force-reinstall --no-deps ../libs/models

all:
	@poetry run pytest --test-alembic

current:
	@poetry run alembic current

upgrade:
	@poetry run alembic upgrade head

upgrade_next:
	@poetry run alembic upgrade +1

downgrade:
	@poetry run alembic downgrade $(rev)

revision:
	@poetry run pip install --force-reinstall --no-deps ../libs/models
	@poetry run alembic revision --autogenerate -m "$(m)"

update_model:
	poetry remove models
	poetry add "../libs/models"

head:
	@poetry run alembic upgrade head
PROJECT_ID:=atlantean-depot-382822
.EXPORT_ALL_VARIABLES:
DB_IAM_USER:=$(shell echo $(shell gcloud config get account) | sed 's/.gserviceaccount.com//')
DB_NAME=prod-125-reports
INSTANCE_CONNECTION_NAME=atlantean-depot-382822:us-central1:prod-125-reports


run:
	poetry run python main.py


init:
	@poetry install
	@poetry run pip install --force-reinstall ../../libs/models
	@poetry run pip install --force-reinstall ../../libs/connector
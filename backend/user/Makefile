# Get the account
$account = gcloud config get-value account

$db_iam_user = $account -replace ".gserviceaccount.com", ""

$env:DB_IAM_USER = $db_iam_user

$env:DB_NAME="prod_125_reports"
$env:INSTANCE_CONNECTION_NAME="atlantean-depot-382822:us-central1:prod-125-r"


run:
	poetry run python main.py


init:
	@poetry install
	@poetry run pip install --force-reinstall ../../libs/models
	@poetry run pip install --force-reinstall ../../libs/connector


testapi:
	poetry run python testapi.py

test:
	poetry run uvicorn main:app --reload
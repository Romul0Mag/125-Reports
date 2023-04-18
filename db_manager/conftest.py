import pytest
from pytest_mock_resources import PostgresConfig, create_postgres_fixture


@pytest.fixture(scope="session")
def pmr_postgres_config() -> PostgresConfig:
    return PostgresConfig(image="postgres:14.5", username="default")


alembic_engine = create_postgres_fixture()
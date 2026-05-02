.PHONY: help build up down seed test

help:
	@echo "Traffic Mirroring IDS - Management Commands"
	@echo "------------------------------------------"
	@echo "build : Build all containers"
	@echo "up    : Start all services"
	@echo "down  : Stop all services"
	@echo "seed  : Seed initial traffic patterns"
	@echo "test  : Run system tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

seed:
	python scripts/mirror/seed_traffic.py

test:
	pytest tests/

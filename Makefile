upd:
	docker compose up -d
up:
	docker compose up

down:
	docker compose -f docker-compose.yml down --rmi local

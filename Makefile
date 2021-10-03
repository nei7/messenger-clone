build:
	docker-compose -f docker-compose.yml up -d --build
down:
	docker-compose down

rebuild:
	make down && make build

enter-client:
	docker exec -it chat-client-1 /bin/sh

enter-api:
	docker exec -it chat-api-1 /bin/sh
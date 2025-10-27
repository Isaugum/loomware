# ================================
# Containers & Paths
# ================================
BACKEND_CONTAINER=loombackend
FRONTEND_CONTAINER=loomfrontend
DOCKER_COMPOSE=docker-compose

# ================================
# General commands
# ================================
up:
	$(DOCKER_COMPOSE) up --build -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

restart:
	$(DOCKER_COMPOSE) restart

# ================================
# Backend commands
# ================================
backend-build:
	$(DOCKER_COMPOSE) build backend

backend-dev:
	$(DOCKER_COMPOSE) up backend

# --- TypeORM migrations ---
backend-migrate-new:
ifndef NAME
	$(error NAME is not set. Usage: make backend-migrate-new NAME=YourMigrationName)
endif
	$(MAKE) -C backend migration-new NAME=$(NAME)

backend-migrate-generate:
	$(MAKE) -C backend migration-generate

backend-migrate-run:
	$(MAKE) -C backend migration-run

backend-migrate-revert:
	$(MAKE) -C backend migration-revert

# --- Database seeding ---
backend-seed:
	$(MAKE) -C backend seed

# --- NestJS CLI commands ---
# Generate a module
backend-generate-module:
ifndef NAME
	$(error NAME is not set. Usage: make backend-generate-module NAME=ModuleName)
endif
	docker exec -it $(BACKEND_CONTAINER) npx nest g module $(NAME)

# Generate a controller
backend-generate-controller:
ifndef NAME
	$(error NAME is not set. Usage: make backend-generate-controller NAME=ControllerName)
endif
	docker exec -it $(BACKEND_CONTAINER) npx nest g controller $(NAME)

# Generate a service
backend-generate-service:
ifndef NAME
	$(error NAME is not set. Usage: make backend-generate-service NAME=ServiceName)
endif
	docker exec -it $(BACKEND_CONTAINER) npx nest g service $(NAME)

# ================================
# Frontend commands
# ================================
frontend-build:
	$(DOCKER_COMPOSE) build frontend

frontend-dev:
	cd frontend && npm install && npm run dev

# ================================
# Full stack commands
# ================================
dev:
	$(DOCKER_COMPOSE) up

prod:
	$(DOCKER_COMPOSE) up --build -d
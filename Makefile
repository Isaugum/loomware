# ================================
# Containers & Paths
# ================================
BACKEND_CONTAINER=loombackend
FRONTEND_CONTAINER=loomfrontend
DOCKER_COMPOSE=docker-compose


# ================================
# Init environment files with all keys
# ================================
init-env:
	@echo "Creating backend .env from template..."
	@[ -f backend/.env ] || cp backend/.env.example backend/.env
	@echo "Creating frontend .env.local from template..."
	@[ -f frontend/.env ] || cp frontend/.env.example frontend/.env
	@echo "Environment files created. Please fill in any required values."

# ================================
# General lifecycle
# ================================
init:
	${MAKE} init-env
	$(DOCKER_COMPOSE) up --build -d

up:
	$(DOCKER_COMPOSE) up --build -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

restart:
	$(DOCKER_COMPOSE) restart

# ================================
# Install dependencies (local + docker)
# ================================
.PHONY: install install-frontend install-backend

install: install-backend install-frontend

install-frontend:
	@echo "Installing frontend deps locally..."
	cd frontend && npm ci
	@echo "Installing frontend deps in container ($(FRONTEND_CONTAINER))..."
	-@$(DOCKER_COMPOSE) up -d frontend
	-@docker exec -i $(FRONTEND_CONTAINER) npm ci

install-backend:
	@echo "Installing backend deps locally..."
	cd backend && npm ci
	@echo "Installing backend deps in container ($(BACKEND_CONTAINER))..."
	-@$(DOCKER_COMPOSE) up -d backend
	-@docker exec -i $(BACKEND_CONTAINER) npm ci

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
	docker exec -i $(BACKEND_CONTAINER) npx nest g module $(NAME)

# Generate a controller
backend-generate-controller:
ifndef NAME
	$(error NAME is not set. Usage: make backend-generate-controller NAME=ControllerName)
endif
	docker exec -i $(BACKEND_CONTAINER) npx nest g controller $(NAME)

# Generate a service
backend-generate-service:
ifndef NAME
	$(error NAME is not set. Usage: make backend-generate-service NAME=ServiceName)
endif
	docker exec -i $(BACKEND_CONTAINER) npx nest g service $(NAME)

# ================================
# Frontend commands
# ================================
frontend-build:
	$(DOCKER_COMPOSE) build frontend

frontend-dev:
	cd frontend && npm run dev

frontend-install:
	cd frontend && npm install ${PACKAGES}

# --- Frontend scaffolding via Plop ---
.PHONY: frontend-gen-component frontend-gen-page frontend-gen-layout
frontend-gen-component:
	cd frontend && npm run gen:component

frontend-gen-page:
	cd frontend && npm run gen:page

frontend-gen-layout:
	cd frontend && npm run gen:layout

# ================================
# Full stack commands
# ================================
dev:
	$(DOCKER_COMPOSE) up

prod:
	$(DOCKER_COMPOSE) up --build -d
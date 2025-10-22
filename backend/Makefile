# Container name
BACKEND_CONTAINER=loombackend

# Create a new migration with a name provided via terminal
migration-new:
ifndef NAME
	$(error NAME is not set. Usage: make migration-new NAME=YourMigrationName)
endif
	docker exec -it $(BACKEND_CONTAINER) npx typeorm-ts-node-commonjs migration:create ./src/migrations/$(NAME)


# Run TypeORM migration generate
migration-generate:
	docker exec -it $(BACKEND_CONTAINER) npx typeorm-ts-node-commonjs migration:generate ./src/migrations/ -d src/data-source.ts

# Run pending migrations
migration-run:
	docker exec -it $(BACKEND_CONTAINER) npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts

# Revert last migration
migration-revert:
	docker exec -it $(BACKEND_CONTAINER) npx typeorm-ts-node-commonjs migration:revert -d src/data-source.ts

# Seed database (example)
seed:
	docker exec -it $(BACKEND_CONTAINER) npx ts-node src/seeds/seed.ts
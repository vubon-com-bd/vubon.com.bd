# Development Guide — Order Service

## Prerequisites

- Node.js 22+
- pnpm 9+
- Redis 6+
- PostgreSQL 14+ (only for DB_MODE=prisma)

## Quick Start

    git clone <repo>
    cd apps/order-service
    pnpm install
    cp .env.example .env
    DB_MODE=memory pnpm start:dev

## Database Setup

### Memory mode (default, no DB)

    DB_MODE=memory pnpm start:dev

### Prisma mode (production, needs DB)

    # Create database
    createdb -h localhost -U $(whoami) vubon_order

    # Generate Prisma client
    pnpm prisma:generate

    # Apply manual SQL (Termux-safe)
    psql -h localhost -U $(whoami) -d vubon_order \
      -f ~/.db-manual-migrations/order-service/20261019_create_order_tables.sql

    # Run
    DB_MODE=prisma pnpm start:dev

## Redis Setup

    # Start Redis
    redis-server --daemonize yes

    # Verify
    redis-cli ping

## Development Workflow

1. Write domain logic (VOs, entities, services)
2. Add application layer (commands, queries)
3. Add infrastructure (repositories, external)
4. Add interfaces (controllers, DTOs)
5. Wire modules
6. Write tests
7. Generate Postman

## Testing

    pnpm test:unit
    pnpm test:e2e:custom
    pnpm test:unit:cov

## Generators

    # E2E tests
    pnpm generate:e2e

    # Postman collection
    pnpm generate:postman

    # InMemory repositories
    pnpm generate:inmemory

## Debugging

    # Debug mode
    pnpm start:debug

    # View logs
    tail -f logs/app.log

## Code Style

    # Lint
    pnpm lint

    # Type check
    pnpm type-check

## Security

- Never commit .env
- Use strong JWT secrets (32+ chars)
- All mutations require idempotency key
- Domain invariants enforced in entities

## Troubleshooting

### Prisma engine unavailable (Termux)

Set PRISMA_SKIP_ENGINE_BOOTSTRAP=true and use DB_MODE=memory.

### Redis connection failed

    redis-server --daemonize yes
    redis-cli ping

### Type check fails

    pnpm type-check

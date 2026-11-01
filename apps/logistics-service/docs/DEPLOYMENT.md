# Deployment Guide

## Environment Modes

### Memory Mode (Termux / Dev)
    DB_MODE=memory
    PERSISTENCE_DRIVER=memory
    PRISMA_SKIP_ENGINE_BOOTSTRAP=true

Pros: No DB required, fast startup, all features work
Cons: Data lost on restart

### Prisma Mode (Linux x64 Production)
    DB_MODE=prisma
    PERSISTENCE_DRIVER=prisma
    PRISMA_SKIP_ENGINE_BOOTSTRAP=false
    DATABASE_URL=postgresql://user:pass@host:5432/vubon_logistics

Pros: Persistent DB, production-ready
Cons: Requires Prisma engine (x64/ARM64 Linux)

## Termux Deployment (Dev)

    cd ~/vubon.com.bd/apps/logistics-service
    pnpm install
    pnpm build
    pm2 start ecosystem.config.cjs --only logistics
    pm2 logs logistics --lines 40 --nostream

Verify:
    curl http://localhost:3007/health
    curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3007/api/docs

## Linux Production Deployment

### Prereqs
    sudo apt install -y nodejs pnpm postgresql redis

### Setup
    git clone <repo>
    cd vubon.com.bd
    pnpm install
    pnpm --filter @vubon/logistics-service build

### Database
    createdb vubon_logistics
    psql -d vubon_logistics -f ~/.db-manual-migrations/logistics-service/*.sql
    cd packages/shared-kernel
    npx prisma generate

### Start
    cd apps/logistics-service
    pm2 start ecosystem.config.cjs --only logistics
    pm2 save
    pm2 startup

### Verify
    curl http://localhost:3007/health
    curl http://localhost:3007/api/docs
    redis-cli ping
    pm2 logs logistics

## Database Migrations

Manual migration pattern (Termux-safe):

    ~/.db-manual-migrations/logistics-service/
      - 20261101_fix_shipment_and_new_tables.sql
      - 20261102_add_missing_columns.sql
      - ...

Apply:
    psql -h localhost -U $(whoami) -d vubon_logistics \
      -f ~/.db-manual-migrations/logistics-service/<file>.sql

## Environment Variables

Required:
    NODE_ENV
    PORT
    DATABASE_URL (if prisma)
    REDIS_URL
    JWT_SECRET
    JWT_ACCESS_TOKEN_TTL

Cross-service URLs:
    IDENTITY_SERVICE_URL
    PRODUCT_SERVICE_URL
    VENDOR_SERVICE_URL
    CART_SERVICE_URL
    ORDER_SERVICE_URL
    PAYMENT_SERVICE_URL
    NOTIFICATION_SERVICE_URL

Webhook secrets (optional, prod):
    SA_PARIBAHAN_WEBHOOK_SECRET
    SUNDARBAN_WEBHOOK_SECRET
    REDX_WEBHOOK_SECRET
    PATHAO_WEBHOOK_SECRET
    PAPERFLY_WEBHOOK_SECRET
    STEADFAST_WEBHOOK_SECRET
    DHL_WEBHOOK_SECRET
    FEDEX_WEBHOOK_SECRET
    UPS_WEBHOOK_SECRET
    ARAMEX_WEBHOOK_SECRET

Courier API keys (optional, prod):
    SA_PARIBAHAN_API_KEY
    SUNDARBAN_API_KEY
    REDX_API_KEY
    PATHAO_API_KEY
    PAPERFLY_API_KEY
    STEADFAST_API_KEY
    DHL_API_KEY
    FEDEX_API_KEY
    UPS_API_KEY
    ARAMEX_API_KEY

Maps (optional):
    GOOGLE_MAPS_API_KEY
    OSM_NOMINATIM_URL (default: https://nominatim.openstreetmap.org)

Storage (optional):
    STORAGE_DRIVER (local | s3)
    STORAGE_LOCAL_PATH
    STORAGE_PUBLIC_URL

Email (optional):
    EMAIL_ENABLED
    EMAIL_FROM
    SMTP_HOST
    SMTP_PORT
    SMTP_USER
    SMTP_PASS

Slack (optional):
    SLACK_WEBHOOK_URL

Search (optional):
    SEARCH_URL (default: http://localhost:7700)
    SEARCH_API_KEY
    SEARCH_INDEX_PREFIX

Encryption:
    ENCRYPTION_KEY (64 hex chars or passphrase)

## Health Checks (K8s / PM2)

Liveness:
    GET /health -> 200

Readiness:
    GET /api/docs -> 200

## Monitoring

PM2 status:
    pm2 list
    pm2 describe logistics
    pm2 monit

BullMQ queues:
    redis-cli keys "bull:logistics-*"
    redis-cli llen bull:logistics-shipment-processing:wait

Redis:
    redis-cli ping -> PONG
    redis-cli info stats

PostgreSQL:
    psql -d vubon_logistics -c "SELECT COUNT(*) FROM logistics_shipments"

## Rollback

    pm2 stop logistics
    git checkout <previous-tag>
    pnpm --filter @vubon/logistics-service build
    pm2 start logistics

## Common Issues

### JWT: Unknown authentication strategy "jwt"
Fix: JwtStrategy registered in AppModule.providers (not just SecurityModule)

### RedisService not found in InterfaceModule
Fix: RedisModule imported in InterfaceModule (in addition to InfrastructureModule)

### PrismaEngineUnavailableError (Termux)
Fix: Set PRISMA_SKIP_ENGINE_BOOTSTRAP=true + DB_MODE=memory

### Workers not starting
Fix: InfrastructureModule.forRoot() must be imported in AppModule imports

### Memory repo not sharing state
Fix: Static STORE map in memory repository (not instance-level)

### Cache stale reads
Fix: CacheInterceptor not registered on controller (or invalidate on write)

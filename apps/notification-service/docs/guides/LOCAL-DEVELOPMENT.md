# Local Development

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node | 22+ | Runtime |
| pnpm | 9+ | Package manager |
| PostgreSQL | 15+ | Database (or use Supabase) |
| Redis | 6+ | Cache + queues |
| Termux (Android) | latest | Optional, for mobile dev |

## First-Time Setup

    # 1. Clone / navigate
    cd ~/vubon.com.bd

    # 2. Install dependencies (whole monorepo)
    pnpm install

    # 3. Build shared packages
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/shared-config build
    pnpm --filter @vubon/shared-constants build
    pnpm --filter @vubon/shared-types build
    pnpm --filter @vubon/shared-schemas build
    pnpm --filter @vubon/shared-utils build

    # 4. Generate Prisma client (from shared-kernel)
    cd packages/shared-kernel
    pnpm prisma:generate
    pnpm prisma:migrate dev
    cd ../..

    # 5. Configure notification-service env
    cd apps/notification-service
    cp .env.example .env.local
    # Edit .env.local with your DB/Redis/provider values

    # 6. Start
    pnpm start:dev

Service listens on http://localhost:4007

## Environment Files

Load order (later overrides earlier):

1. `~/.vubon.com.bd/.env` — monorepo root (shared)
2. `apps/notification-service/.env` — service default
3. `apps/notification-service/.env.local` — your personal overrides

**Never commit** `.env.local`.

## Minimal `.env.local` (local dev)

    NODE_ENV=development
    PORT=4007

    # Database
    DATABASE_URL=postgresql://postgres@localhost:5432/vubon

    # Redis
    REDIS_URL=redis://localhost:6379
    REDIS_KEY_PREFIX=vubon:notify:

    # JWT (development only)
    JWT_SECRET=dev-secret-at-least-32-chars-long-xxx
    JWT_ISSUER=vubon-api
    JWT_AUDIENCE=vubon-client

    # Channels — disable what you don't test
    EMAIL_ENABLED=false
    SMS_ENABLED=false
    PUSH_ENABLED=false
    NOTIFY_IN_APP_ENABLED=true
    NOTIFY_WEBHOOK_ENABLED=false

    # Enable providers when ready to test
    RESEND_ENABLED=false
    SMTP_ENABLED=false
    TWILIO_ENABLED=false
    SSLWIRELESS_ENABLED=false
    FCM_ENABLED=false
    WEB_PUSH_ENABLED=false

## Running Postgres & Redis Locally

### Option A: Docker Compose

    # docker-compose.dev.yml
    version: "3.9"
    services:
      postgres:
        image: postgres:16-alpine
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: ""
          POSTGRES_HOST_AUTH_METHOD: trust
          POSTGRES_DB: vubon
        ports:
          - "5432:5432"
        volumes:
          - ./pgdata:/var/lib/postgresql/data

      redis:
        image: redis:7-alpine
        ports:
          - "6379:6379"

    docker compose -f docker-compose.dev.yml up -d

### Option B: Termux (Android)

    pkg install postgresql redis
    initdb $PREFIX/var/lib/postgresql
    pg_ctl -D $PREFIX/var/lib/postgresql start
    createdb vubon
    redis-server --daemonize yes

### Option C: Hosted

- Database: https://supabase.com (free tier)
- Redis: https://upstash.com (free tier)

## Development Workflow

    cd ~/vubon.com.bd/apps/notification-service

    # Watch mode — auto-reload on file change
    pnpm start:dev

    # Type-check in another terminal
    pnpm type-check --watch

    # Unit tests in watch mode
    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --watch

    # Lint on save
    pnpm lint

## Hot Reload Notes

NestJS `--watch` reloads on `.ts` file change. Env vars are NOT hot-reloaded —
restart the service after `.env.local` changes.

## Testing Endpoints

### Health check

    curl http://localhost:4007/api/v1/health | jq

### Get JWT (development)

The auth-service issues tokens. For local testing, you can mint one:

    cd ~/vubon.com.bd/apps/auth-service
    # Follow its README to mint a test JWT
    # OR use a pre-generated dev token from .env.local

Set as shell variable:

    export JWT="eyJhbGc..."

### Send a notification

    curl -X POST http://localhost:4007/api/v1/notifications \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $JWT" \
      -H "X-Correlation-Id: dev-$(date +%s)" \
      -d '{
        "userId": "00000000-0000-0000-0000-000000000001",
        "type": "system",
        "category": "system",
        "channels": ["in_app"],
        "title": "Local test",
        "body": "Hello from dev"
      }'

### List notifications

    curl http://localhost:4007/api/v1/notifications \
      -H "Authorization: Bearer $JWT" | jq

### Preferences

    curl http://localhost:4007/api/v1/preferences \
      -H "Authorization: Bearer $JWT" | jq

## Swagger UI

Open in browser:

    http://localhost:4007/api/v1/docs

Click **Authorize** (top right), paste JWT, then test endpoints interactively.

## Database Inspection

    # Prisma Studio (GUI)
    cd ~/vubon.com.bd/packages/shared-kernel
    pnpm prisma:studio

    # Or psql
    psql postgresql://postgres@localhost:5432/vubon

    # Useful queries
    SELECT count(*) FROM notifications;
    SELECT count(*) FROM notification_templates;
    SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10;

## Redis Inspection

    redis-cli

    # See all notification keys
    KEYS vubon:notify:*

    # Unread count for a user
    GET vubon:notify:notif:unread:{userId}

    # Queue depth
    LLEN bull:email:wait
    LLEN bull:sms:wait
    LLEN bull:push:wait

    # Clear all (destructive!)
    FLUSHDB

## Common Tasks

### Add a new notification type

1. Add constant: `packages/shared-constants/src/platform/notification/notification-type.constants.ts`
2. Add to domain VO: `apps/notification-service/src/module/domain/value-objects/primitives/notification-type.vo.ts`
3. Add named constructor + predicate

### Add a new provider

1. Create `infrastructure/providers/{channel}/{name}.provider.ts`
2. Extend `BaseHttpProvider` + implement `I{Channel}Provider`
3. Add config in `packages/shared-config/src/platform/notification/{name}.config.ts`
4. Register in `{channel}-provider.resolver.ts` constructor
5. Wire in `{channel}-provider.module.ts`
6. Add tests in `test/unit/infrastructure/providers/{channel}/`
7. Add env keys to `.env.example`

### Add a new channel

Larger change. Requires:
- New `NotificationChannel` enum value
- New VO in `domain/value-objects/primitives/`
- New provider interface
- New queue + worker
- New controller + routes
- Update `NotificationChannelPlannerService` for fan-out

## Debug Tips

**Startup slow / hangs:**
- Check DB reachable: `pg_isready`
- Check Redis reachable: `redis-cli ping`
- Look at bootstrap logs — NestJS will print "listening on..."

**DI errors:**
- "Nest can't resolve dependencies" → missing module import
- Check `@Inject(TOKEN)` symbol is provided with `useExisting` or `useValue`

**Prisma errors:**
- `pnpm prisma:generate` in `packages/shared-kernel/`
- Ensure `DATABASE_URL` set

**Redis connection errors:**
- `redis-cli ping` should return `PONG`
- Check `REDIS_URL` format: `redis://host:port` or with auth `redis://:password@host:port`

**Workers not starting:**
- Check `QUEUE_AUTOSTART_WORKERS=true` (default true)
- Logs should show `Worker "email" started — jobs=[...]`

## Killing Stuck Processes

    # Find process on port 4007
    lsof -i :4007
    # or
    netstat -tulpn | grep 4007

    # Kill
    kill -9 <PID>

    # Or kill all node (careful!)
    pkill -f "notification-service"

## Clean Build

    cd ~/vubon.com.bd

    # Clean dist folders
    pnpm --filter @vubon/notification-service clean 2>/dev/null || rm -rf apps/notification-service/dist

    # Rebuild shared first
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/notification-service build

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Prisma
- Jest
- Thunder Client (for API testing)

`.vscode/settings.json`:

    {
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      },
      "typescript.tsdk": "node_modules/typescript/lib",
      "typescript.preferences.importModuleSpecifierEnding": "js"
    }

### WebStorm

- Enable "TypeScript" service
- Set Node interpreter: Node 22+
- Enable ESM (Settings → Languages → JavaScript → ESM)
- Configure Prettier on save

## Next Steps

- [Testing guide](TESTING.md)
- [API reference](API-REFERENCE.md)
- [Architecture](../architecture/ARCHITECTURE.md)

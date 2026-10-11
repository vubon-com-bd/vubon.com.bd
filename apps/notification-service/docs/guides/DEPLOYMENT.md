# Deployment Guide

## Prerequisites

- Node 22+
- pnpm 9+
- PostgreSQL (Supabase or self-hosted)
- Redis 6+
- Domain + SSL (for HTTPS endpoints)

## Environment Variables

Minimum required for production:

    NODE_ENV=production
    PORT=4007

    DATABASE_URL=postgresql://user:pass@host:5432/db
    REDIS_URL=redis://host:6379
    REDIS_KEY_PREFIX=vubon:notify:

    JWT_SECRET=your-32-char-secret
    JWT_ISSUER=vubon-api
    JWT_AUDIENCE=vubon-client

    # Enable only what you use:
    EMAIL_ENABLED=true
    EMAIL_PROVIDER=resend
    RESEND_ENABLED=true
    RESEND_API_KEY=re_xxx
    RESEND_FROM_EMAIL=noreply@yourdomain.com

    SMS_ENABLED=true
    SMS_PROVIDER=twilio
    TWILIO_ENABLED=true
    TWILIO_ACCOUNT_SID=ACxxx
    TWILIO_AUTH_TOKEN=xxx
    TWILIO_FROM_NUMBER=+1xxx

    PUSH_ENABLED=true
    PUSH_PROVIDER=fcm
    FCM_ENABLED=true
    FCM_PROJECT_ID=xxx
    FCM_SERVICE_ACCOUNT_JSON={...}

    WEBHOOK_ENABLED=true

## Build

    cd ~/vubon.com.bd
    pnpm install --frozen-lockfile
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/shared-config build
    pnpm --filter @vubon/shared-constants build
    pnpm --filter @vubon/shared-types build
    pnpm --filter @vubon/shared-schemas build
    pnpm --filter @vubon/notification-service build

## Database Migration

    cd packages/shared-kernel
    pnpm prisma:generate
    pnpm prisma:migrate:deploy

## Start

Development:

    pnpm --filter @vubon/notification-service start:dev

Production:

    NODE_ENV=production \
    node apps/notification-service/dist/main.js

## Systemd (Linux)

    # /etc/systemd/system/vubon-notification.service
    [Unit]
    Description=Vubon Notification Service
    After=network.target postgresql.service redis.service

    [Service]
    Type=simple
    User=vubon
    WorkingDirectory=/opt/vubon/apps/notification-service
    EnvironmentFile=/opt/vubon/.env
    ExecStart=/usr/bin/node dist/main.js
    Restart=always
    RestartSec=5
    StandardOutput=journal
    StandardError=journal

    [Install]
    WantedBy=multi-user.target

Enable:

    sudo systemctl daemon-reload
    sudo systemctl enable vubon-notification
    sudo systemctl start vubon-notification
    sudo systemctl status vubon-notification

## Docker

    # Dockerfile
    FROM node:22-alpine AS builder
    WORKDIR /app
    COPY pnpm-lock.yaml package.json ./
    COPY packages ./packages
    COPY apps/notification-service ./apps/notification-service
    RUN corepack enable && pnpm install --frozen-lockfile
    RUN pnpm --filter @vubon/notification-service build

    FROM node:22-alpine
    WORKDIR /app
    COPY --from=builder /app/apps/notification-service/dist ./dist
    COPY --from=builder /app/apps/notification-service/node_modules ./node_modules
    COPY --from=builder /app/apps/notification-service/package.json ./
    EXPOSE 4007
    CMD ["node", "dist/main.js"]

Build + run:

    docker build -t vubon/notification:latest .
    docker run -d \
      --name vubon-notification \
      --restart always \
      -p 4007:4007 \
      --env-file .env \
      vubon/notification:latest

## Docker Compose

    version: "3.9"
    services:
      notification:
        build: .
        restart: always
        ports:
          - "4007:4007"
        env_file: .env
        depends_on:
          - postgres
          - redis

      postgres:
        image: postgres:16-alpine
        environment:
          POSTGRES_USER: vubon
          POSTGRES_PASSWORD: change_me
          POSTGRES_DB: vubon
        volumes:
          - pgdata:/var/lib/postgresql/data

      redis:
        image: redis:7-alpine
        command: redis-server --appendonly yes
        volumes:
          - redisdata:/data

    volumes:
      pgdata:
      redisdata:

## Nginx Reverse Proxy

    server {
        listen 443 ssl http2;
        server_name notify.vubon.com.bd;

        ssl_certificate     /etc/letsencrypt/live/notify.vubon.com.bd/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/notify.vubon.com.bd/privkey.pem;

        location / {
            proxy_pass http://127.0.0.1:4007;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Correlation-Id $request_id;
            proxy_read_timeout 120s;
        }

        # SSE (if enabled)
        location /api/v1/sse {
            proxy_pass http://127.0.0.1:4007;
            proxy_set_header Connection '';
            proxy_buffering off;
            proxy_cache off;
            chunked_transfer_encoding off;
        }
    }

## Health Probes (Kubernetes)

    livenessProbe:
      httpGet:
        path: /api/v1/health/live
        port: 4007
      initialDelaySeconds: 30
      periodSeconds: 10

    readinessProbe:
      httpGet:
        path: /api/v1/health/ready
        port: 4007
      initialDelaySeconds: 10
      periodSeconds: 5

## Scaling

**Horizontal:**
- Run multiple instances behind load balancer
- BullMQ distributes jobs across workers automatically
- Redis is the coordination point

**Vertical:**
- Increase `QUEUE_CONFIG.workerConcurrency` env
- Tune `NOTIFY_RATE_LIMIT_PER_SECOND` per instance

**Environment vars for scaling:**

    QUEUE_WORKER_CONCURRENCY=10
    QUEUE_AUTOSTART_WORKERS=true
    NOTIFY_BATCH_SIZE=1000
    NOTIFY_RATE_LIMIT_PER_SECOND=200

## Monitoring

**Key metrics to watch:**

- HTTP: request rate, latency p95/p99, 5xx rate
- Workers: queue depth per queue, job failure rate
- Providers: send success rate per provider
- Cache: hit rate (target >80%)
- DB: connection pool usage, slow queries

**Expose Prometheus metrics:**

The kernel `MetricsService` provides `/metrics` endpoint when enabled:

    ENABLE_METRICS=true

## Logs

Structured JSON logs. Pipe to your aggregator:

    node dist/main.js 2>&1 | jq -r '.level + " " + .message'

Log levels: `error | warn | log | debug`. Configure via NestFactory options.

## Backups

**Database:**
- Daily full backup of PostgreSQL
- Point-in-time recovery if using WAL archiving

**Redis:**
- AOF enabled (appendonly yes)
- Redis is a cache — losing it is not fatal

## Zero-Downtime Deploy

    # 1. Build new version
    pnpm --filter @vubon/notification-service build

    # 2. Run migrations (backwards-compatible)
    pnpm prisma:migrate:deploy

    # 3. Restart gracefully
    systemctl reload vubon-notification  # or kill -SIGTERM

    # App drains in-flight requests (enableShutdownHooks is on)

## Rollback

    git checkout <previous-tag>
    pnpm --filter @vubon/notification-service build
    systemctl restart vubon-notification

For migrations, keep rollback SQL ready:

    prisma migrate resolve --rolled-back <migration-name>

## Security Checklist

- [ ] JWT_SECRET 32+ chars, rotated periodically
- [ ] DATABASE_URL uses SSL (`?sslmode=require`)
- [ ] REDIS_URL uses TLS + password in prod
- [ ] Provider API keys in secret manager (not .env file on disk)
- [ ] Inbound webhook signatures verified (already in code)
- [ ] Rate limiting enabled
- [ ] CORS restricted to known origins
- [ ] Request size limits on reverse proxy
- [ ] Dependencies scanned (pnpm audit)
- [ ] Container runs as non-root user

## Troubleshooting Deploy

**Service won't start:**
- Check `.env` — no missing required vars
- `node dist/main.js` shows exact error
- Verify DB/Redis reachable: `pg_isready`, `redis-cli ping`

**Health returns degraded:**
- Check `/health` response details
- Often Prisma engine unavailable — verify DATABASE_URL

**Workers not processing:**
- Check `QUEUE_AUTOSTART_WORKERS=true`
- Verify Redis connection: `redis-cli -u $REDIS_URL ping`
- Check queue depth: `redis-cli -u $REDIS_URL LLEN bull:email:wait`

**Rate limited by provider:**
- Increase backoff in provider config
- Add more provider accounts / rotate keys
- Upgrade provider tier

## Performance Tuning

    # Kernel QueueService
    QUEUE_WORKER_CONCURRENCY=5

    # Batch sends
    NOTIFY_BATCH_SIZE=500

    # Redis pool
    REDIS_MAX_RETRIES=3
    REDIS_ENABLE_OFFLINE_QUEUE=true

    # Prisma
    DB_POOL_MIN=2
    DB_POOL_MAX=10

    # HTTP timeouts
    RESEND_TIMEOUT_MS=15000
    TWILIO_TIMEOUT_MS=15000
    FCM_TIMEOUT_MS=15000

## Post-Deploy Verification

    # 1. Health
    curl -s https://notify.vubon.com.bd/api/v1/health | jq

    # 2. Send test notification
    curl -X POST https://notify.vubon.com.bd/api/v1/notifications \
      -H "Authorization: Bearer $JWT" \
      -H "Content-Type: application/json" \
      -d '{"userId":"test-uuid","type":"system","category":"system","channels":["in_app"],"title":"Deploy check","body":"OK"}'

    # 3. Check queue depth
    redis-cli -u $REDIS_URL LLEN bull:email:wait
    redis-cli -u $REDIS_URL LLEN bull:sms:wait

    # 4. Check Swagger
    curl -s https://notify.vubon.com.bd/api/v1/docs | head -5

## Disaster Recovery

**Scenario: Redis lost**
- Service continues (cache miss, no queues)
- Restart workers after Redis recovers

**Scenario: DB lost**
- Restore from backup
- Service will be degraded until DB up

**Scenario: Provider down (e.g., Resend)**
- Resolver falls back to next enabled provider
- If none → NO_PROVIDER error → retried via queue

**Scenario: Mass queue backlog**
- Scale workers horizontally
- Increase QUEUE_WORKER_CONCURRENCY
- Investigate slow provider

# Deployment Guide — Product Service

Production deployment guide for the Product Service microservice.

---

## 🎯 Deployment Options

| Platform | Method | Difficulty | Cost |
|----------|--------|-----------|------|
| **Docker** | Self-hosted | Medium | $ |
| **Railway** | Nixpacks | Easy | $$ |
| **Fly.io** | Dockerfile | Easy | $$ |
| **AWS ECS** | Docker + ECR | Hard | $$$ |
| **Kubernetes** | Helm chart | Hard | $$$ |
| **VPS** | PM2 + Nginx | Medium | $ |

---

## 📋 Pre-Deployment Checklist

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `DB_MODE=prisma`
- [ ] `DATABASE_URL` — production DB with strong password
- [ ] `DB_SSL=true`
- [ ] `REDIS_URL` — production Redis with password
- [ ] `JWT_SECRET` — min 32 chars, random
- [ ] `SENTRY_DSN` — error tracking (optional)
- [ ] `LOG_LEVEL=info` (not debug)

### Database
- [ ] PostgreSQL instance ready
- [ ] `vubon_product` database created
- [ ] 12 tables applied via SQL migration
- [ ] Backup schedule configured
- [ ] Connection pool sized (100+)

### Infrastructure
- [ ] Redis instance ready
- [ ] Domain DNS configured
- [ ] SSL certificate
- [ ] Reverse proxy (Nginx/Caddy)
- [ ] Firewall rules

### Security
- [ ] All secrets in env vars (not code)
- [ ] CORS origins restricted
- [ ] Rate limiting enabled
- [ ] Helmet headers enabled
- [ ] SQL injection prevention (Prisma handles)

---

## 🐳 Option 1 — Docker Deployment

### Dockerfile

Create `Dockerfile`:

\`\`\`dockerfile
# ═══════════════════════════════════════════
# Stage 1: Builder
# ═══════════════════════════════════════════
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy monorepo files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/product-service/package.json ./apps/product-service/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-utils/package.json ./packages/shared-utils/

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build shared-kernel first
RUN pnpm --filter @vubon/shared-kernel build

# Build product-service
RUN pnpm --filter @vubon/product-service build

# ═══════════════════════════════════════════
# Stage 2: Runtime
# ═══════════════════════════════════════════
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/product-service/package.json ./apps/product-service/
COPY --from=builder /app/apps/product-service/dist ./apps/product-service/dist
COPY --from=builder /app/apps/product-service/prisma ./apps/product-service/prisma

WORKDIR /app/apps/product-service

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1

EXPOSE 3002

CMD ["node", "dist/main.js"]
\`\`\`

### Build & Run

\`\`\`bash
# Build image
docker build -t product-service:1.0.0 .

# Run
docker run -d \\
  --name product-service \\
  -p 3002:3002 \\
  --env-file .env.production \\
  product-service:1.0.0

# Check logs
docker logs -f product-service

# Health
curl http://localhost:3002/health
\`\`\`

### Docker Compose

Create `docker-compose.yml`:

\`\`\`yaml
version: '3.9'

services:
  product-service:
    build: .
    ports:
      - '3002:3002'
    environment:
      NODE_ENV: production
      DB_MODE: prisma
      DATABASE_URL: postgresql://vubon:${DB_PASSWORD}@postgres:5432/vubon_product
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: vubon_product
      POSTGRES_USER: vubon
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U vubon -d vubon_product']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

Run:
\`\`\`bash
docker-compose up -d
\`\`\`

---

## 🚂 Option 2 — Railway (Nixpacks)

### `nixpacks.toml`

\`\`\`toml
[phases.setup]
nixPkgs = ["nodejs_22", "pnpm"]

[phases.install]
cmds = ["pnpm install --frozen-lockfile"]

[phases.build]
cmds = [
  "pnpm --filter @vubon/shared-kernel build",
  "pnpm --filter @vubon/product-service build",
]

[start]
cmd = "node apps/product-service/dist/main.js"

[variables]
NODE_ENV = "production"
DB_MODE = "prisma"
\`\`\`

### `railway.toml`

\`\`\`toml
[build]
builder = "nixpacks"
buildCommand = "pnpm build"

[deploy]
startCommand = "node apps/product-service/dist/main.js"
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 5
\`\`\`

### Deploy Steps

1. Connect GitHub repo to Railway
2. Railway auto-detects `nixpacks.toml`
3. Add env vars in Railway dashboard:
   - `DATABASE_URL`
   - `REDIS_URL`
   - `JWT_SECRET`
4. Add PostgreSQL plugin
5. Add Redis plugin
6. Deploy

### Run SQL Migration

Railway CLI:
\`\`\`bash
railway run psql \$DATABASE_URL < migrations/20261013_create_all_product_tables.sql
\`\`\`

---

## ☁️ Option 3 — Fly.io

### `fly.toml`

\`\`\`toml
app = "vubon-product-service"
primary_region = "sin"

[build]
dockerfile = "Dockerfile"

[env]
PORT = "3002"
NODE_ENV = "production"
DB_MODE = "prisma"

[http_service]
internal_port = 3002
force_https = true
auto_stop_machines = true
auto_start_machines = true
min_machines_running = 1

[[http_service.checks]]
interval = "30s"
timeout = "5s"
grace_period = "20s"
method = "GET"
path = "/health"

[[vm]]
cpu_kind = "shared"
cpus = 1
memory_mb = 512
\`\`\`

### Deploy

\`\`\`bash
fly launch
fly secrets set DATABASE_URL="..." REDIS_URL="..." JWT_SECRET="..."
fly deploy
\`\`\`

---

## 🖥️ Option 4 — VPS (PM2 + Nginx)

### Setup

\`\`\`bash
# SSH to VPS
ssh user@your-vps.com

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
sudo npm install -g pnpm@9

# Install PM2
sudo npm install -g pm2

# Clone repo
git clone https://github.com/vubon/vubon.com.bd.git
cd vubon.com.bd

# Install deps
pnpm install --frozen-lockfile

# Build
pnpm --filter @vubon/shared-kernel build
pnpm --filter @vubon/product-service build

# Setup env
cd apps/product-service
cp .env.production.example .env
nano .env  # Fill in production values
\`\`\`

### PM2 Ecosystem File

Create `ecosystem.config.cjs`:

\`\`\`javascript
module.exports = {
  apps: [{
    name: 'product-service',
    script: 'dist/main.js',
    cwd: '/home/user/vubon.com.bd/apps/product-service',
    instances: 2,
    exec_mode: 'cluster',
    env_file: '.env',
    error_file: '/var/log/product-service/error.log',
    out_file: '/var/log/product-service/out.log',
    merge_logs: true,
    max_memory_restart: '500M',
    autorestart: true,
  }],
};
\`\`\`

### Start with PM2

\`\`\`bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # Follow instructions
\`\`\`

### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/product-service`:

\`\`\`nginx
upstream product_backend {
    server 127.0.0.1:3002;
    keepalive 64;
}

server {
    listen 80;
    server_name products.vubon.com.bd;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name products.vubon.com.bd;

    ssl_certificate /etc/letsencrypt/live/products.vubon.com.bd/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/products.vubon.com.bd/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # Rate limiting
    limit_req zone=api burst=20 nodelay;

    location / {
        proxy_pass http://product_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
\`\`\`

Enable & reload:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/product-service /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
\`\`\`

### SSL with Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d products.vubon.com.bd
\`\`\`

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy Product Service

on:
  push:
    branches: [main]
    paths:
      - 'apps/product-service/**'
      - 'packages/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @vubon/shared-kernel build
      - run: pnpm --filter @vubon/product-service type-check
      - run: pnpm --filter @vubon/product-service build
      - run: pnpm --filter @vubon/product-service test:unit

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          # Your deploy command (Railway, Fly, etc.)
          echo "Deploying..."
\`\`\`

---

## 📊 Monitoring

### Health Endpoint

\`\`\`bash
curl https://products.vubon.com.bd/health
\`\`\`

Expected:
\`\`\`json
{
  "service": "product-service",
  "status": "ok",
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

### Logs

**PM2:**
\`\`\`bash
pm2 logs product-service
pm2 monit
\`\`\`

**Docker:**
\`\`\`bash
docker logs -f product-service
\`\`\`

### Metrics (optional)

Add Prometheus metrics via `@willsoto/nestjs-prometheus`:

\`\`\`env
METRICS_ENABLED=true
METRICS_PORT=9090
\`\`\`

---

## 🚨 Rollback Procedure

### PM2

\`\`\`bash
cd /home/user/vubon.com.bd
git log --oneline -5
git checkout <previous-commit>
pnpm install --frozen-lockfile
pnpm --filter @vubon/product-service build
pm2 restart product-service
\`\`\`

### Docker

\`\`\`bash
docker stop product-service
docker rm product-service
docker run -d --name product-service \\
  --env-file .env.production \\
  -p 3002:3002 \\
  product-service:<previous-version>
\`\`\`

### Railway

Railway dashboard → Deployments → Rollback to previous

---

## 🔐 Production Security

### Environment

- ✅ `NODE_ENV=production`
- ✅ `DB_SSL=true`
- ✅ Strong `JWT_SECRET` (min 32 chars, random)
- ✅ Redis with password
- ✅ No debug logging

### Headers (Helmet)

\`\`\`typescript
// main.ts
import helmet from 'helmet';
app.use(helmet());
\`\`\`

### CORS

\`\`\`typescript
app.enableCors({
  origin: process.env.CORS_ORIGINS?.split(',') ?? [],
  credentials: true,
});
\`\`\`

### Rate Limiting

\`\`\`typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot([{
  ttl: 60000,
  limit: 100,
}]);
\`\`\`

---

## 📈 Performance Tuning

### Node.js

\`\`\`bash
# Increase memory (default 1.5GB)
NODE_OPTIONS="--max-old-space-size=4096" node dist/main.js
\`\`\`

### PM2 Cluster Mode

\`\`\`javascript
instances: 'max',  // Use all CPU cores
exec_mode: 'cluster',
\`\`\`

### Database

- Connection pool: `DB_MAX_CONNECTIONS=100`
- Query timeout: `DB_STATEMENT_TIMEOUT_MS=30000`
- Prisma prepared statements

### Redis

- Enable persistence (RDB + AOF)
- Configure maxmemory policy (`allkeys-lru`)
- Use replication for HA

---

## 🎯 Deployment Checklist

### Pre-Deploy
- [ ] All tests pass (`pnpm test:all`)
- [ ] Type-check clean (`pnpm type-check`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Env vars set correctly
- [ ] Database migrated
- [ ] Backup current version

### Deploy
- [ ] Stop current version
- [ ] Deploy new version
- [ ] Verify health endpoint
- [ ] Smoke test critical endpoints
- [ ] Monitor logs for 5 minutes

### Post-Deploy
- [ ] Verify all endpoints working
- [ ] Check error rates
- [ ] Verify response times
- [ ] Monitor memory/CPU
- [ ] Update CHANGELOG

---

## 📚 Additional Resources

- [README.md](./README.md) — Project overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) — Local dev
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Patterns
- [API.md](./API.md) — API reference
- [TESTING.md](./TESTING.md) — Tests
- [CHANGELOG.md](./CHANGELOG.md) — History

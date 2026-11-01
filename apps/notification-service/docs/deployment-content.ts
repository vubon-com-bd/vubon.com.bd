/**
 * DEPLOYMENT.md Content — Notification Service
 * @module notification-service/docs
 */

export const DEPLOYMENT_CONTENT = String.raw`# 🚀 Deployment Guide — Notification Service

Complete guide for deploying to production.

## 🎯 Deployment Options

| Platform | Complexity | Cost | Best For |
|----------|-----------|------|----------|
| **Docker** | Low | Varies | Self-hosted, VPS |
| **Railway** | Very Low | $5-20/mo | Quick deploys, small teams |
| **Fly.io** | Low | $5-30/mo | Global edge, latency-critical |
| **AWS ECS** | High | $30-100+/mo | Enterprise, full control |
| **Kubernetes** | Very High | $100+/mo | Multi-service, large scale |
| **VPS (PM2 + Nginx)** | Medium | $5-20/mo | Full control, budget |

## 📋 Pre-Deployment Checklist

- [ ] All tests passing (\`pnpm test:all\`)
- [ ] Type-check clean (\`pnpm type-check\`)
- [ ] \`.env.production\` created from \`.env.production.example\`
- [ ] \`DATABASE_URL\` points to production DB
- [ ] \`REDIS_URL\` points to production Redis
- [ ] \`JWT_SECRET\` is 32+ chars, unique per environment
- [ ] \`PERSISTENCE_DRIVER=prisma\`
- [ ] \`NODE_ENV=production\`
- [ ] \`LOG_LEVEL=info\` (not debug)
- [ ] All provider API keys set (SendGrid, SSLWireless, FCM, etc.)
- [ ] Database migrations applied (\`pnpm prisma:migrate:deploy\`)
- [ ] Health endpoint returns \`healthy: true\`
- [ ] SSL/TLS certificate configured
- [ ] Monitoring configured (Sentry, UptimeRobot)
- [ ] Backup strategy in place

## 🐳 Option 1 — Docker

### Build

\`\`\`bash
# From repo root
cd ~/vubon.com.bd

# Build (uses Dockerfile in apps/notification-service/)
docker build -t vubon/notification-service:latest \
  -f apps/notification-service/Dockerfile .

# Tag
docker tag vubon/notification-service:latest \
  vubon/notification-service:v1.0.0
\`\`\`

### Run

\`\`\`bash
docker run -d \
  --name notification-service \
  --restart unless-stopped \
  -p 3003:3003 \
  --env-file apps/notification-service/.env.production \
  vubon/notification-service:latest
\`\`\`

### Docker Compose

\`docker-compose.yml\`:
\`\`\`yaml
version: '3.9'

services:
  notification:
    image: vubon/notification-service:latest
    container_name: notification-service
    restart: unless-stopped
    ports:
      - "3003:3003"
    env_file: apps/notification-service/.env.production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3003/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s

  postgres:
    image: postgres:15-alpine
    container_name: notification-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: vubon_notification
      POSTGRES_USER: vubon
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - notification_pg:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U vubon"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: notification-redis
    restart: unless-stopped
    command: redis-server --requirepass \${REDIS_PASSWORD}
    volumes:
      - notification_redis:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  notification_pg:
  notification_redis:
\`\`\`

### Run

\`\`\`bash
docker-compose up -d
docker-compose logs -f notification
docker-compose ps
\`\`\`

## 🚂 Option 2 — Railway (Recommended for Small Teams)

### Setup

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select \`vubon.com.bd\` repo
4. Set root directory: \`apps/notification-service\`
5. Railway auto-detects \`nixpacks.toml\`

### Environment Variables

In Railway dashboard → Variables:

\`\`\`
NODE_ENV=production
PORT=3003
PERSISTENCE_DRIVER=prisma
DATABASE_URL=<from PostgreSQL plugin>
REDIS_URL=<from Redis plugin>
JWT_SECRET=<32+ chars>
SENDGRID_API_KEY=...
SSLWIRELESS_API_KEY=...
FCM_PROJECT_ID=...
FCM_PRIVATE_KEY=...
# ... all required vars from .env.production.example
\`\`\`

### Deploy

\`\`\`bash
# From Railway CLI
railway login
railway link
railway up
\`\`\`

**Auto-deploy on git push** is enabled by default.

### Health Check

Railway uses \`healthcheckPath\` from \`railway.toml\`:
\`\`\`toml
[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 30
\`\`\`

## ☁️ Option 3 — Fly.io

\`\`\`bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch (first time)
cd apps/notification-service
fly launch --name notification-service --region sin

# Set secrets
fly secrets set JWT_SECRET=... \
  DATABASE_URL=... \
  REDIS_URL=... \
  SENDGRID_API_KEY=...

# Deploy
fly deploy

# Monitor
fly logs
fly status
\`\`\`

\`fly.toml\`:
\`\`\`toml
app = "notification-service"
primary_region = "sin"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
  PORT = "3003"
  PERSISTENCE_DRIVER = "prisma"

[http_service]
  internal_port = 3003
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1

  [[http_service.checks]]
    interval = "30s"
    timeout = "5s"
    grace_period = "10s"
    method = "GET"
    path = "/health"

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"
\`\`\`

## 🖥️ Option 4 — VPS (PM2 + Nginx)

### Server Setup (Ubuntu)

\`\`\`bash
# Install Node 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs postgresql redis-server nginx

# Install pnpm
sudo corepack enable

# Install PM2
sudo npm install -g pm2
\`\`\`

### Deploy App

\`\`\`bash
# Clone
cd /var/www
git clone https://github.com/vubon/vubon.com.bd.git
cd vubon.com.bd

# Install
pnpm install --frozen-lockfile
pnpm --filter @vubon/shared-kernel build
pnpm --filter @vubon/notification-service build

# Setup env
cd apps/notification-service
cp .env.production.example .env.production
nano .env.production   # fill in secrets

# Prisma
pnpm prisma:generate
pnpm prisma:migrate:deploy
\`\`\`

### PM2 Setup

\`\`\`bash
# Start
cd /var/www/vubon.com.bd/apps/notification-service
pm2 start dist/main.js \
  --name notification-service \
  --env production \
  --time

# Save
pm2 save
pm2 startup

# Monitor
pm2 monit
pm2 logs notification-service
\`\`\`

### Nginx Config

\`/etc/nginx/sites-available/notification.vubon.com.bd\`:
\`\`\`nginx
upstream notification_backend {
  server 127.0.0.1:3003;
  keepalive 32;
}

server {
  listen 443 ssl http2;
  server_name notification.vubon.com.bd;

  ssl_certificate /etc/letsencrypt/live/notification.vubon.com.bd/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/notification.vubon.com.bd/privkey.pem;

  client_max_body_size 10M;

  location / {
    proxy_pass http://notification_backend;
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

  location /health {
    proxy_pass http://notification_backend/health;
    access_log off;
  }
}

server {
  listen 80;
  server_name notification.vubon.com.bd;
  return 301 https://\$host\$request_uri;
}
\`\`\`

### Enable + Reload

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/notification.vubon.com.bd /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL (Let's Encrypt)
sudo certbot --nginx -d notification.vubon.com.bd
\`\`\`

## 🔄 CI/CD Pipeline (GitHub Actions)

\`.github/workflows/deploy-notification.yml\`:

\`\`\`yaml
name: Deploy Notification Service

on:
  push:
    branches: [main]
    paths:
      - 'apps/notification-service/**'
      - 'packages/shared-*/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @vubon/shared-kernel build
      - run: pnpm --filter @vubon/notification-service test:all

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up --service notification-service
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}
\`\`\`

## 📊 Monitoring

### Health Endpoint

\`\`\`bash
curl https://notification.vubon.com.bd/health
\`\`\`

Response:
\`\`\`json
{
  "service": "notification-service",
  "healthy": true,
  "timestamp": "2026-10-26T10:00:00.000Z",
  "uptimeSeconds": 3600,
  "dependencies": [
    { "name": "database", "healthy": true },
    { "name": "redis", "healthy": true }
  ]
}
\`\`\`

### Recommended Tools

| Tool | Purpose |
|------|---------|
| **Sentry** | Error tracking |
| **UptimeRobot** | Uptime monitoring (5min checks) |
| **Railway Metrics** | CPU/RAM/Network |
| **Grafana** | Dashboards (advanced) |
| **Prometheus** | Metrics (advanced) |

### Sentry Integration

Add to \`.env.production\`:
\`\`\`
SENTRY_DSN=https://xxx@sentry.io/yyy
\`\`\`

## 🚨 Rollback Procedure

### Docker
\`\`\`bash
docker stop notification-service
docker run -d --name notification-service \
  --env-file .env.production \
  -p 3003:3003 \
  vubon/notification-service:v1.0.0  # ← previous tag
\`\`\`

### Railway
\`\`\`bash
railway rollback
\`\`\`

### PM2
\`\`\`bash
cd /var/www/vubon.com.bd
git checkout <previous-commit>
pnpm --filter @vubon/notification-service build
pm2 restart notification-service
\`\`\`

### Database Rollback
\`\`\`bash
# Restore from backup
pg_restore -U vubon -d vubon_notification backup.dump
\`\`\`

## 🔐 Production Security

### Environment Variables

\`\`\`bash
# Generate strong JWT secret
openssl rand -base64 48

# Example: aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789abcdefghij
\`\`\`

### Firewall (VPS)

\`\`\`bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
\`\`\`

### SSL/TLS

\`\`\`bash
# Auto-renew with certbot
sudo certbot renew --dry-run
sudo systemctl enable certbot.timer
\`\`\`

## 📈 Performance Tuning

### Node.js

\`\`\`bash
NODE_OPTIONS="--max-old-space-size=1024" node dist/main.js
\`\`\`

### PostgreSQL

\`postgresql.conf\`:
\`\`\`
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
work_mem = 4MB
max_connections = 100
\`\`\`

### Redis

\`redis.conf\`:
\`\`\`
maxmemory 512mb
maxmemory-policy allkeys-lru
appendonly yes
\`\`\`

### Queue Workers

Increase concurrency in \`.env.production\`:
\`\`\`
QUEUE_WORKER_CONCURRENCY=10
\`\`\`

## 🎯 Deployment Checklist

Before deploy:
- [ ] All tests pass
- [ ] Type-check clean
- [ ] \`.env.production\` has all secrets
- [ ] DB migrations applied
- [ ] Docker image built (if using Docker)

After deploy:
- [ ] \`/health\` returns \`healthy: true\`
- [ ] Swagger loads: \`/api/docs\`
- [ ] Can send test notification
- [ ] Queue workers processing
- [ ] Sentry receiving events
- [ ] UptimeRobot shows green
- [ ] Database connection stable
- [ ] Redis responding
- [ ] Log aggregation working

## 📚 Related

- [README.md](./README.md) — overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) — local setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design
- [Dockerfile](../Dockerfile) — build config
`;

export function getDeploymentContent(): string {
  return DEPLOYMENT_CONTENT;
}

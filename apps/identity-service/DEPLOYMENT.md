# Deployment Guide — Identity Service

Production deployment guide for the Identity Service microservice.

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
- [ ] **OAuth secrets** (Google, Facebook, GitHub, Apple) — if used
- [ ] **SSO secrets** (OIDC/SAML) — if used
- [ ] **Email/SMS** API keys (SendGrid, SSLWireless) — for OTP

### Database
- [ ] PostgreSQL instance ready
- [ ] `vubon_identity` database created
- [ ] 27 tables applied via SQL migration
- [ ] Backup schedule configured
- [ ] Connection pool sized (100+)

### Infrastructure
- [ ] Redis instance ready
- [ ] Domain DNS configured (`identity.vubon.com.bd`)
- [ ] SSL certificate
- [ ] Reverse proxy (Nginx/Caddy)
- [ ] Firewall rules

### Security
- [ ] All secrets in env vars (not code)
- [ ] CORS origins restricted
- [ ] Rate limiting enabled
- [ ] Helmet headers enabled
- [ ] Account lock enabled
- [ ] MFA enabled for admins
- [ ] bcrypt rounds >= 12
- [ ] Session rotation enabled

---

## 🐳 Option 1 — Docker Deployment

### Dockerfile

Already exists in repo root. Multi-stage build with:
- Deps stage — install workspace deps
- Builder stage — build shared-kernel + identity-service
- Runtime stage — minimal production image

### Build & Run

\`\`\`bash
# Build image
docker build -t identity-service:1.0.0 .

# Run
docker run -d \\
  --name identity-service \\
  -p 3001:3001 \\
  --env-file .env.production \\
  identity-service:1.0.0

# Check logs
docker logs -f identity-service

# Health
curl http://localhost:3001/health
\`\`\`

### Docker Compose

Create `docker-compose.yml`:

\`\`\`yaml
version: '3.9'

services:
  identity-service:
    build: .
    ports:
      - '3001:3001'
    environment:
      NODE_ENV: production
      DB_MODE: prisma
      DATABASE_URL: postgresql://vubon:\${DB_PASSWORD}@postgres:5432/vubon_identity
      REDIS_URL: redis://redis:6379
      JWT_SECRET: \${JWT_SECRET}
      MFA_ENABLED: 'true'
      BCRYPT_ROUNDS: '12'
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: vubon_identity
      POSTGRES_USER: vubon
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U vubon -d vubon_identity']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass \${REDIS_PASSWORD}
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

### `nixpacks.toml` (already in repo)

\`\`\`toml
[phases.setup]
nixPkgs = ["nodejs_22", "pnpm"]

[phases.install]
cmds = ["pnpm install --frozen-lockfile"]

[phases.build]
cmds = [
  "pnpm --filter @vubon/shared-kernel build",
  "pnpm --filter @vubon/identity-service build",
]

[start]
cmd = "node apps/identity-service/dist/main.js"
\`\`\`

### `railway.toml` (already in repo)

\`\`\`toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node apps/identity-service/dist/main.js"
healthcheckPath = "/health"
healthcheckTimeout = 30
\`\`\`

### Deploy Steps

1. Connect GitHub repo to Railway
2. Railway auto-detects `nixpacks.toml`
3. Add env vars in Railway dashboard:
   - `DATABASE_URL`
   - `REDIS_URL`
   - `JWT_SECRET`
   - `MFA_ENABLED`
   - OAuth secrets (if used)
4. Add PostgreSQL plugin
5. Add Redis plugin
6. Deploy

### Run SQL Migration

\`\`\`bash
railway run psql \$DATABASE_URL < migrations/20261012_create_all_tables.sql
\`\`\`

---

## ☁️ Option 3 — Fly.io

### `fly.toml`

\`\`\`toml
app = "vubon-identity-service"
primary_region = "sin"

[build]
dockerfile = "Dockerfile"

[env]
PORT = "3001"
NODE_ENV = "production"
DB_MODE = "prisma"
MFA_ENABLED = "true"

[http_service]
internal_port = 3001
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
pnpm --filter @vubon/identity-service build

# Setup env
cd apps/identity-service
cp .env.production.example .env
nano .env  # Fill in production values
\`\`\`

### PM2 Ecosystem File

Create `ecosystem.config.cjs`:

\`\`\`javascript
module.exports = {
  apps: [{
    name: 'identity-service',
    script: 'dist/main.js',
    cwd: '/home/user/vubon.com.bd/apps/identity-service',
    instances: 2,
    exec_mode: 'cluster',
    env_file: '.env',
    error_file: '/var/log/identity-service/error.log',
    out_file: '/var/log/identity-service/out.log',
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
pm2 startup
\`\`\`

### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/identity-service`:

\`\`\`nginx
upstream identity_backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 80;
    server_name identity.vubon.com.bd;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name identity.vubon.com.bd;

    ssl_certificate /etc/letsencrypt/live/identity.vubon.com.bd/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/identity.vubon.com.bd/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # Rate limiting (auth-critical)
    limit_req zone=auth burst=10 nodelay;

    location / {
        proxy_pass http://identity_backend;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
\`\`\`

Enable & reload:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/identity-service /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
\`\`\`

### SSL with Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d identity.vubon.com.bd
\`\`\`

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy Identity Service

on:
  push:
    branches: [main]
    paths:
      - 'apps/identity-service/**'
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
      - run: pnpm --filter @vubon/identity-service type-check
      - run: pnpm --filter @vubon/identity-service build
      - run: pnpm --filter @vubon/identity-service test:unit
      - run: pnpm --filter @vubon/identity-service test:e2e

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
curl https://identity.vubon.com.bd/health
\`\`\`

Expected:
\`\`\`json
{
  "service": "identity-service",
  "status": "ok",
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

### Auth Metrics (critical)

Monitor:
- Login success rate
- Login failure rate
- Account lock events
- MFA usage
- Token refresh rate
- Session creation rate

### Logs

**PM2:**
\`\`\`bash
pm2 logs identity-service
pm2 monit
\`\`\`

**Docker:**
\`\`\`bash
docker logs -f identity-service
\`\`\`

---

## 🚨 Rollback Procedure

### PM2

\`\`\`bash
cd /home/user/vubon.com.bd
git log --oneline -5
git checkout <previous-commit>
pnpm install --frozen-lockfile
pnpm --filter @vubon/identity-service build
pm2 restart identity-service
\`\`\`

### Docker

\`\`\`bash
docker stop identity-service
docker rm identity-service
docker run -d --name identity-service \\
  --env-file .env.production \\
  -p 3001:3001 \\
  identity-service:<previous-version>
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
- ✅ `BCRYPT_ROUNDS=12`
- ✅ `MFA_ENABLED=true`
- ✅ `SESSION_ROTATION_ENABLED=true`

### Headers (Helmet)

\`\`\`typescript
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

### Rate Limiting (auth-critical)

\`\`\`typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot([{
  name: 'auth',
  ttl: 60000,
  limit: 5,
}]);
\`\`\`

### Account Lock

\`\`\`env
LOGIN_MAX_ATTEMPTS=5
LOCK_DURATION_MINUTES=15
\`\`\`

---

## 📈 Performance Tuning

### Node.js

\`\`\`bash
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

- Session store: separate DB
- Token blacklist: fast TTL
- Rate limiting: atomic INCR

---

## 🎯 Deployment Checklist

### Pre-Deploy
- [ ] All tests pass (`pnpm test:all`)
- [ ] Type-check clean (`pnpm type-check`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Env vars set correctly
- [ ] Database migrated (27 tables)
- [ ] OAuth secrets configured
- [ ] Backup current version

### Deploy
- [ ] Stop current version
- [ ] Deploy new version
- [ ] Verify health endpoint
- [ ] Smoke test auth flow (register + login + MFA)
- [ ] Monitor logs for 5 minutes

### Post-Deploy
- [ ] Verify all endpoints working
- [ ] Check auth metrics
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

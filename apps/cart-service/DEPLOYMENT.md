# Deployment Guide — Cart Service

## 🎯 Deployment Options

| Option | Complexity | Cost | Best For |
|--------|-----------|------|----------|
| **Docker** | Medium | Variable | Full control |
| **Railway** | Easy | $$ | Quick deploy |
| **Fly.io** | Easy | $ | Global edge |
| **AWS ECS** | Hard | $$$ | Enterprise |
| **VPS** | Medium | $ | Custom |
| **Kubernetes** | Hard | $$$$ | Scale |

## 📋 Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Type check clean
- [ ] `.env.production` ready
- [ ] JWT secret strong (32+ chars)
- [ ] DB migration ready
- [ ] Redis available
- [ ] Health endpoint works
- [ ] Docker build succeeds

## 🐳 Option 1 — Docker

```bash
docker build -t cart-service:latest .
docker run -d \
  --name cart-service \
  -p 3003:3003 \
  --env-file .env.production \
  cart-service:latest
```

## 🚂 Option 2 — Railway (Nixpacks)

```bash
railway login
railway link
railway up
```

**Environment variables:**
- `DB_MODE=prisma`
- `DATABASE_URL=<railway-postgres-url>`
- `REDIS_URL=<railway-redis-url>`
- `JWT_SECRET=<strong-secret>`

## ☁️ Option 3 — Fly.io

```bash
fly launch
fly secrets set JWT_SECRET=... DATABASE_URL=... REDIS_URL=...
fly deploy
```

## 🖥️ Option 4 — VPS (PM2 + Nginx)

```bash
# 1. Clone and install
git clone <repo> /opt/vubon
cd /opt/vubon && pnpm install

# 2. Build
pnpm --filter @vubon/cart-service build

# 3. PM2
pm2 start apps/cart-service/dist/main.js \
  --name cart-service \
  --env production
pm2 save

# 4. Nginx
cat > /etc/nginx/sites-available/cart-service << 'NGINX'
server {
  listen 80;
  server_name carts.vubon.com.bd;
  
  location / {
    proxy_pass http://localhost:3003;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
NGINX

# 5. SSL
certbot --nginx -d carts.vubon.com.bd
```

## 🔄 CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy Cart Service

on:
  push:
    branches: [main]
    paths: ['apps/cart-service/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @vubon/cart-service test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: railway up
```

## 📊 Monitoring

- **Health:** `GET /health` every 30s
- **Metrics:** Prometheus endpoint
- **Logs:** Structured JSON → ELK / Datadog
- **Alerts:** Slack on 5xx rate

## 🚨 Rollback Procedure

```bash
# Docker
docker rollback cart-service

# Railway
railway rollback

# PM2
pm2 restart cart-service --update-env
```

## 🔐 Production Security

- [ ] HTTPS enforced
- [ ] JWT secrets rotated
- [ ] DB credentials in secrets manager
- [ ] Rate limiting enabled
- [ ] CORS restricted
- [ ] Request size limits
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention (validation)

## 📈 Performance Tuning

| Setting | Recommended |
|---------|-------------|
| Node heap | `--max-old-space-size=2048` |
| PM2 instances | `max` (all cores) |
| DB pool | 20-50 |
| Redis pool | 10-20 |
| Worker concurrency | 5-10 |

## 🎯 Deployment Checklist

- [ ] Build passes
- [ ] Tests pass (100%)
- [ ] Env vars set
- [ ] DB migrated
- [ ] Redis available
- [ ] Health check OK
- [ ] Smoke test endpoints
- [ ] Monitoring configured
- [ ] Rollback plan ready
- [ ] Team notified

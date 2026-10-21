# Deployment Guide — Payment Service

## Deployment Options

| Option | Best For |
|--------|----------|
| Docker | Self-hosted, K8s |
| Railway | Fast, simple |
| Fly.io | Global edge |
| VPS | Full control |
| AWS ECS | Enterprise |

## Pre-Deployment Checklist

- Set DB_MODE=prisma
- Set DATABASE_URL (PostgreSQL)
- Set JWT_SECRET (32+ chars)
- Set REDIS_URL
- Enable DB_SSL=true
- Configure AWS keys (optional)
- Run migrations
- Verify /api/health returns healthy:true

## Option 1: Docker

    docker build -t payment-service:latest .
    docker run -d \
      --name payment-service \
      -p 3006:3006 \
      -e DB_MODE=prisma \
      -e DATABASE_URL=postgresql://... \
      -e JWT_SECRET=... \
      -e REDIS_URL=redis://... \
      payment-service:latest

## Option 2: Railway

    # Install Railway CLI
    npm i -g @railway/cli

    # Login
    railway login

    # Init
    railway init

    # Set env vars
    railway variables set DB_MODE=prisma
    railway variables set DATABASE_URL=...
    railway variables set JWT_SECRET=...
    railway variables set REDIS_URL=...

    # Deploy
    railway up

## Option 3: Fly.io

    fly launch --name payment-service
    fly secrets set DB_MODE=prisma
    fly secrets set DATABASE_URL=...
    fly deploy

## Option 4: VPS (PM2)

    # Clone
    git clone <repo>
    cd apps/payment-service

    # Install
    pnpm install
    pnpm build

    # Start with PM2
    pm2 start dist/main.js --name payment-service
    pm2 save
    pm2 startup

## CI/CD (GitHub Actions)

    name: Deploy
    on:
      push:
        branches: [main]
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: pnpm/action-setup@v4
          - run: pnpm install
          - run: pnpm test:unit
          - run: pnpm build
          - run: docker build -t payment-service .
          # push to registry + deploy

## Monitoring

- Health: GET /api/health
- Metrics: Prometheus endpoint
- Logs: structured JSON to stdout
- Traces: OpenTelemetry

## Rollback

    # Docker
    docker pull payment-service:previous
    docker stop payment-service
    docker run -d payment-service:previous

    # Railway
    railway rollback

## Production Security

- DB_SSL=true
- JWT_SECRET 32+ chars (use secrets manager)
- Redis password required
- HTTPS-only (TLS 1.2+)
- Rate limiting enabled
- CORS configured
- Firewall: only 3006 open

## Deployment Checklist

- [ ] DB_MODE=prisma set
- [ ] DATABASE_URL set
- [ ] JWT_SECRET set (32+ chars)
- [ ] REDIS_URL set
- [ ] DB_SSL=true
- [ ] Migrations applied
- [ ] /api/health returns healthy
- [ ] Postman smoke test passes
- [ ] Logs flowing
- [ ] Alerts configured

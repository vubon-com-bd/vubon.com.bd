# Deployment — Vendor Service

## Options
Docker, Railway, Fly.io, VPS + PM2, AWS ECS

## Pre-Deploy Checklist
- [ ] Tests pass
- [ ] Type-check passes
- [ ] .env.production ready
- [ ] Database migrated
- [ ] Redis accessible
- [ ] Health check 200
- [ ] Monitoring configured

## Docker
docker build -t vubon/vendor-service:1.0.0 .
docker run -d -p 3004:3004 --env-file .env.production vubon/vendor-service:1.0.0

## Railway
Config: railway.toml
  [build]
  builder = "nixpacks"
  buildCommand = "pnpm build"
  [deploy]
  startCommand = "node apps/vendor-service/dist/main.js"
  healthcheckPath = "/health"

## VPS + PM2
pm2 start ecosystem.config.js
pm2 save

## Nginx
server {
  listen 80;
  server_name vendors.vubon.com.bd;
  location / { proxy_pass http://localhost:3004; }
}

## Production Security
- JWT_SECRET >= 32 chars
- DB SSL
- Redis password
- CORS whitelist
- Rate limits
- HTTPS enforced

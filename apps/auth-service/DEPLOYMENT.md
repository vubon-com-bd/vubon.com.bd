<!-- AUTO-GENERATED from docs/deployment.doc.ts. Do not edit directly. -->

AUTH SERVICE — DEPLOYMENT GUIDE
@module auth-service/docs

══════════════════════════════════════════════════════════════════
 🚀 DEPLOYMENT OPTIONS
══════════════════════════════════════════════════════════════════

 Option 1: Railway (⭐ Recommended)
   • Free tier: $5 credit/month
   • ARM64 Linux ✅ (Prisma works)
   • Auto HTTPS, easy env vars
   • 1-click Postgres + Redis

 Option 2: Fly.io
   • Free tier: generous
   • ARM64 + x86_64 ✅
   • Global edge deploy
   • Dockerfile required

 Option 3: Render
   • Free tier
   • x86_64 only ⚠️
   • Auto-deploy from GitHub

 Option 4: VPS (Contabo, DigitalOcean)
   • $4-6/month
   • Full control
   • Manual setup (PM2, Nginx)

 Option 5: Kubernetes (EKS, GKE, DigitalOcean K8s)
   • Enterprise grade
   • $40+/month
   • Complex setup

---

══════════════════════════════════════════════════════════════════
 🚂 RAILWAY DEPLOYMENT (Recommended)
══════════════════════════════════════════════════════════════════

 Step 1 — Install Railway CLI
 ─────────────────────────────────────────────────────────────
   npm i -g @railway/cli

 Step 2 — Login
 ─────────────────────────────────────────────────────────────
   railway login

 Step 3 — Initialize project
 ─────────────────────────────────────────────────────────────
   cd ~/vubon.com.bd
   railway init
   # Select: New Project → Name: vubon-auth-service

 Step 4 — Add PostgreSQL
 ─────────────────────────────────────────────────────────────
   railway add --plugin postgresql

 Step 5 — Add Redis
 ─────────────────────────────────────────────────────────────
   railway add --plugin redis

 Step 6 — Set environment variables
 ─────────────────────────────────────────────────────────────
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=$(openssl rand -base64 48)
   railway variables set JWT_ISSUER=vubon-api
   railway variables set JWT_AUDIENCE=vubon-client
   # Railway auto-injects DATABASE_URL and REDIS_URL

 Step 7 — Deploy
 ─────────────────────────────────────────────────────────────
   railway up

 Step 8 — Verify
 ─────────────────────────────────────────────────────────────
   railway status
   railway logs
   railway domain   # Generate public URL

---

══════════════════════════════════════════════════════════════════
 🐳 DOCKERFILE (Multi-stage)
══════════════════════════════════════════════════════════════════

 Create: apps/auth-service/Dockerfile
 ─────────────────────────────────────────────────────────────
   FROM node:22-alpine AS builder
   WORKDIR /app
   RUN corepack enable
   COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
   COPY apps/auth-service ./apps/auth-service
   COPY packages ./packages
   RUN pnpm install --frozen-lockfile
   RUN pnpm --filter @vubon/auth-service build

   FROM node:22-alpine
   WORKDIR /app
   RUN corepack enable
   COPY --from=builder /app /app
   EXPOSE 3001
   CMD ["node", "apps/auth-service/dist/main.js"]

 ─────────────────────────────────────────────────────────────
 Build:
   docker build -t auth-service .

 Run:
   docker run -p 3001:3001 --env-file .env auth-service

 ══════════════════════════════════════════════════════════════════
 ⚙️ CI/CD — GitHub Actions
 ══════════════════════════════════════════════════════════════════

 File: .github/workflows/deploy.yml
 ─────────────────────────────────────────────────────────────
   name: Deploy Auth Service
   on:
     push:
       branches: [main]
       paths: ['apps/auth-service/**', 'packages/**']

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v3
           with: { version: 9 }
         - uses: actions/setup-node@v4
           with: { node-version: 22, cache: pnpm }
         - run: pnpm install --frozen-lockfile
         - run: pnpm --filter @vubon/auth-service type-check
         - run: pnpm --filter @vubon/auth-service test

     deploy:
       needs: test
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: npm i -g @railway/cli
         - run: railway up --service auth-service
           env:
             RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

---

══════════════════════════════════════════════════════════════════
 🔐 PRODUCTION ENVIRONMENT VARIABLES
══════════════════════════════════════════════════════════════════

 Railway auto-injects:
   DATABASE_URL           ← from Postgres plugin
   REDIS_URL              ← from Redis plugin

 You must set:
   NODE_ENV=production
   JWT_SECRET=<48+ random bytes base64>
   JWT_ISSUER=vubon-api
   JWT_AUDIENCE=vubon-client
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   CORS_ORIGINS=https://vubon.com.bd,https://admin.vubon.com.bd
   EMAIL_SMTP_HOST=smtp.gmail.com
   EMAIL_SMTP_PORT=587
   EMAIL_SMTP_USER=noreply@vubon.com.bd
   EMAIL_SMTP_PASSWORD=<app-password>
   BCRYPT_ROUNDS=12
   LOG_LEVEL=info
   TZ=Asia/Dhaka

 Generate secure JWT_SECRET:
   openssl rand -base64 48
   # OR
   node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"

 ⚠️ SECURITY CHECKLIST:
   ✅ JWT_SECRET: 48+ random chars (NOT default)
   ✅ DATABASE_URL: uses SSL
   ✅ CORS_ORIGINS: explicit list (NOT *)
   ✅ NODE_ENV: production
   ✅ LOG_LEVEL: info (NOT debug)
   ✅ EMAIL_SMTP: real credentials

---

══════════════════════════════════════════════════════════════════
 ✅ POST-DEPLOY VERIFICATION
══════════════════════════════════════════════════════════════════

 Step 1 — Check service is alive
 ─────────────────────────────────────────────────────────────
   curl -s https://your-app.up.railway.app/api/docs -o /dev/null -w "%{http_code}"
   # Expected: 200

 Step 2 — Run Prisma migrations
 ─────────────────────────────────────────────────────────────
   railway run pnpm --filter @vubon/auth-service prisma migrate deploy

 Step 3 — Test register endpoint
 ─────────────────────────────────────────────────────────────
   curl -X POST https://your-app.up.railway.app/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "Test1234!",
       "confirmPassword": "Test1234!",
       "acceptTerms": true
     }'

 Step 4 — Test login
 ─────────────────────────────────────────────────────────────
   curl -X POST https://your-app.up.railway.app/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"identifier":"test@example.com","password":"Test1234!"}'

 Step 5 — Check logs
 ─────────────────────────────────────────────────────────────
   railway logs --tail 100

 Step 6 — Monitor
 ─────────────────────────────────────────────────────────────
   railway status
   railway metrics

---

══════════════════════════════════════════════════════════════════
 🔄 ROLLBACK + BACKUP + MONITORING
══════════════════════════════════════════════════════════════════

 Rollback (Railway)
 ─────────────────────────────────────────────────────────────
   railway rollback                    # Last deploy
   railway deploy --commit <sha>       # Specific commit

 Database Backup (Supabase)
 ─────────────────────────────────────────────────────────────
   # Supabase: Automatic daily backups (Pro plan)
   # Manual: pg_dump
   pg_dump $DATABASE_URL > backup.sql

 Redis Backup
 ─────────────────────────────────────────────────────────────
   redis-cli BGSAVE
   cp /var/lib/redis/dump.rdb /backup/

 Monitoring Setup
 ─────────────────────────────────────────────────────────────
   1. Sentry       — error tracking
   2. DataDog      — APM
   3. Logtail      — log aggregation
   4. Better Stack — uptime + monitoring
   5. Prometheus + Grafana — metrics (self-hosted)

 Health Check Endpoint
 ─────────────────────────────────────────────────────────────
   GET /api/v1/health
   → { status: 'ok', uptime, db: 'ok', redis: 'ok' }

 Alerts (recommended)
 ─────────────────────────────────────────────────────────────
   • Error rate > 1%
   • Response time p95 > 500ms
   • CPU > 80% for 5 min
   • Memory > 80% for 5 min
   • DB connection pool exhausted

---

══════════════════════════════════════════════════════════════════
 🎯 DEPLOYMENT CHECKLIST
══════════════════════════════════════════════════════════════════

 Pre-Deploy:
   ☐ All tests passing locally (pnpm test)
   ☐ Type check clean (pnpm type-check)
   ☐ Build succeeds (pnpm build)
   ☐ .env.example updated
   ☐ Secrets not committed to git

 Deploy:
   ☐ Railway project initialized
   ☐ PostgreSQL plugin added
   ☐ Redis plugin added
   ☐ Env vars set
   ☐ railway up successful

 Post-Deploy:
   ☐ /api/docs returns 200
   ☐ prisma migrate deploy run
   ☐ Register endpoint works
   ☐ Login endpoint works
   ☐ Logs look clean

 Production:
   ☐ Custom domain setup
   ☐ SSL certificate active
   ☐ Monitoring enabled
   ☐ Alerts configured
   ☐ Backup schedule set

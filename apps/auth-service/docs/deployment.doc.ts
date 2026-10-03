/**
 * AUTH SERVICE — DEPLOYMENT GUIDE
 * @module auth-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🚀 DEPLOYMENT OPTIONS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Option 1: Railway (⭐ Recommended)
 *    • Free tier: $5 credit/month
 *    • ARM64 Linux ✅ (Prisma works)
 *    • Auto HTTPS, easy env vars
 *    • 1-click Postgres + Redis
 *
 *  Option 2: Fly.io
 *    • Free tier: generous
 *    • ARM64 + x86_64 ✅
 *    • Global edge deploy
 *    • Dockerfile required
 *
 *  Option 3: Render
 *    • Free tier
 *    • x86_64 only ⚠️
 *    • Auto-deploy from GitHub
 *
 *  Option 4: VPS (Contabo, DigitalOcean)
 *    • $4-6/month
 *    • Full control
 *    • Manual setup (PM2, Nginx)
 *
 *  Option 5: Kubernetes (EKS, GKE, DigitalOcean K8s)
 *    • Enterprise grade
 *    • $40+/month
 *    • Complex setup
 */

export const DEPLOYMENT_OPTIONS = {
  railway: {
    name: 'Railway',
    recommended: true,
    freeTier: '$5 credit/month',
    arch: 'ARM64',
    prismaWorks: true,
    cost: 'Free → $5/mo',
    ease: '⭐⭐⭐⭐⭐',
  },
  flyio: {
    name: 'Fly.io',
    recommended: false,
    freeTier: 'generous',
    arch: 'ARM64 + x86_64',
    prismaWorks: true,
    cost: 'Free → $5/mo',
    ease: '⭐⭐⭐⭐',
  },
  render: {
    name: 'Render',
    recommended: false,
    freeTier: true,
    arch: 'x86_64 only',
    prismaWorks: true,
    cost: 'Free → $7/mo',
    ease: '⭐⭐⭐⭐',
  },
  vps: {
    name: 'VPS (Contabo / DO)',
    recommended: false,
    freeTier: false,
    arch: 'Both',
    prismaWorks: true,
    cost: '$4-6/mo',
    ease: '⭐⭐⭐',
  },
  k8s: {
    name: 'Kubernetes',
    recommended: false,
    freeTier: false,
    arch: 'Both',
    prismaWorks: true,
    cost: '$40+/mo',
    ease: '⭐⭐',
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚂 RAILWAY DEPLOYMENT (Recommended)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Step 1 — Install Railway CLI
 *  ─────────────────────────────────────────────────────────────
 *    npm i -g @railway/cli
 *
 *  Step 2 — Login
 *  ─────────────────────────────────────────────────────────────
 *    railway login
 *
 *  Step 3 — Initialize project
 *  ─────────────────────────────────────────────────────────────
 *    cd ~/vubon.com.bd
 *    railway init
 *    # Select: New Project → Name: vubon-auth-service
 *
 *  Step 4 — Add PostgreSQL
 *  ─────────────────────────────────────────────────────────────
 *    railway add --plugin postgresql
 *
 *  Step 5 — Add Redis
 *  ─────────────────────────────────────────────────────────────
 *    railway add --plugin redis
 *
 *  Step 6 — Set environment variables
 *  ─────────────────────────────────────────────────────────────
 *    railway variables set NODE_ENV=production
 *    railway variables set JWT_SECRET=$(openssl rand -base64 48)
 *    railway variables set JWT_ISSUER=vubon-api
 *    railway variables set JWT_AUDIENCE=vubon-client
 *    # Railway auto-injects DATABASE_URL and REDIS_URL
 *
 *  Step 7 — Deploy
 *  ─────────────────────────────────────────────────────────────
 *    railway up
 *
 *  Step 8 — Verify
 *  ─────────────────────────────────────────────────────────────
 *    railway status
 *    railway logs
 *    railway domain   # Generate public URL
 */

export const RAILWAY_STEPS = [
  { step: 1, command: 'npm i -g @railway/cli', desc: 'Install CLI' },
  { step: 2, command: 'railway login', desc: 'Login' },
  { step: 3, command: 'railway init', desc: 'Init project' },
  { step: 4, command: 'railway add --plugin postgresql', desc: 'Add PostgreSQL' },
  { step: 5, command: 'railway add --plugin redis', desc: 'Add Redis' },
  { step: 6, command: 'railway variables set ...', desc: 'Set env vars' },
  { step: 7, command: 'railway up', desc: 'Deploy' },
  { step: 8, command: 'railway status && railway domain', desc: 'Verify' },
] as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐳 DOCKERFILE (Multi-stage)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Create: apps/auth-service/Dockerfile
 *  ─────────────────────────────────────────────────────────────
 *    FROM node:22-alpine AS builder
 *    WORKDIR /app
 *    RUN corepack enable
 *    COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
 *    COPY apps/auth-service ./apps/auth-service
 *    COPY packages ./packages
 *    RUN pnpm install --frozen-lockfile
 *    RUN pnpm --filter @vubon/auth-service build
 *
 *    FROM node:22-alpine
 *    WORKDIR /app
 *    RUN corepack enable
 *    COPY --from=builder /app /app
 *    EXPOSE 3001
 *    CMD ["node", "apps/auth-service/dist/main.js"]
 *
 *  ─────────────────────────────────────────────────────────────
 *  Build:
 *    docker build -t auth-service .
 *
 *  Run:
 *    docker run -p 3001:3001 --env-file .env auth-service
 *
 *  ══════════════════════════════════════════════════════════════════
 *  ⚙️ CI/CD — GitHub Actions
 *  ══════════════════════════════════════════════════════════════════
 *
 *  File: .github/workflows/deploy.yml
 *  ─────────────────────────────────────────────────────────────
 *    name: Deploy Auth Service
 *    on:
 *      push:
 *        branches: [main]
 *        paths: ['apps/auth-service/**', 'packages/**']
 *
 *    jobs:
 *      test:
 *        runs-on: ubuntu-latest
 *        steps:
 *          - uses: actions/checkout@v4
 *          - uses: pnpm/action-setup@v3
 *            with: { version: 9 }
 *          - uses: actions/setup-node@v4
 *            with: { node-version: 22, cache: pnpm }
 *          - run: pnpm install --frozen-lockfile
 *          - run: pnpm --filter @vubon/auth-service type-check
 *          - run: pnpm --filter @vubon/auth-service test
 *
 *      deploy:
 *        needs: test
 *        runs-on: ubuntu-latest
 *        steps:
 *          - uses: actions/checkout@v4
 *          - run: npm i -g @railway/cli
 *          - run: railway up --service auth-service
 *            env:
 *              RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
 */

export const DOCKERFILE = {
  path: 'apps/auth-service/Dockerfile',
  baseImage: 'node:22-alpine',
  stages: ['builder', 'runtime'],
  exposePort: 3001,
  cmd: 'node apps/auth-service/dist/main.js',
} as const;

export const CICD = {
  provider: 'GitHub Actions',
  file: '.github/workflows/deploy.yml',
  triggers: ['push to main'],
  jobs: ['test', 'deploy'],
  secrets: ['RAILWAY_TOKEN'],
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔐 PRODUCTION ENVIRONMENT VARIABLES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Railway auto-injects:
 *    DATABASE_URL           ← from Postgres plugin
 *    REDIS_URL              ← from Redis plugin
 *
 *  You must set:
 *    NODE_ENV=production
 *    JWT_SECRET=<48+ random bytes base64>
 *    JWT_ISSUER=vubon-api
 *    JWT_AUDIENCE=vubon-client
 *    JWT_ACCESS_EXPIRY=15m
 *    JWT_REFRESH_EXPIRY=7d
 *    CORS_ORIGINS=https://vubon.com.bd,https://admin.vubon.com.bd
 *    EMAIL_SMTP_HOST=smtp.gmail.com
 *    EMAIL_SMTP_PORT=587
 *    EMAIL_SMTP_USER=noreply@vubon.com.bd
 *    EMAIL_SMTP_PASSWORD=<app-password>
 *    BCRYPT_ROUNDS=12
 *    LOG_LEVEL=info
 *    TZ=Asia/Dhaka
 *
 *  Generate secure JWT_SECRET:
 *    openssl rand -base64 48
 *    # OR
 *    node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
 *
 *  ⚠️ SECURITY CHECKLIST:
 *    ✅ JWT_SECRET: 48+ random chars (NOT default)
 *    ✅ DATABASE_URL: uses SSL
 *    ✅ CORS_ORIGINS: explicit list (NOT *)
 *    ✅ NODE_ENV: production
 *    ✅ LOG_LEVEL: info (NOT debug)
 *    ✅ EMAIL_SMTP: real credentials
 */

export const PRODUCTION_ENV = {
  autoInjected: {
    DATABASE_URL: 'from Railway Postgres plugin',
    REDIS_URL: 'from Railway Redis plugin',
  },
  mustSet: {
    NODE_ENV: 'production',
    JWT_SECRET: '<48+ random bytes>',
    JWT_ISSUER: 'vubon-api',
    JWT_AUDIENCE: 'vubon-client',
    JWT_ACCESS_EXPIRY: '15m',
    JWT_REFRESH_EXPIRY: '7d',
    CORS_ORIGINS: 'https://vubon.com.bd,https://admin.vubon.com.bd',
    BCRYPT_ROUNDS: '12',
    LOG_LEVEL: 'info',
    TZ: 'Asia/Dhaka',
  },
  securityChecklist: [
    'JWT_SECRET is 48+ random chars',
    'DATABASE_URL uses SSL',
    'CORS_ORIGINS is explicit (NOT *)',
    'NODE_ENV=production',
    'LOG_LEVEL=info (NOT debug)',
    'EMAIL_SMTP has real credentials',
  ],
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  ✅ POST-DEPLOY VERIFICATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  Step 1 — Check service is alive
 *  ─────────────────────────────────────────────────────────────
 *    curl -s https://your-app.up.railway.app/api/docs -o /dev/null -w "%{http_code}"
 *    # Expected: 200
 *
 *  Step 2 — Run Prisma migrations
 *  ─────────────────────────────────────────────────────────────
 *    railway run pnpm --filter @vubon/auth-service prisma migrate deploy
 *
 *  Step 3 — Test register endpoint
 *  ─────────────────────────────────────────────────────────────
 *    curl -X POST https://your-app.up.railway.app/api/v1/auth/register \
 *      -H "Content-Type: application/json" \
 *      -d '{
 *        "email": "test@example.com",
 *        "password": "Test1234!",
 *        "confirmPassword": "Test1234!",
 *        "acceptTerms": true
 *      }'
 *
 *  Step 4 — Test login
 *  ─────────────────────────────────────────────────────────────
 *    curl -X POST https://your-app.up.railway.app/api/v1/auth/login \
 *      -H "Content-Type: application/json" \
 *      -d '{"identifier":"test@example.com","password":"Test1234!"}'
 *
 *  Step 5 — Check logs
 *  ─────────────────────────────────────────────────────────────
 *    railway logs --tail 100
 *
 *  Step 6 — Monitor
 *  ─────────────────────────────────────────────────────────────
 *    railway status
 *    railway metrics
 */

export const POST_DEPLOY_VERIFICATION = [
  { step: 1, action: 'Check /api/docs returns 200', tool: 'curl' },
  { step: 2, action: 'Run prisma migrate deploy', tool: 'railway run' },
  { step: 3, action: 'Test register endpoint', tool: 'curl' },
  { step: 4, action: 'Test login endpoint', tool: 'curl' },
  { step: 5, action: 'Check logs', tool: 'railway logs' },
  { step: 6, action: 'Monitor metrics', tool: 'railway status' },
] as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 ROLLBACK + BACKUP + MONITORING
 * ══════════════════════════════════════════════════════════════════
 *
 *  Rollback (Railway)
 *  ─────────────────────────────────────────────────────────────
 *    railway rollback                    # Last deploy
 *    railway deploy --commit <sha>       # Specific commit
 *
 *  Database Backup (Supabase)
 *  ─────────────────────────────────────────────────────────────
 *    # Supabase: Automatic daily backups (Pro plan)
 *    # Manual: pg_dump
 *    pg_dump $DATABASE_URL > backup.sql
 *
 *  Redis Backup
 *  ─────────────────────────────────────────────────────────────
 *    redis-cli BGSAVE
 *    cp /var/lib/redis/dump.rdb /backup/
 *
 *  Monitoring Setup
 *  ─────────────────────────────────────────────────────────────
 *    1. Sentry       — error tracking
 *    2. DataDog      — APM
 *    3. Logtail      — log aggregation
 *    4. Better Stack — uptime + monitoring
 *    5. Prometheus + Grafana — metrics (self-hosted)
 *
 *  Health Check Endpoint
 *  ─────────────────────────────────────────────────────────────
 *    GET /api/v1/health
 *    → { status: 'ok', uptime, db: 'ok', redis: 'ok' }
 *
 *  Alerts (recommended)
 *  ─────────────────────────────────────────────────────────────
 *    • Error rate > 1%
 *    • Response time p95 > 500ms
 *    • CPU > 80% for 5 min
 *    • Memory > 80% for 5 min
 *    • DB connection pool exhausted
 */

export const ROLLBACK_STRATEGY = {
  railway: {
    lastDeploy: 'railway rollback',
    specificCommit: 'railway deploy --commit <sha>',
  },
  backup: {
    database: 'pg_dump $DATABASE_URL > backup.sql',
    redis: 'redis-cli BGSAVE',
  },
} as const;

export const MONITORING_TOOLS = [
  'Sentry — error tracking',
  'DataDog — APM',
  'Logtail — log aggregation',
  'Better Stack — uptime monitoring',
  'Prometheus + Grafana — metrics',
] as const;

export const ALERTS = [
  'Error rate > 1%',
  'Response time p95 > 500ms',
  'CPU > 80% for 5 min',
  'Memory > 80% for 5 min',
  'DB connection pool exhausted',
] as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 DEPLOYMENT CHECKLIST
 * ══════════════════════════════════════════════════════════════════
 *
 *  Pre-Deploy:
 *    ☐ All tests passing locally (pnpm test)
 *    ☐ Type check clean (pnpm type-check)
 *    ☐ Build succeeds (pnpm build)
 *    ☐ .env.example updated
 *    ☐ Secrets not committed to git
 *
 *  Deploy:
 *    ☐ Railway project initialized
 *    ☐ PostgreSQL plugin added
 *    ☐ Redis plugin added
 *    ☐ Env vars set
 *    ☐ railway up successful
 *
 *  Post-Deploy:
 *    ☐ /api/docs returns 200
 *    ☐ prisma migrate deploy run
 *    ☐ Register endpoint works
 *    ☐ Login endpoint works
 *    ☐ Logs look clean
 *
 *  Production:
 *    ☐ Custom domain setup
 *    ☐ SSL certificate active
 *    ☐ Monitoring enabled
 *    ☐ Alerts configured
 *    ☐ Backup schedule set
 */

export const DEPLOYMENT_CHECKLIST = {
  preDeploy: [
    'All tests passing',
    'Type check clean',
    'Build succeeds',
    'Env example updated',
    'No secrets committed',
  ],
  deploy: [
    'Railway project initialized',
    'Postgres plugin added',
    'Redis plugin added',
    'Env vars set',
    'railway up successful',
  ],
  postDeploy: [
    '/api/docs returns 200',
    'prisma migrate deploy run',
    'Register endpoint works',
    'Login endpoint works',
    'Logs clean',
  ],
  production: [
    'Custom domain setup',
    'SSL certificate active',
    'Monitoring enabled',
    'Alerts configured',
    'Backup schedule set',
  ],
} as const;

export const DEPLOYMENT_GUIDE = {
  options: DEPLOYMENT_OPTIONS,
  railwaySteps: RAILWAY_STEPS,
  dockerfile: DOCKERFILE,
  cicd: CICD,
  productionEnv: PRODUCTION_ENV,
  postDeployVerification: POST_DEPLOY_VERIFICATION,
  rollback: ROLLBACK_STRATEGY,
  monitoring: MONITORING_TOOLS,
  alerts: ALERTS,
  checklist: DEPLOYMENT_CHECKLIST,
} as const;

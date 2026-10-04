# DEPLOYMENT

PRODUCT SERVICE — DEPLOYMENT GUIDE
@module product-service/docs

══════════════════════════════════════════════════════════════════
 🚀 DEPLOYMENT OPTIONS
══════════════════════════════════════════════════════════════════

 Option 1: Railway (⭐ Recommended)
   • Free tier: $5 credit/month
   • Linux x86_64 ✅ (Prisma works natively)
   • Auto HTTPS, easy env vars
   • 1-click Postgres + Redis + Meilisearch plugins
   • Dockerfile-based build

 Option 2: Fly.io
   • Free tier: generous
   • ARM64 + x86_64 ✅
   • Global edge deploy

 Option 3: Render
   • Free tier
   • x86_64 only ⚠️
   • Auto-deploy from GitHub

 Option 4: VPS (Contabo, DigitalOcean)
   • $4-6/month
   • Full control
   • Manual setup (PM2, Nginx)

---

══════════════════════════════════════════════════════════════════
 🚂 RAILWAY — STEP BY STEP
══════════════════════════════════════════════════════════════════

 Prerequisites:
   • GitHub account
   • Railway account
   • Repository pushed to GitHub

 ─────────────────────────────────────────────────────────────
 Step 1 — Create Project
 ─────────────────────────────────────────────────────────────

   • Go to https://railway.app
   • Sign in with GitHub
   • Click "New Project"
   • Select "Deploy from GitHub repo"
   • Choose "vubon-com-bd/vubon.com.bd"

 ─────────────────────────────────────────────────────────────
 Step 2 — Configure Service
 ─────────────────────────────────────────────────────────────

   In the Railway service settings:

     Root Directory    : (leave empty = repo root)
     Dockerfile Path   : apps/product-service/Dockerfile
     Build Context     : .
     Watch Paths       : apps/product-service/**, packages/**

 ─────────────────────────────────────────────────────────────
 Step 3 — Add PostgreSQL
 ─────────────────────────────────────────────────────────────

   • Click "+ New" → "Database" → "PostgreSQL"
   • Railway provisions a Postgres instance
   • Copy DATABASE_URL reference (auto-injected)

 ─────────────────────────────────────────────────────────────
 Step 4 — Add Redis
 ─────────────────────────────────────────────────────────────

   • Click "+ New" → "Database" → "Redis"
   • Railway provisions a Redis instance
   • Copy REDIS_URL reference (auto-injected)

 ─────────────────────────────────────────────────────────────
 Step 5 — Add Meilisearch (Search)
 ─────────────────────────────────────────────────────────────

   • Deploy meilisearch/meilisearch:latest via Docker
   • Or use a hosted Meilisearch Cloud instance
   • Set SEARCH_HOST and SEARCH_API_KEY

 ─────────────────────────────────────────────────────────────
 Step 6 — Set Environment Variables
 ─────────────────────────────────────────────────────────────

   In Railway dashboard → Service → Variables:

     NODE_ENV            = production
     PORT                = 4002
     APP_NAME            = product-service

     DATABASE_URL        = ${{Postgres.DATABASE_URL}}
     DB_SSL              = true

     REDIS_URL           = ${{Redis.REDIS_URL}}
     REDIS_KEY_PREFIX    = vubon:
     REDIS_DB            = 0
     REDIS_QUEUE_DB      = 1

     JWT_SECRET          = (48+ random chars)
     JWT_ISSUER          = vubon-api
     JWT_AUDIENCE        = vubon-client

     CORS_ORIGINS        = https://your-frontend.com
     LOG_LEVEL           = info

     SEARCH_PROVIDER     = meilisearch
     SEARCH_HOST         = http://meilisearch.railway.internal:7700
     SEARCH_API_KEY      = (production key)

     STORAGE_PROVIDER    = s3
     STORAGE_S3_BUCKET   = vubon-media
     STORAGE_CDN_URL     = https://cdn.vubon.com.bd

   See `.env.production.example` for full list.

 ─────────────────────────────────────────────────────────────
 Step 7 — Deploy
 ─────────────────────────────────────────────────────────────

   Railway auto-deploys on push to main.
   Or trigger manually:

     railway up --service product-service

   Watch the build logs in the dashboard.

 ─────────────────────────────────────────────────────────────
 Step 8 — Verify
 ─────────────────────────────────────────────────────────────

   Health check:
     curl https://<your-domain>/api/v1/docs-json

   Swagger UI:
     https://<your-domain>/api/v1/docs

   Public products:
     curl https://<your-domain>/api/v1/public/products

---

══════════════════════════════════════════════════════════════════
 📦 DOCKERFILE
══════════════════════════════════════════════════════════════════

 Location: apps/product-service/Dockerfile

 Multi-stage build:
   Stage 1 (builder) — installs deps, builds shared packages,
                       generates Prisma client, builds product-service
   Stage 2 (runtime) — minimal Node 22 + dist + node_modules

 Build (from repo root):

   docker build -f apps/product-service/Dockerfile -t product-service .

 Run:

   docker run -p 4002:4002 \
     -e DATABASE_URL=... \
     -e REDIS_URL=... \
     -e JWT_SECRET=... \
     -e SEARCH_HOST=... \
     product-service

 Entrypoint (scripts/docker-entrypoint.sh):
   1. Prints env summary (secrets redacted)
   2. Runs `prisma migrate deploy` from shared-kernel
   3. Starts `node dist/main.js`

---

══════════════════════════════════════════════════════════════════
 🔧 PRISMA MIGRATIONS ON DEPLOY
══════════════════════════════════════════════════════════════════

 The Prisma schema lives in:

   packages/shared-kernel/prisma/schema.prisma

 On every Railway deploy:

   1. Docker build runs `prisma generate`
   2. Container start runs `prisma migrate deploy`
   3. Pending migrations applied automatically

 No manual step needed.

 To create a new migration locally:

   cd packages/shared-kernel
   pnpm prisma migrate dev --name <description>

 Commit both:
   • schema.prisma
   • prisma/migrations/<timestamp>_<name>/

---

══════════════════════════════════════════════════════════════════
 🌍 ENVIRONMENT VARIABLES REFERENCE
══════════════════════════════════════════════════════════════════

 Runtime:
   NODE_ENV            = production | development
   PORT                = 4002
   APP_NAME            = product-service
   LOG_LEVEL           = error | warn | info | debug

 Database:
   DATABASE_URL        = postgresql://...
   DB_SSL              = true | false
   DB_LOGGING          = true | false
   DB_TIMEZONE         = Asia/Dhaka

 Redis:
   REDIS_URL           = redis://...
   REDIS_KEY_PREFIX    = vubon:
   REDIS_DB            = 0
   REDIS_QUEUE_DB      = 1
   REDIS_HOST          = 127.0.0.1
   REDIS_PORT          = 6379
   REDIS_PASSWORD      =

 JWT:
   JWT_SECRET          = 48+ random chars
   JWT_ISSUER          = vubon-api
   JWT_AUDIENCE        = vubon-client

 CORS:
   CORS_ORIGINS        = comma-separated list

 Search:
   SEARCH_PROVIDER     = meilisearch | elasticsearch | typesense
   SEARCH_HOST         = http://localhost:7700
   SEARCH_API_KEY      = masterKey
   SEARCH_PRODUCT_INDEX= products
   SEARCH_CATEGORY_INDEX = categories

 Storage:
   STORAGE_PROVIDER    = local | s3 | gcs
   STORAGE_S3_BUCKET   = vubon-media
   STORAGE_S3_REGION   = ap-southeast-1
   STORAGE_CDN_URL     = https://cdn.vubon.com.bd

 Media:
   MEDIA_IMAGE_MAX_SIZE_MB   = 5
   MEDIA_VIDEO_MAX_SIZE_MB   = 100
   MEDIA_IMAGE_QUALITY       = 85
   MEDIA_THUMBNAIL_WIDTH     = 400

 Cache TTL (seconds):
   PRODUCT_CACHE_TTL        = 300
   VARIANT_CACHE_TTL        = 300
   INVENTORY_CACHE_TTL      = 60
   PRICING_CACHE_TTL        = 300
   REVIEW_CACHE_TTL         = 120
   BRAND_CACHE_TTL          = 600

 Pagination:
   PRODUCT_PAGE_SIZE        = 20
   PRODUCT_MAX_PAGE_SIZE    = 100

 Feature flags:
   PRODUCT_SEARCH_INDEXING  = true
   VARIANT_AUTO_MATRIX      = true
   INVENTORY_LOW_STOCK_ALERTS = true

---

══════════════════════════════════════════════════════════════════
 📈 SCALING
══════════════════════════════════════════════════════════════════

 Vertical scaling:
   Railway dashboard → Settings → Plan → larger instance

 Horizontal scaling:
   Add more replicas.

   ⚠️ If BullMQ workers run inside this service, only ONE replica
      should run the worker process — or move workers to a
      separate Railway service.

   Recommended split:
     product-service          — API only
     product-service-worker   — BullMQ workers only

 Database:
   Supabase / Railway Postgres handles connection pooling.
   Use pgbouncer (transaction mode) for the app.

 Search:
   Meilisearch scales vertically. For > 1M products, consider
   Meilisearch Cloud or Elasticsearch.

---

══════════════════════════════════════════════════════════════════
 🐛 TROUBLESHOOTING
══════════════════════════════════════════════════════════════════

 Build fails: "pnpm-lock.yaml missing"
   → Ensure Dockerfile COPYs pnpm-lock.yaml + pnpm-workspace.yaml.

 Build fails: "Prisma engine not found"
   → Ensure Dockerfile runs `prisma generate` after install.
   → binaryTargets must include `debian-openssl-3.0.x`.

 Runtime: "Cannot connect to database"
   → Verify DATABASE_URL is injected.
   → Check Postgres plugin is running.

 Runtime: "Search API 403"
   → Verify SEARCH_API_KEY matches Meilisearch master key.
   → Check SEARCH_HOST uses internal URL.

 Runtime: "Redis connection refused"
   → Verify REDIS_URL.
   → Ensure Redis plugin is running.

 Worker: "Job processing timeout"
   → Reduce QUEUE_CONCURRENCY.
   → Increase job timeout.

 Memory limit exceeded
   → Railway free plan: 512MB.
   → Reduce QUEUE_WORKER_CONCURRENCY.
   → Or set QUEUE_ENABLED=false if workers not needed.

---

══════════════════════════════════════════════════════════════════
 🔐 SECURITY CHECKLIST
══════════════════════════════════════════════════════════════════

 Before deploy:
   ☐ JWT_SECRET: 48+ random chars (NOT default)
   ☐ DATABASE_URL: uses SSL
   ☐ SEARCH_API_KEY: production key (NOT masterKey)
   ☐ CORS_ORIGINS: explicit list (NOT *)
   ☐ NODE_ENV: production
   ☐ LOG_LEVEL: info (NOT debug)
   ☐ STORAGE_S3_ACCESS_KEY / SECRET_KEY: production

 After deploy:
   ☐ /api/v1/docs-json returns 200
   ☐ Swagger UI loads
   ☐ GET /public/products works
   ☐ Prisma migrations applied (check DB)
   ☐ Redis connected (check logs)
   ☐ Meilisearch connected (check logs)
   ☐ Workers started (check logs)

 Production:
   ☐ Custom domain configured
   ☐ SSL certificate active
   ☐ Monitoring enabled
   ☐ Alerts configured
   ☐ Backup schedule set

---

══════════════════════════════════════════════════════════════════
 📋 POST-DEPLOY CHECKLIST
══════════════════════════════════════════════════════════════════

 Deploy:
   ☐ Railway project initialized
   ☐ PostgreSQL plugin added
   ☐ Redis plugin added
   ☐ Meilisearch deployed
   ☐ Env vars set
   ☐ Railway build successful

 Post-Deploy:
   ☐ /api/v1/docs-json returns 200
   ☐ Prisma migrations applied
   ☐ Public endpoint works
   ☐ Protected endpoint rejects without JWT
   ☐ Search index populated (run reindex)
   ☐ Logs look clean

 Production:
   ☐ Custom domain setup
   ☐ SSL certificate active
   ☐ Monitoring enabled
   ☐ Alerts configured
   ☐ Backup schedule set
   ☐ Rollback plan documented

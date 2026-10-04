/**
 * CART SERVICE — DEPLOYMENT GUIDE
 * @module cart-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🚂 RAILWAY DEPLOYMENT (PRIMARY)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Deployed as Docker container on Railway.
 *
 *  Configuration:
 *    • Root directory      — repository root (monorepo)
 *    • Dockerfile          — apps/cart-service/Dockerfile
 *    • Start command       — node dist/main.js
 *    • Health check path   — /api/v1/health
 *    • Restart policy      — on-failure (max 3)
 *
 *  Build process:
 *    1. pnpm install (workspace)
 *    2. Build shared-* packages
 *    3. Build cart-service
 *    4. Run migrations (Prisma)
 *    5. Start Node server
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐳 DOCKERFILE
 * ══════════════════════════════════════════════════════════════════
 *
 *  Multi-stage build (Node 22 alpine):
 *
 *  # ---- Stage 1: Builder ----
 *  FROM node:22-alpine AS builder
 *  RUN corepack enable
 *  WORKDIR /app
 *
 *  # Copy workspace
 *  COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
 *  COPY packages ./packages
 *  COPY apps/cart-service ./apps/cart-service
 *
 *  # Install + build
 *  RUN pnpm install --frozen-lockfile
 *  RUN pnpm --filter @vubon/shared-kernel build
 *  RUN pnpm --filter @vubon/shared-constants build
 *  RUN pnpm --filter @vubon/shared-types build
 *  RUN pnpm --filter @vubon/shared-config build
 *  RUN pnpm --filter @vubon/shared-utils build
 *  RUN pnpm --filter @vubon/cart-service build
 *
 *  # ---- Stage 2: Runtime ----
 *  FROM node:22-alpine
 *  WORKDIR /app
 *  RUN corepack enable
 *
 *  COPY --from=builder /app/node_modules ./node_modules
 *  COPY --from=builder /app/packages ./packages
 *  COPY --from=builder /app/apps/cart-service/dist ./apps/cart-service/dist
 *  COPY --from=builder /app/apps/cart-service/package.json ./apps/cart-service/
 *  COPY --from=builder /app/apps/cart-service/prisma ./apps/cart-service/prisma
 *
 *  EXPOSE 4003
 *  HEALTHCHECK --interval=30s --timeout=5s \
 *    CMD wget -qO- http://localhost:4003/api/v1/health || exit 1
 *
 *  WORKDIR /app/apps/cart-service
 *  CMD ["node", "dist/main.js"]
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔑 ENVIRONMENT VARIABLES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Required:
 *    NODE_ENV              production | development
 *    PORT                  4003
 *    DATABASE_URL          postgresql://user:pass@host:5432/db
 *    REDIS_URL             redis://user:pass@host:6379
 *    JWT_SECRET            <32+ char secret>
 *
 *  Redis:
 *    REDIS_KEY_PREFIX      vubon:
 *    REDIS_DB              0
 *    REDIS_TLS             false
 *    REDIS_MAX_RETRIES     3
 *    REDIS_RETRY_DELAY_MS  200
 *
 *  External services (for cross-service calls):
 *    PRODUCT_SERVICE_URL   https://api.vubon.com.bd/products
 *    USER_SERVICE_URL      https://api.vubon.com.bd/users
 *    TAX_SERVICE_URL       https://api.vubon.com.bd/tax
 *    SHIPPING_SERVICE_URL  https://api.vubon.com.bd/shipping
 *    COUPON_SERVICE_URL    https://api.vubon.com.bd/coupons
 *
 *  Cart-specific:
 *    CART_DEFAULT_CURRENCY         BDT
 *    CART_USER_TTL_HOURS           720
 *    CART_GUEST_TTL_HOURS          168
 *    CART_REDIS_TTL                604800
 *    CART_MAX_ITEMS                100
 *    CART_MAX_QTY_PER_ITEM         999
 *    CART_CACHE_TTL                300
 *
 *  Abandonment:
 *    ABANDONED_ENABLED             true
 *    ABANDONED_THRESHOLD_HOURS     24
 *    ABANDONED_MAX_REMINDERS       4
 *    ABANDONED_DISCOUNT_PERCENT    10
 *    ABANDONED_EXPIRY_DAYS         30
 *
 *  Reminders:
 *    REMINDER_EMAIL_ENABLED        true
 *    REMINDER_SMS_ENABLED          false
 *    REMINDER_PUSH_ENABLED         true
 *    REMINDER_FIRST_HOURS          1
 *    REMINDER_SECOND_HOURS         24
 *    REMINDER_THIRD_HOURS          72
 *    REMINDER_FINAL_HOURS          168
 *
 *  Email / SMS / Push (shared-config):
 *    EMAIL_ENABLED                 true
 *    EMAIL_FROM_ADDRESS            noreply@vubon.com.bd
 *    SMS_ENABLED                   true
 *    PUSH_ENABLED                  true
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 DEPLOY STEPS (Railway)
 * ══════════════════════════════════════════════════════════════════
 *
 *  # 1. Add Redis + Postgres add-ons in Railway dashboard
 *
 *  # 2. Set environment variables
 *    railway variables set NODE_ENV=production
 *    railway variables set PORT=4003
 *    railway variables set DATABASE_URL=...
 *    railway variables set REDIS_URL=...
 *    railway variables set JWT_SECRET=...
 *
 *  # 3. Deploy
 *    git push origin main
 *    # Railway auto-detects Dockerfile, builds, deploys
 *
 *  # 4. Verify
 *    curl https://cart.vubon.com.bd/api/v1/health
 *    curl https://cart.vubon.com.bd/api/v1/docs
 *
 *  # 5. Run migrations (once after first deploy)
 *    railway run pnpm --filter @vubon/cart-service prisma:migrate
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 SCALING
 * ══════════════════════════════════════════════════════════════════
 *
 *  Horizontal:
 *    • Service is stateless (Redis is shared store)
 *    • Can scale to N replicas
 *    • Each replica runs its own BullMQ workers (auto-shard by job)
 *
 *  Vertical:
 *    • 512 MB RAM / 1 vCPU is sufficient for 1000 RPS
 *    • Increase if BullMQ queues backlog
 *
 *  Redis:
 *    • Use Redis Sentinel / Cluster for HA
 *    • Set maxmemory-policy allkeys-lru
 *    • Persist with AOF for durability
 *
 *  Database:
 *    • Prisma persistent features: SavedItem, AbandonedCart, CartMerger
 *    • Enable PgBouncer for connection pooling
 *    • Recommended: 5-connection pool per replica
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📈 MONITORING
 * ══════════════════════════════════════════════════════════════════
 *
 *  Health check:
 *    GET /api/v1/health  → 200 (ok) / 200 (degraded)
 *
 *  Metrics (MetricsService, optional):
 *    • cart.created       (counter)
 *    • cart.items.added   (counter)
 *    • cart.abandoned     (counter)
 *    • cart.recovered     (counter)
 *    • cart.calculation.ms (histogram)
 *
 *  Logging (LoggerService, structured):
 *    • level: error | warn | log | debug
 *    • output: JSON in production, pretty in dev
 *    • redact: password, token, authorization
 *
 *  Alerts (recommended):
 *    • p95 latency > 200ms
 *    • Error rate > 1%
 *    • Redis connection lost
 *    • BullMQ queue depth > 1000
 *    • Abandonment detection delay > 5 min
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 ROLLBACK
 * ══════════════════════════════════════════════════════════════════
 *
 *  # View recent deploys
 *  railway deployments
 *
 *  # Rollback to previous
 *  railway rollback <deployment-id>
 *
 *  # Rollback migrations (Prisma)
 *  pnpm --filter @vubon/cart-service prisma migrate resolve --rolled-back <migration>
 *
 *  Safe rollback rules:
 *    • Never rollback destructive migrations
 *    • Redis is ephemeral — no rollback needed
 *    • Cart data re-creates on next request
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔐 SECURITY CHECKLIST
 * ══════════════════════════════════════════════════════════════════
 *
 *  Production hardening:
 *    ☐ JWT_SECRET >= 32 chars, rotated regularly
 *    ☐ DATABASE_URL uses SSL (sslmode=require)
 *    ☐ REDIS_URL uses TLS (rediss://)
 *    ☐ Rate limit enabled (RateLimitGuard)
 *    ☐ CORS restricted to known origins
 *    ☐ Swagger disabled in production (or behind auth)
 *    ☐ Logs redact sensitive fields
 *    ☐ Health check excluded from public traffic (rate-limited)
 *    ☐ DB user has minimal privileges
 *    ☐ Secrets stored in Railway vault / env (never in code)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧪 PRE-DEPLOY CHECKLIST
 * ══════════════════════════════════════════════════════════════════
 *
 *  ☐ pnpm type-check  → clean
 *  ☐ pnpm build       → clean
 *  ☐ pnpm test        → all pass (≥1000 tests)
 *  ☐ pnpm test:e2e    → all pass
 *  ☐ .env.production updated
 *  ☐ CHANGELOG updated
 *  ☐ Version bumped in package.json
 *  ☐ Redis + Postgres provisioned
 *  ☐ DNS + SSL configured
 *  ☐ Monitoring + alerting ready
 *  ☐ Rollback plan documented
 */

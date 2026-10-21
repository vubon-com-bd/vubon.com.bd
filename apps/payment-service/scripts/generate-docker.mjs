#!/usr/bin/env node
/**
 * Docker Setup Generator — Payment Service
 * @module payment-service/scripts
 *
 * Generates:
 *  - Dockerfile (Debian, active)
 *  - Dockerfile.alpine (backup)
 *  - Dockerfile.debian (backup)
 *  - .dockerignore
 *  - DOCKER.md (documentation)
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const SERVICE = {
  slug: 'payment-service',
  pkg: '@vubon/payment-service',
  port: 3006,
  title: 'Payment Service',
};

const SHARED_PACKAGES = [
  'shared-constants',
  'shared-types',
  'shared-utils',
  'shared-config',
  'shared-schemas',
  'shared-api',
  'shared-kernel',
];

// ─────────────────────────────────────────────
// BUILD ORDER
// ─────────────────────────────────────────────
function buildOrderRun() {
  const lines = [];
  for (let i = 0; i < SHARED_PACKAGES.length; i++) {
    const pkg = SHARED_PACKAGES[i];
    const filter = `@vubon/${pkg}`;
    const prefix = i === 0 ? 'RUN' : ' &&';
    lines.push(`${prefix} pnpm --filter ${filter} build \\`);
  }
  lines.push(` && pnpm --filter ${SERVICE.pkg} build`);
  return lines.join('\n');
}

function copySharedPackages() {
  return SHARED_PACKAGES.map(
    (pkg) => `COPY packages/${pkg}/package.json ./packages/${pkg}/`,
  ).join('\n');
}

// ─────────────────────────────────────────────
// DOCKERFILE — DEBIAN (default)
// ─────────────────────────────────────────────
function generateDockerfileDebian() {
  return `# ═══════════════════════════════════════════════════════════════
# ${SERVICE.title} — Production Dockerfile (Debian, Prisma-safe)
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
${copySharedPackages()}
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ───
FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY . .
${buildOrderRun()}

# ─── Stage 3: Runtime ───
FROM node:22-slim AS runtime
WORKDIR /app

RUN apt-get update && \\
    apt-get install -y --no-install-recommends wget tini && \\
    rm -rf /var/lib/apt/lists/* && \\
    corepack enable

RUN groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/packages ./packages
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/dist ./apps/${SERVICE.slug}/dist

USER app
WORKDIR /app/apps/${SERVICE.slug}

ENV NODE_ENV=production
ENV PORT=${SERVICE.port}
ENV PERSISTENCE_DRIVER=prisma
ENV PRISMA_SKIP_ENGINE_BOOTSTRAP=false

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \\
  CMD wget --spider -q http://localhost:${SERVICE.port}/api/health || exit 1

EXPOSE ${SERVICE.port}

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "dist/main.js"]
`;
}

// ─────────────────────────────────────────────
// DOCKERFILE — ALPINE
// ─────────────────────────────────────────────
function generateDockerfileAlpine() {
  return `# ═══════════════════════════════════════════════════════════════
# ${SERVICE.title} — Production Dockerfile (Alpine)
# ⚠️  Alpine uses musl — may break Prisma engine.
#     Use only if Prisma engine is compatible or PERSISTENCE_DRIVER=memory.
# ═══════════════════════════════════════════════════════════════

FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
${copySharedPackages()}
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY . .
${buildOrderRun()}

FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache wget tini && \\
    corepack enable

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/packages ./packages
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/dist ./apps/${SERVICE.slug}/dist

USER app
WORKDIR /app/apps/${SERVICE.slug}

ENV NODE_ENV=production
ENV PORT=${SERVICE.port}
ENV PERSISTENCE_DRIVER=memory
ENV PRISMA_SKIP_ENGINE_BOOTSTRAP=true

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \\
  CMD wget --spider -q http://localhost:${SERVICE.port}/api/health || exit 1

EXPOSE ${SERVICE.port}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
`;
}

// ─────────────────────────────────────────────
// .dockerignore
// ─────────────────────────────────────────────
function generateDockerignore() {
  return `# ─── Dependencies ───
node_modules
.pnpm-store

# ─── Build output ───
dist
build
*.tsbuildinfo

# ─── Test ───
coverage
test
test-results.json
e2e-results.json

# ─── Env ───
.env
.env.local
.env.production
.env.*.local

# ─── Logs ───
*.log
logs

# ─── OS ───
.DS_Store
Thumbs.db

# ─── IDE ───
.vscode
.idea
*.swp
*.swo

# ─── VCS ───
.git
.gitignore

# ─── Prisma ───
prisma/migrations
*.db

# ─── Redis ───
dump.rdb

# ─── Docs / scripts ───
DOCKER.md
postman
scripts
.github
.cache
tmp
temp
`;
}

// ─────────────────────────────────────────────
// DOCKER.md
// ─────────────────────────────────────────────
function generateDockerMd() {
  const pkgList = SHARED_PACKAGES.map((p, i) => `       ${i + 1}. ${p}`).join('\n');

  return `# ${SERVICE.title} — Docker Setup

Production-grade Docker image for ${SERVICE.title}.

---

## 📁 Files

| File | Purpose |
|------|---------|
| \`Dockerfile\` | Active Dockerfile (Debian, Prisma-safe) |
| \`Dockerfile.alpine\` | Alpine variant (smaller, may break Prisma) |
| \`Dockerfile.debian\` | Debian variant (same as active) |
| \`.dockerignore\` | Build context exclusions |

---

## 🏗️ Multi-Stage Build

\`\`\`
Stage 1: deps
  ├── Copy lockfile + workspace config
  ├── Copy shared packages package.json
  ├── Copy ${SERVICE.slug} package.json
  └── pnpm install --frozen-lockfile

Stage 2: builder
  ├── Copy node_modules from deps
  ├── Copy source (packages/ + apps/)
  └── Build 8 packages in topological order:
${pkgList}
       ${SHARED_PACKAGES.length + 1}. ${SERVICE.slug}

Stage 3: runtime
  ├── node:22-slim base
  ├── Install wget + tini
  ├── Create non-root user (app)
  ├── Copy from builder (node_modules + packages + dist)
  ├── USER app
  ├── HEALTHCHECK (wget --spider /api/health)
  ├── EXPOSE ${SERVICE.port}
  ├── ENTRYPOINT tini
  └── CMD node dist/main.js
\`\`\`

---

## 🚀 Build & Run

### 1. Build image

\`\`\`bash
cd ~/vubon.com.bd
docker build -f apps/${SERVICE.slug}/Dockerfile -t vubon/${SERVICE.slug}:latest .
\`\`\`

### 2. Run container

\`\`\`bash
docker run -d \\
  --name ${SERVICE.slug} \\
  -p ${SERVICE.port}:${SERVICE.port} \\
  -e PERSISTENCE_DRIVER=prisma \\
  -e DATABASE_URL=postgresql://user:pass@host:5432/vubon_payment \\
  -e REDIS_URL=redis://host:6379 \\
  -e JWT_SECRET=your-secret-min-32-chars \\
  -e NODE_ENV=production \\
  vubon/${SERVICE.slug}:latest
\`\`\`

### 3. Health check

\`\`\`bash
curl http://localhost:${SERVICE.port}/api/health
\`\`\`

### 4. Stop

\`\`\`bash
docker stop ${SERVICE.slug}
docker rm ${SERVICE.slug}
\`\`\`

---

## 🌍 Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| \`NODE_ENV\` | ✅ | \`production\` | Runtime environment |
| \`PORT\` | ✅ | \`${SERVICE.port}\` | HTTP port |
| \`PERSISTENCE_DRIVER\` | ⚠️ | \`prisma\` | \`prisma\` or \`memory\` |
| \`DATABASE_URL\` | ✅ (prisma) | — | Postgres connection |
| \`REDIS_URL\` | ✅ | — | Redis connection |
| \`JWT_SECRET\` | ✅ | — | Min 32 chars |
| \`PRISMA_SKIP_ENGINE_BOOTSTRAP\` | ⚠️ | \`false\` | \`true\` for Termux/dev |
| \`QUEUE_AUTO_START_WORKERS\` | ⚠️ | \`true\` | Background workers |
| \`BKASH_ENABLED\` | ⚠️ | \`false\` | Enable bKash gateway |
| \`STRIPE_ENABLED\` | ⚠️ | \`false\` | Enable Stripe gateway |

---

## 🧪 Verify Image

\`\`\`bash
# Health
curl http://localhost:${SERVICE.port}/api/health

# Swagger
curl http://localhost:${SERVICE.port}/api/docs

# Create test payment
curl -X POST http://localhost:${SERVICE.port}/api/payments \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: test-$(date +%s)" \\
  -d '{
    "orderId": "00000000-0000-4000-8000-000000000006",
    "method": "card",
    "gateway": "stripe",
    "amount": 100,
    "currency": "BDT"
  }'

# List payments
curl "http://localhost:${SERVICE.port}/api/payments?page=1&limit=5"

# Stats
curl http://localhost:${SERVICE.port}/api/payments/stats
\`\`\`

---

## 📊 Image Details

| Property | Value |
|----------|-------|
| Base image | \`node:22-slim\` (Debian) |
| Multi-stage | ✅ 3 stages |
| Non-root user | ✅ \`app\` |
| Health check | ✅ \`wget --spider /api/health\` |
| Signal handling | ✅ \`tini\` (PID 1) |
| Estimated size | ~350-450MB |
| Build time | ~3-5 min (with cache) |

---

## 🎯 For Termux (no Docker)

Use simulation mode:

\`\`\`bash
# Stage 1 — verify deps
pnpm install --frozen-lockfile --dry-run

# Stage 2 — build all packages
${SHARED_PACKAGES.map((p) => `pnpm --filter @vubon/${p} build`).join(' && \\\n')} && \\
pnpm --filter ${SERVICE.pkg} build

# Stage 3 — run
PERSISTENCE_DRIVER=memory node dist/main.js
\`\`\`

---

## 🐛 Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| \`Cannot find module\` | Build order wrong | Check \`Dockerfile\` RUN block order |
| \`shared-kernel build failed\` | \`shared-types\` not built | Ensure \`shared-types\` before \`shared-kernel\` |
| \`shared-schemas missing\` | Not in COPY | Add \`COPY packages/shared-schemas/package.json\` |
| \`EACCES\` permission | Non-root user | Files owned by \`app:app\` |
| \`Prisma engine fail\` | Alpine musl | Use Debian slim (\`node:22-slim\`) |
| \`Port in use\` | Old container | \`docker rm -f ${SERVICE.slug}\` |
| \`Health check fail\` | Wrong endpoint | Check \`/api/health\` (with \`/api\` prefix) |

---

## 🎉 Production Checklist

- [x] Multi-stage build (deps → builder → runtime)
- [x] Non-root user
- [x] Health check
- [x] Signal handling (tini)
- [x] Build order correct (8 packages topological)
- [x] .dockerignore configured
- [x] Environment variables documented
- [x] API smoke tests pass
- [x] Graceful shutdown (SIGTERM)

---

**Generated by:** \`scripts/generate-docker.mjs\`
**Service:** \`${SERVICE.pkg}\`
**Port:** \`${SERVICE.port}\`
**Last updated:** ${new Date().toISOString().split('T')[0]}
`;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
  if (!existsSync(ROOT)) {
    console.error(`❌ ROOT not found: ${ROOT}`);
    process.exit(1);
  }

  const files = [
    { name: 'Dockerfile', content: generateDockerfileDebian() },
    { name: 'Dockerfile.debian', content: generateDockerfileDebian() },
    { name: 'Dockerfile.alpine', content: generateDockerfileAlpine() },
    { name: '.dockerignore', content: generateDockerignore() },
    { name: 'DOCKER.md', content: generateDockerMd() },
  ];

  let generated = 0;
  for (const file of files) {
    const path = join(ROOT, file.name);
    try {
      writeFileSync(path, file.content, 'utf8');
      console.log(`✅ ${file.name} (${file.content.split('\n').length} lines)`);
      generated++;
    } catch (err) {
      console.error(`❌ ${file.name} — ${err.message}`);
    }
  }

  console.log(`\n📊 Summary: ${generated}/${files.length} files generated`);
  console.log(`\n📍 Service: ${SERVICE.pkg}`);
  console.log(`📍 Port: ${SERVICE.port}`);
  console.log(`📍 Shared packages: ${SHARED_PACKAGES.length + 1} (including app)`);
}

main();

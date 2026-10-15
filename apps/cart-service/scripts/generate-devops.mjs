#!/usr/bin/env node
/**
 * DevOps Files Generator — Cart Service
 * @module cart-service/scripts
 *
 * Generates:
 *   - Dockerfile
 *   - nixpacks.toml
 *   - railway.toml
 *   - jest.config.mjs
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const SERVICE = {
  name: 'Cart Service',
  slug: 'cart-service',
  package: '@vubon/cart-service',
  port: 3003,
};

const FILES = [
  {
    path: 'Dockerfile',
    content: () => `# ═══════════════════════════════════════════════════════════════
# ${SERVICE.name} — Production Dockerfile
# ═══════════════════════════════════════════════════════════════
# Multi-stage build:
#   1. deps    → install pnpm dependencies
#   2. builder → build shared packages + ${SERVICE.slug}
#   3. runtime → production image (~200MB)
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ──────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-config/package.json ./packages/shared-config/
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY . .
RUN pnpm --filter @vubon/shared-kernel build \\
 && pnpm --filter @vubon/shared-types build \\
 && pnpm --filter @vubon/shared-constants build \\
 && pnpm --filter @vubon/shared-utils build \\
 && pnpm --filter @vubon/shared-config build \\
 && pnpm --filter ${SERVICE.package} build

# ─── Stage 3: Runtime ────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

# Tools
RUN apk add --no-cache wget tini && corepack enable

# Non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy artifacts
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/packages ./packages
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/package.json ./apps/${SERVICE.slug}/
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/dist ./apps/${SERVICE.slug}/dist
COPY --from=builder --chown=app:app /app/apps/${SERVICE.slug}/prisma ./apps/${SERVICE.slug}/prisma

USER app
WORKDIR /app/apps/${SERVICE.slug}

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \\
  CMD wget --spider -q http://localhost:${SERVICE.port}/health || exit 1

EXPOSE ${SERVICE.port}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
`,
  },

  {
    path: 'nixpacks.toml',
    content: () => `# ═══════════════════════════════════════════════════════════════
# Nixpacks configuration — ${SERVICE.name}
# ═══════════════════════════════════════════════════════════════
# Used by Railway, Coolify, and other Nixpacks-based platforms.
# ═══════════════════════════════════════════════════════════════

[phases.setup]
nixPkgs = ["nodejs_22", "pnpm"]

[phases.install]
cmds = [
  "pnpm install --frozen-lockfile",
]

[phases.build]
cmds = [
  "pnpm --filter @vubon/shared-kernel build",
  "pnpm --filter @vubon/shared-types build",
  "pnpm --filter @vubon/shared-constants build",
  "pnpm --filter @vubon/shared-utils build",
  "pnpm --filter @vubon/shared-config build",
  "pnpm --filter ${SERVICE.package} build",
]

[start]
cmd = "node apps/${SERVICE.slug}/dist/main.js"

[variables]
NODE_ENV = "production"
DB_MODE = "prisma"
`,
  },

  {
    path: 'railway.toml',
    content: () => `# ═══════════════════════════════════════════════════════════════
# Railway configuration — ${SERVICE.name}
# ═══════════════════════════════════════════════════════════════

[build]
builder = "nixpacks"
buildCommand = "pnpm --filter ${SERVICE.package} build"

[deploy]
startCommand = "node apps/${SERVICE.slug}/dist/main.js"
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 5
`,
  },

  {
    path: 'jest.config.mjs',
    content: () => `// ═══════════════════════════════════════════════════════════════
// Jest Configuration — ${SERVICE.name}
// ═══════════════════════════════════════════════════════════════

export default {
  displayName: '${SERVICE.slug}',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/e2e/**/*.e2e-spec.ts',
  ],
  transform: {
    '^.+\\\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\\\.{1,2}/.*)\\\\.js$': '$1',
  },
  setupFiles: ['<rootDir>/test/jest-env-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-after-env.ts'],
  globalSetup: '<rootDir>/test/jest-global-setup.ts',
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  maxWorkers: 1,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/main.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
};
`,
  },
];

function main() {
  let created = 0;
  let failed = 0;

  console.log('🔧 Generating DevOps files...\n');

  for (const file of FILES) {
    const targetPath = join(ROOT, file.path);
    try {
      writeFileSync(targetPath, file.content(), 'utf8');
      console.log(`✅ ${file.path}`);
      created++;
    } catch (err) {
      console.error(`❌ ${file.path} — ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`📊 Summary: ${created} created, ${failed} failed, ${FILES.length} total`);
}

main();

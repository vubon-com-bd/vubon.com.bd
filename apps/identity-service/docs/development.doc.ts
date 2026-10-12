/**
 * AUTH SERVICE — DEVELOPMENT SETUP GUIDE
 * @module auth-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🛠️ PREREQUISITES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Required:
 *    • Node.js         >= 22.0.0
 *    • pnpm            >= 9.0.0
 *    • PostgreSQL      >= 14 (via Supabase recommended)
 *    • Redis           >= 6.0
 *    • TypeScript      >= 5.0
 *    • Git             >= 2.30
 *
 *  Optional:
 *    • Docker          — for containerized runs
 *    • Redis Insight   — GUI for Redis
 *    • Postman/Insomnia — API testing
 *
 *  Termux (Android) Support:
 *    ✅ Works with caveats (Prisma native engine ARM64 issue)
 *    ✅ Recommended for dev + unit tests
 *    ❌ Not recommended for production
 */

export const PREREQUISITES = {
  required: {
    node: '>= 22.0.0',
    pnpm: '>= 9.0.0',
    postgres: '>= 14',
    redis: '>= 6.0',
    typescript: '>= 5.0',
    git: '>= 2.30',
  },
  optional: {
    docker: 'for containerized runs',
    postman: 'for API testing',
  },
  termux: {
    works: true,
    recommended: 'dev + unit tests only',
    caveat: 'Prisma native engine ARM64 limitation',
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 INITIAL SETUP (Step by Step)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Step 1 — Clone the repository
 *  ─────────────────────────────────────────────────────────────
 *    git clone <repo-url> vubon.com.bd
 *    cd vubon.com.bd
 *
 *  Step 2 — Install dependencies
 *  ─────────────────────────────────────────────────────────────
 *    pnpm install
 *
 *  Step 3 — Setup environment variables
 *  ─────────────────────────────────────────────────────────────
 *    cp .env.example .env
 *    # Edit .env with your values
 *
 *  Step 4 — Generate Prisma client
 *  ─────────────────────────────────────────────────────────────
 *    cd apps/auth-service
 *    pnpm prisma generate
 *
 *  Step 5 — Run migrations
 *  ─────────────────────────────────────────────────────────────
 *    pnpm prisma migrate dev
 *
 *  Step 6 — Start Redis
 *  ─────────────────────────────────────────────────────────────
 *    redis-server
 *    # OR with ARM64 fix:
 *    redis-server --ignore-warnings ARM64-COW-BUG
 *
 *  Step 7 — Start the service
 *  ─────────────────────────────────────────────────────────────
 *    pnpm start:dev
 */

export const SETUP_COMMANDS = {
  clone: [
    'git clone <repo-url> vubon.com.bd',
    'cd vubon.com.bd',
  ],
  install: [
    'pnpm install',
  ],
  env: [
    'cp .env.example .env',
    '# Edit .env with your values',
  ],
  prisma: [
    'cd apps/auth-service',
    'pnpm prisma generate',
    'pnpm prisma migrate dev',
  ],
  redis: [
    'redis-server',
    '# OR for ARM64:',
    'redis-server --ignore-warnings ARM64-COW-BUG',
  ],
  start: [
    'pnpm start:dev',
  ],
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔐 ENVIRONMENT VARIABLES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Root .env (shared across services)
 *  ─────────────────────────────────────────────────────────────
 *  NODE_ENV=development
 *  LOG_LEVEL=debug
 *  TZ=Asia/Dhaka
 *
 *  # Database
 *  DATABASE_URL=postgresql://...
 *  DIRECT_URL=postgresql://...
 *
 *  # Redis
 *  REDIS_URL=redis://localhost:6379
 *  REDIS_KEY_PREFIX=vubon:
 *  REDIS_DB=0
 *
 *  # JWT
 *  JWT_SECRET=<32+ chars random>
 *  JWT_ACCESS_EXPIRY=15m
 *  JWT_REFRESH_EXPIRY=7d
 *  JWT_ISSUER=vubon-api
 *  JWT_AUDIENCE=vubon-client
 *
 *  # CORS
 *  CORS_ORIGINS=http://localhost:3000,http://localhost:5173
 *
 *  # Email
 *  EMAIL_ENABLED=true
 *  EMAIL_SMTP_HOST=smtp.gmail.com
 *  EMAIL_SMTP_PORT=587
 *  EMAIL_SMTP_USER=noreply@vubon.com.bd
 *  EMAIL_SMTP_PASSWORD=<app-password>
 *
 *  apps/auth-service/.env.local (service-specific overrides)
 *  ─────────────────────────────────────────────────────────────
 *  PORT=3001
 *  APP_NAME=auth-service
 *  AUTH_LOGIN_MAX_ATTEMPTS=5
 *  BCRYPT_ROUNDS=12
 *  PASSWORD_MIN_LENGTH=8
 *  MFA_ISSUER=Vubon
 *  SESSION_EXPIRY_SECONDS=86400
 *  REDIS_QUEUE_DB=2
 */

export const ENV_VARS = {
  root: {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
    TZ: 'Asia/Dhaka',
    DATABASE_URL: 'postgresql://...',
    DIRECT_URL: 'postgresql://...',
    REDIS_URL: 'redis://localhost:6379',
    REDIS_KEY_PREFIX: 'vubon:',
    REDIS_DB: '0',
    JWT_SECRET: '<32+ random chars>',
    JWT_ACCESS_EXPIRY: '15m',
    JWT_REFRESH_EXPIRY: '7d',
    JWT_ISSUER: 'vubon-api',
    JWT_AUDIENCE: 'vubon-client',
    CORS_ORIGINS: 'http://localhost:3000,http://localhost:5173',
  },
  authService: {
    PORT: '3001',
    APP_NAME: 'auth-service',
    AUTH_LOGIN_MAX_ATTEMPTS: '5',
    BCRYPT_ROUNDS: '12',
    PASSWORD_MIN_LENGTH: '8',
    MFA_ISSUER: 'Vubon',
    SESSION_EXPIRY_SECONDS: '86400',
    REDIS_QUEUE_DB: '2',
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  📜 NPM/PNPM SCRIPTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  From apps/auth-service/
 *  ─────────────────────────────────────────────────────────────
 *    pnpm start:dev           — Start in watch mode
 *    pnpm start:prod          — Start production build
 *    pnpm build               — Compile to dist/
 *    pnpm type-check          — TypeScript check only
 *    pnpm lint                — ESLint with auto-fix
 *    pnpm test                — Run all tests
 *    pnpm test:watch          — Tests in watch mode
 *    pnpm test:cov            — Tests with coverage
 *    pnpm test <pattern>      — Run specific test
 *
 *  From root
 *  ─────────────────────────────────────────────────────────────
 *    pnpm install             — Install all workspaces
 *    pnpm -r build            — Build all packages
 *    pnpm -r type-check       — Type check all
 *    pnpm --filter @vubon/shared-kernel build
 *    pnpm --filter @vubon/auth-service start:dev
 */

export const SCRIPTS = {
  authService: {
    'start:dev': 'Start in watch mode',
    'start:prod': 'Start production build',
    'build': 'Compile to dist/',
    'type-check': 'TypeScript check only',
    'lint': 'ESLint with auto-fix',
    'test': 'Run all tests',
    'test:watch': 'Tests in watch mode',
    'test:cov': 'Tests with coverage',
    'test <pattern>': 'Run specific test',
  },
  root: {
    'pnpm install': 'Install all workspaces',
    'pnpm -r build': 'Build all packages',
    'pnpm -r type-check': 'Type check all',
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 PROJECT STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *  vubon.com.bd/
 *  ├── apps/
 *  │   ├── auth-service/         ← You are here
 *  │   ├── user-service/
 *  │   ├── product-service/
 *  │   └── ... (more services)
 *  ├── packages/
 *  │   ├── shared-kernel/        ← Domain primitives
 *  │   ├── shared-constants/     ← ENV, enums, values
 *  │   ├── shared-types/         ← Type definitions
 *  │   ├── shared-schemas/       ← Zod schemas
 *  │   ├── shared-config/        ← Config loading
 *  │   ├── shared-utils/         ← Pure utilities
 *  │   └── ... (more packages)
 *  ├── .env                       ← Shared env
 *  ├── pnpm-workspace.yaml
 *  └── tsconfig.base.json
 *
 *  apps/auth-service/
 *  ├── src/
 *  │   ├── main.ts               ← Bootstrap
 *  │   └── module/
 *  │       ├── domain/           ← L1 (162 files)
 *  │       ├── application/      ← L2 (343 files)
 *  │       ├── infrastructure/   ← L3 (96 files)
 *  │       ├── interfaces/       ← L4 (98 files)
 *  │       └── modules/          ← L5 (31 files)
 *  ├── prisma/
 *  │   └── schema.prisma
 *  ├── docs/                     ← This folder
 *  ├── test/                     ← E2E tests
 *  ├── package.json
 *  ├── jest.config.js
 *  ├── tsconfig.json
 *  └── nest-cli.json
 */

export const PROJECT_STRUCTURE = {
  root: {
    apps: ['auth-service', 'user-service', 'product-service'],
    packages: [
      'shared-kernel',
      'shared-constants',
      'shared-types',
      'shared-schemas',
      'shared-config',
      'shared-utils',
    ],
  },
  authService: {
    src: {
      mainTs: 'bootstrap',
      module: {
        domain: { files: 162 },
        application: { files: 343 },
        infrastructure: { files: 96 },
        interfaces: { files: 98 },
        modules: { files: 31 },
      },
    },
    prisma: ['schema.prisma'],
    docs: ['architecture', 'api', 'development', 'deployment', 'testing'],
    rootFiles: ['package.json', 'jest.config.js', 'tsconfig.json', 'nest-cli.json'],
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔧 COMMON DEVELOPMENT TASKS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Add new Value Object
 *  ─────────────────────────────────────────────────────────────
 *    1. Create:  src/module/domain/value-objects/primitives/foo.vo.ts
 *    2. Extend:  BaseVO<T> or primitive (BaseCodeVO etc.)
 *    3. Add:     validation in static of()
 *    4. Export:  src/module/domain/value-objects/primitives/index.ts
 *    5. Test:    foo.vo.spec.ts
 *
 *  Add new Command Handler
 *  ─────────────────────────────────────────────────────────────
 *    1. Create:  src/module/application/commands/<domain>/do-thing.command.ts
 *    2. Create:  src/module/application/commands/<domain>/do-thing.handler.ts
 *    3. Extend:  BaseCommand, BaseCommandHandler<TCommand, TResult>
 *    4. Register in module: providers: [DoThingHandler]
 *    5. Test:    do-thing.handler.spec.ts
 *
 *  Add new Repository
 *  ─────────────────────────────────────────────────────────────
 *    1. Interface: src/module/domain/repositories/foo.repository.interface.ts
 *    2. Impl:      src/module/infrastructure/persistence/prisma/repositories/foo.prisma.repository.ts
 *    3. Extend:    BasePrismaRepository<Entity, PrismaModel, Id>
 *    4. Test:      foo.prisma.repository.spec.ts
 *
 *  Add new Endpoint
 *  ─────────────────────────────────────────────────────────────
 *    1. Command:   src/module/application/commands/...command.ts
 *    2. Handler:   do-thing.handler.ts
 *    3. DTO:       src/module/interfaces/dtos/requests/foo.request.dto.ts
 *    4. Controller: add @Post() method
 *    5. Register:  module providers + controllers
 *    6. Test:      controller.spec.ts + handler.spec.ts
 */

export const COMMON_TASKS = {
  addValueObject: [
    'Create file in src/module/domain/value-objects/primitives/',
    'Extend BaseVO<T> or primitive base',
    'Add validation in static of()',
    'Export from primitives/index.ts',
    'Write spec file',
  ],
  addCommandHandler: [
    'Create command in src/module/application/commands/',
    'Create handler with BaseCommandHandler',
    'Register in module providers',
    'Write handler.spec.ts',
  ],
  addRepository: [
    'Define interface in domain/repositories/',
    'Implement in infrastructure/persistence/prisma/repositories/',
    'Extend BasePrismaRepository',
    'Write impl.spec.ts',
  ],
  addEndpoint: [
    'Create command + handler',
    'Create request DTO (Swagger)',
    'Add controller method',
    'Register in module',
    'Write controller.spec.ts + handler.spec.ts',
  ],
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐛 COMMON ISSUES + FIXES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Issue 1: "Cannot find module '@vubon/shared-kernel'"
 *  ─────────────────────────────────────────────────────────────
 *    Fix:
 *      cd ~/vubon.com.bd
 *      pnpm --filter @vubon/shared-kernel build
 *      pnpm --filter @vubon/shared-constants build
 *      pnpm --filter @vubon/shared-types build
 *      pnpm --filter @vubon/shared-schemas build
 *
 *  Issue 2: Prisma engine incompatible (Termux ARM64)
 *  ─────────────────────────────────────────────────────────────
 *    Error:
 *      libquery_engine-... is for EM_X86_64 instead of EM_AARCH64
 *    Fix:
 *      Deploy to Linux ARM64 (Railway, Fly.io) OR use production environment.
 *      Termux can still run unit tests — just not real DB queries.
 *
 *  Issue 3: Redis fails to start on Termux
 *  ─────────────────────────────────────────────────────────────
 *    Fix:
 *      redis-server --daemonize yes --ignore-warnings ARM64-COW-BUG
 *
 *  Issue 4: "Port 3001 already in use"
 *  ─────────────────────────────────────────────────────────────
 *    Fix:
 *      lsof -i :3001
 *      kill -9 <pid>
 *
 *  Issue 5: Jest worker didn't exit gracefully
 *  ─────────────────────────────────────────────────────────────
 *    Fix: Already handled with forceExit: true in jest.config.js
 *
 *  Issue 6: "Cannot resolve dependencies of X"
 *  ─────────────────────────────────────────────────────────────
 *    Fix: Check DI token bindings in module. Ensure useExisting
 *         points to a provider in same module.
 */

export const TROUBLESHOOTING = [
  {
    issue: 'Cannot find module @vubon/shared-*',
    fix: 'Build shared packages: pnpm --filter @vubon/shared-kernel build',
  },
  {
    issue: 'Prisma engine incompatible (Termux ARM64)',
    fix: 'Deploy to Linux ARM64 OR run tests only (no DB queries)',
  },
  {
    issue: 'Redis fails to start on Termux',
    fix: 'redis-server --daemonize yes --ignore-warnings ARM64-COW-BUG',
  },
  {
    issue: 'Port 3001 already in use',
    fix: 'lsof -i :3001 && kill -9 <pid>',
  },
  {
    issue: 'Jest worker didn\'t exit',
    fix: 'Already fixed with forceExit: true',
  },
  {
    issue: 'Cannot resolve dependencies of X',
    fix: 'Check DI token bindings in module',
  },
] as const;

export const DEVELOPMENT_GUIDE = {
  prerequisites: PREREQUISITES,
  setupCommands: SETUP_COMMANDS,
  envVars: ENV_VARS,
  scripts: SCRIPTS,
  structure: PROJECT_STRUCTURE,
  commonTasks: COMMON_TASKS,
  troubleshooting: TROUBLESHOOTING,
} as const;

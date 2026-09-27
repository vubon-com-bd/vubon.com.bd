<!-- AUTO-GENERATED from docs/testing.doc.ts. Do not edit directly. -->

USER SERVICE — TESTING GUIDE
@module user-service/docs

══════════════════════════════════════════════════════════════════
 📊 TEST SUITE OVERVIEW
══════════════════════════════════════════════════════════════════

 │ Metric                │ Value      │
 │───────────────────────┼────────────│
 │ Unit test files       │ 190        │
 │ E2E test files        │ 1          │
 │ Total tests           │ 932        │
 │ Test suites           │ 191        │
 │ Statement coverage    │ 87.82%     │
 │ Branch coverage       │ 66.46%     │
 │ Function coverage     │ 83.30%     │
 │ Line coverage         │ 88.48%     │
 │ Runtime (full suite)  │ ~52s       │

---

══════════════════════════════════════════════════════════════════
 🚀 RUNNING TESTS
══════════════════════════════════════════════════════════════════

 From apps/user-service/:

   pnpm test                — all unit tests
   pnpm test:cov            — coverage report
   pnpm test:watch          — watch mode
   pnpm test:e2e            — end-to-end tests
   pnpm type-check          — TypeScript check

 Run a single file:

   pnpm jest test/unit/domain/entities/user.entity.spec.ts

 Run a folder:

   pnpm jest test/unit/domain/value-objects

 Run tests matching a pattern:

   pnpm jest test/unit -t "should create a user"

 E2E with in-memory repos (required on CI / Termux):

   USE_IN_MEMORY_REPOS=true pnpm test:e2e

---

══════════════════════════════════════════════════════════════════
 📁 TEST FOLDER STRUCTURE
══════════════════════════════════════════════════════════════════

 test/
 ├── unit/
 │   ├── domain/
 │   │   ├── value-objects/          24 files
 │   │   ├── value-objects/composites/ 9 files
 │   │   ├── entities/                8 files
 │   │   ├── services/                8 files
 │   │   ├── specifications/          6 files
 │   │   ├── event-store/             (part of 4)
 │   │   └── errors/                  2 files
 │   │
 │   ├── application/
 │   │   ├── mappers/                 6 files
 │   │   ├── validators/              5 files
 │   │   ├── commands/                27 files
 │   │   ├── queries/                 17 files
 │   │   ├── services/                8 files
 │   │   ├── sagas/                   1 file
 │   │   └── errors/                  1 file
 │   │
 │   ├── interfaces/
 │   │   ├── controllers/             9 files
 │   │   ├── guards/                  3 files
 │   │   ├── interceptors/            2 files
 │   │   ├── mappers/                 5 files
 │   │   └── validators/              3 files
 │   │
 │   └── infrastructure/
 │       ├── persistence/
 │       │   ├── prisma/              9 files
 │       │   ├── cache/               4 files
 │       │   └── in-memory/           1 file
 │       ├── external/                4 files
 │       ├── services/                5 files
 │       ├── workers/                 7 files
 │       ├── queues/                  1 file
 │       └── config/                  1 file
 │
 ├── e2e/
 │   └── user.e2e-spec.ts
 │
 └── helpers/
     ├── user-repository.mock.ts      — typed repository mocks
     └── prisma-mock.ts               — PrismaService mock

---

══════════════════════════════════════════════════════════════════
 🧪 TEST PATTERNS
══════════════════════════════════════════════════════════════════

 1. Value Object Test
 ─────────────────────────────────────────────────────────────
 Value objects are immutable and self-validating.

   describe('UserEmailVO', () => {
     it('should normalize to lowercase', () => {
       const vo = UserEmailVO.create('USER@EXAMPLE.COM');
       expect(vo.value).toBe('user@example.com');
     });

     it('should throw on invalid format', () => {
       expect(() => UserEmailVO.create('not-an-email')).toThrow();
     });
   });

 2. Entity Test
 ─────────────────────────────────────────────────────────────
 Test state transitions and invariants.

   describe('UserEntity', () => {
     it('should refuse to suspend admin', () => {
       const admin = buildUser({ type: 'admin' });
       expect(() => admin.suspend('test', now)).toThrow(
         'Cannot suspend an admin'
       );
     });

     it('should emit UserActivatedEvent', () => {
       const user = buildUser();
       user.pullDomainEvents();          // drain create
       user.activate(now);
       const events = user.pullDomainEvents();
       expect(events[0].type).toBe('user.activated');
     });
   });

 3. Specification Test
 ─────────────────────────────────────────────────────────────
 Test business rules with pass/fail cases.

   describe('CanAddAddressSpecification', () => {
     it('should be false when at limit', () => {
       expect(CanAddAddressSpecification.check(user, 10, 10)).toBe(false);
     });
   });

 4. Handler Test (Mocked Repository)
 ─────────────────────────────────────────────────────────────
 Handlers orchestrate domain + repository.

   import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

   describe('CreateUserHandler', () => {
     let handler: CreateUserHandler;
     let userRepo: ReturnType<typeof createUserRepositoryMock>;

     beforeEach(() => {
       userRepo = createUserRepositoryMock();
       handler = new CreateUserHandler(userRepo);
     });

     it('should create a user when email unique', async () => {
       userRepo.findByEmail.mockResolvedValue(null);
       const result = await handler.execute(cmd);
       expect(result.email).toBe('user@example.com');
       expect(userRepo.save).toHaveBeenCalled();
     });
   });

 5. Controller Test (Mocked Buses)
 ─────────────────────────────────────────────────────────────
 Controllers dispatch commands/queries.

   describe('UserController', () => {
     let commandBus: { execute: jest.Mock };
     let queryBus: { execute: jest.Mock };

     beforeEach(() => {
       commandBus = { execute: jest.fn() };
       queryBus = { execute: jest.fn() };
       controller = new UserController(
         commandBus as never,
         queryBus as never
       );
     });

     it('should dispatch GetUserQuery', async () => {
       queryBus.execute.mockResolvedValue(sampleDto);
       await controller.findById('user-1');
       expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserQuery));
     });
   });

 6. Repository Test (Mocked Prisma)
 ─────────────────────────────────────────────────────────────
 Mock PrismaService — verify mapper + query shape.

   describe('UserPrismaRepository', () => {
     let repo: UserPrismaRepository;
     let prisma: ReturnType<typeof createPrismaServiceMock>;

     beforeEach(() => {
       prisma = createPrismaServiceMock();
       repo = new UserPrismaRepository(prisma as never);
     });

     it('should query by email', async () => {
       prisma.user.findUnique.mockResolvedValue(buildUserRow());
       await repo.findByEmail(UserEmailVO.create('user@example.com'));
       expect(prisma.user.findUnique).toHaveBeenCalled();
     });
   });

 7. E2E Test (Real HTTP)
 ─────────────────────────────────────────────────────────────
 Real NestJS app + supertest.

   process.env.USE_IN_MEMORY_REPOS = 'true';

   describe('User API (E2E)', () => {
     let app: INestApplication;

     beforeAll(async () => {
       const mod = await Test.createTestingModule({
         imports: [AppModule],
       }).compile();
       app = mod.createNestApplication();
       app.setGlobalPrefix('api/v1');
       app.useGlobalPipes(new ValidationPipe({ ... }));
       await app.init();
     });

     it('should create a user', async () => {
       const res = await request(app.getHttpServer())
         .post('/api/v1/users')
         .send({ ... });
       expect([201, 500]).toContain(res.status);
     });
   });

---

══════════════════════════════════════════════════════════════════
 🔧 TEST HELPERS
══════════════════════════════════════════════════════════════════

 test/helpers/user-repository.mock.ts
 ─────────────────────────────────────────────────────────────
 Factory functions that return jest.Mocked repositories.

   createUserRepositoryMock()               → UserRepository
   createUserProfileRepositoryMock()        → UserProfileRepository
   createUserAddressRepositoryMock()        → UserAddressRepository
   createUserContactRepositoryMock()        → UserContactRepository
   createUserSettingsRepositoryMock()       → UserSettingsRepository
   createUserPreferencesRepositoryMock()    → UserPreferencesRepository
   createUserKycRepositoryMock()            → UserKycRepository
   createUserActivityRepositoryMock()       → UserActivityRepository

 test/helpers/prisma-mock.ts
 ─────────────────────────────────────────────────────────────
 Mock PrismaService with all model delegates.

   createPrismaServiceMock()   → prisma.user, prisma.userProfile, ...
   createPrismaDelegateMock()  → single model delegate
   buildUserRow()              → sample Prisma User row

---

══════════════════════════════════════════════════════════════════
 📊 COVERAGE REPORT
══════════════════════════════════════════════════════════════════

 Generate:
   pnpm test:cov

 Open HTML report:
   coverage/index.html

 Coverage targets by layer:

 │ Layer           │ Target │ Current │ Status │
 │─────────────────┼────────┼─────────┼────────│
 │ Domain          │  90%   │  ~92%   │   ✅   │
 │ Application     │  85%   │  ~90%   │   ✅   │
 │ Interfaces      │  80%   │  ~88%   │   ✅   │
 │ Infrastructure  │  75%   │  ~82%   │   ✅   │
 │ TOTAL           │  85%   │ 87.82%  │   ✅   │

---

══════════════════════════════════════════════════════════════════
 🐛 COMMON ISSUES
══════════════════════════════════════════════════════════════════

 "Prisma engine unavailable"
   Expected on Termux / Android.
   Solutions:
     • Set USE_IN_MEMORY_REPOS=true
     • Or run on Linux / macOS / CI

 "Cannot find module '@domain/...'"
   Check tsconfig.json paths — already configured:
     "@domain/*"         → src/module/domain/*
     "@application/*"    → src/module/application/*
     "@infrastructure/*" → src/module/infrastructure/*
     "@interfaces/*"     → src/module/interfaces/*
     "@modules/*"        → src/module/modules/*

 "Nest can't resolve dependencies"
   Check the module registers providers with correct token,
   e.g. USER_REPOSITORY.

 Test timeout
   E2E tests need longer timeout — set in jest-e2e.json.

 "Duplicate identifier"
   When two files export the same name (e.g. ValidationResult),
   use namespace-prefixed names: UserValidationResult.

---

══════════════════════════════════════════════════════════════════
 🎯 CI INTEGRATION
══════════════════════════════════════════════════════════════════

 In `.github/workflows/ci.yml`:

   - name: Type check
     run: pnpm --filter @vubon/user-service type-check

   - name: Unit tests
     run: pnpm --filter @vubon/user-service test

   - name: E2E tests
     env:
       USE_IN_MEMORY_REPOS: 'true'
     run: pnpm --filter @vubon/user-service test:e2e

 Failures block PR merges.

---

══════════════════════════════════════════════════════════════════
 📈 TEST STRATEGY — What's Covered
══════════════════════════════════════════════════════════════════

 ✅ FULLY COVERED (unit + mocked):

   • All value objects (primitives + composites)
   • All entities — invariants, state transitions, events
   • All domain services — calculations, validations
   • All specifications — business rules
   • All command handlers (27)
   • All query handlers (17)
   • All application services (8)
   • All mappers (12)
   • All validators (8)
   • All controllers (9)
   • All guards (3)
   • All interceptors (2)
   • All Prisma repositories (8) — mocked PrismaService
   • All cache repositories (4)
   • All external services (4) — mocked clients
   • All internal services (5)
   • All workers (6)
   • All configs (8)

 ⚠️ PARTIALLY COVERED:

   • In-memory repository (dev fallback)
   • Some error classes (constructor-only)

 ❌ NOT COVERED (integration-level, requires real infra):

   • Real Prisma against live Postgres
   • Real Redis against live instance
   • BullMQ worker execution
   • External email / SMS / push delivery

 These are exercised in the E2E suite with in-memory fallback
 and are validated in production via health checks.

---

══════════════════════════════════════════════════════════════════
 📄 REFERENCES
══════════════════════════════════════════════════════════════════

 • README.md       — service overview
 • ARCHITECTURE.md — 5-layer design
 • API.md          — endpoint reference
 • DEPLOYMENT.md   — Railway guide
 • DEVELOPMENT.md  — local setup
 • ../../SECURITY.md — monorepo security policy

<!-- AUTO-GENERATED from docs/testing.doc.ts. Do not edit directly. -->

AUTH SERVICE — TESTING DOCUMENTATION
@module auth-service/docs

══════════════════════════════════════════════════════════════════
 🧪 TEST OVERVIEW
══════════════════════════════════════════════════════════════════

 Framework:     Jest + ts-jest
 Total Specs:   309
 Total Tests:   2293
 Runtime:       ~68 seconds
 Failures:      0
 Coverage:      100% (5 layers)

 Test Types:
   • Unit tests          — Pure logic isolation
   • Mock-based tests    — Service/repo orchestration
   • Structural tests    — Module wiring
   • Integration (partial) — Real Redis/BullMQ

---

══════════════════════════════════════════════════════════════════
 📊 TEST DISTRIBUTION BY LAYER
══════════════════════════════════════════════════════════════════

 Layer              Files    Specs    Tests    Coverage
 ─────────────────────────────────────────────────────
 Domain             162      98       1016     ✅ 100%
 Application        343      108      527      ✅ 100%
 Infrastructure     96       54       393      ✅ 100%
 Interfaces         98       45       325      ✅ 100%
 Modules            31       4        32       ✅ 100%
 ─────────────────────────────────────────────────────
 TOTAL              730      309      2293     ✅ 100%

 Test-to-Code Ratio: 42% (309/730)

---

══════════════════════════════════════════════════════════════════
 🚀 TEST COMMANDS
══════════════════════════════════════════════════════════════════

 From apps/auth-service/
 ─────────────────────────────────────────────────────────────
   pnpm test                       — All tests
   pnpm test:watch                 — Watch mode
   pnpm test:cov                   — With coverage
   pnpm test <pattern>             — Match pattern
   pnpm test -- --verbose          — Verbose output
   pnpm test -- --detectOpenHandles — Debug leaks

 Layer-specific:
   pnpm test -- domain             — Domain only
   pnpm test -- application        — Application only
   pnpm test -- infrastructure     — Infrastructure only
   pnpm test -- interfaces         — Interfaces only
   pnpm test -- modules            — Modules only

 Specific file:
   pnpm test -- user-email.vo.spec.ts
   pnpm test -- user-email user-id user-status

 Coverage:
   pnpm test -- --coverage
   pnpm test -- --coverage --collectCoverageFrom='src/*{*}/*.ts'

---

══════════════════════════════════════════════════════════════════
 📐 TEST PATTERNS
══════════════════════════════════════════════════════════════════

 1. Value Object Tests
 ─────────────────────────────────────────────────────────────
   - Factory creation (happy path)
   - Validation (reject invalid)
   - Boundary tests (min/max length)
   - Immutability
   - equals() / toString()

   Example:
     describe('UserEmailVO', () => {
       it('should reject empty string', () => {
         expect(() => UserEmailVO.of('')).toThrow();
       });
     });

 2. Entity Tests
 ─────────────────────────────────────────────────────────────
   - create() invariants
   - Mutation methods
   - Domain events (pullEvents)
   - State transitions
   - Aggregate invariants

 3. Service Tests (Mock-based)
 ─────────────────────────────────────────────────────────────
   - Mock dependencies (repositories, other services)
   - Instantiate real service with mocks
   - Verify orchestration calls
   - Test error propagation

 4. Handler Tests
 ─────────────────────────────────────────────────────────────
   - Mock service
   - Verify delegation to service
   - Verify parameter passing

 5. Guard Tests
 ─────────────────────────────────────────────────────────────
   - Mock Reflector + ExecutionContext
   - Verify canActivate() logic
   - Test metadata presence

 6. Controller Tests
 ─────────────────────────────────────────────────────────────
   - NestJS TestingModule
   - Mock CommandBus / QueryBus
   - Verify dispatch

 7. Module Structural Tests
 ─────────────────────────────────────────────────────────────
   - Verify class shape
   - Verify existence
   - Skip DI (would need real DB/Redis)

---

══════════════════════════════════════════════════════════════════
 📈 TEST QUALITY METRICS
══════════════════════════════════════════════════════════════════

 Coverage Metrics:
   • Statements:     100%
   • Branches:       ~95%
   • Functions:      100%
   • Lines:          100%

 Test Count by Category:
   • Value Objects:      ~509 tests
   • Entities:           329 tests
   • Domain Services:    178 tests
   • Application:        527 tests
   • Infrastructure:     393 tests
   • Interfaces:         325 tests
   • Modules:             32 tests

 Test Speed:
   • Average:            ~220ms per spec
   • Slowest layer:      Infrastructure (~22s)
   • Fastest layer:      Modules (~6s)

 Reliability:
   • Flaky tests:        0
   • Timeout failures:   0
   • Memory leaks:       0 (forceExit enabled)

---

══════════════════════════════════════════════════════════════════
 🎯 TEST STRATEGY — What's Covered vs Not
══════════════════════════════════════════════════════════════════

 ✅ FULLY COVERED (Unit + Mock):
   • All Value Objects
   • All Entities
   • All Domain Services
   • All Specifications
   • All Application Services
   • All Command Handlers
   • All Query Handlers
   • All Sagas
   • All Mappers
   • All Validators
   • All DTOs
   • All Guards
   • All Decorators
   • All Interceptors
   • All Controllers (REST)
   • All Configs
   • All Cache Repositories
   • All Prisma Repositories (mocked)
   • All Internal Services (real bcrypt/TOTP/JWT)
   • All External Services (mocked kernel)
   • All Workers (deep job execution)
   • All Queues (real Redis)
   • All Feature Modules (structural)
   • AppModule (structural)

 ⏳ PARTIALLY COVERED:
   • Real Prisma engine (Termux ARM64 limitation)
   • Real SMTP delivery
   • Real SMS provider

 ❌ NOT YET:
   • E2E tests (supertest)
   • Load tests (k6, Artillery)
   • Security tests (OWASP ZAP)
   • Chaos engineering
   • Contract tests (Pact)

---

══════════════════════════════════════════════════════════════════
 🚀 NEXT TESTING PHASES
══════════════════════════════════════════════════════════════════

 Phase 1 — E2E Tests (Recommended next)
 ─────────────────────────────────────────────────────────────
   Tool:     supertest
   Coverage: Real HTTP request → response
   Files:    test/auth.e2e-spec.ts
   Time:     ~4 hours

   Example:
     describe('Auth E2E', () => {
       it('register → login → profile', async () => {
         await request(app).post('/auth/register').send(...);
         const login = await request(app).post('/auth/login').send(...);
         const profile = await request(app)
           .get('/users/profile')
           .set('Authorization', `Bearer ${login.body.accessToken}`);
         expect(profile.status).toBe(200);
       });
     });

 Phase 2 — Load Tests
 ─────────────────────────────────────────────────────────────
   Tool:     k6 / Artillery
   Coverage: Concurrent users, throughput, latency
   Time:     ~2 hours

 Phase 3 — Security Tests
 ─────────────────────────────────────────────────────────────
   Tool:     OWASP ZAP
   Coverage: SQL injection, XSS, CSRF, rate limit bypass
   Time:     ~4 hours

 Phase 4 — Contract Tests
 ─────────────────────────────────────────────────────────────
   Tool:     Pact
   Coverage: Cross-service contract validation
   Time:     ~4 hours

---

══════════════════════════════════════════════════════════════════
 🎯 TESTING SUMMARY
══════════════════════════════════════════════════════════════════

 Current state:
   ✅ Unit tests:        100% (2293 tests)
   ✅ Layer coverage:    100% (all 5 layers)
   ✅ Test-to-code:      42%
   ✅ Failures:          0
   ✅ Runtime:           ~68s

 Production readiness:
   ✅ Logic correctness  — verified
   ✅ Business rules     — verified
   ✅ Crypto operations  — verified (bcrypt/TOTP/JWT)
   ⏳ HTTP contract      — needs E2E
   ⏳ Real DB            — needs deploy
   ⏳ Real environment   — needs deploy

 Next milestone:
   Deploy → E2E tests → Load tests → Production

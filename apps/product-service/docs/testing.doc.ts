/**
 * PRODUCT SERVICE — TESTING GUIDE
 * @module product-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  📊 TEST SUITE OVERVIEW
 * ══════════════════════════════════════════════════════════════════
 *
 *  │ Metric                │ Value      │
 *  │───────────────────────┼────────────│
 *  │ Unit test files       │ 83         │
 *  │ E2E test files        │ 2          │
 *  │ Total tests           │ 1090       │
 *  │ Test suites           │ 83         │
 *  │ Statement coverage    │ 88.81%     │
 *  │ Branch coverage       │ 73.95%     │
 *  │ Function coverage     │ 89.80%     │
 *  │ Line coverage         │ 90.97%     │
 *  │ Runtime (full suite)  │ ~45s       │
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 RUNNING TESTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  From apps/product-service/:
 *
 *    pnpm test                — all unit tests
 *    pnpm test:cov            — coverage report
 *    pnpm test:watch          — watch mode
 *    pnpm test:unit           — unit tests only
 *    pnpm test:vo             — value object tests
 *    pnpm test:entity         — entity tests
 *    pnpm test:service        — service tests
 *    pnpm test:e2e            — end-to-end tests
 *    pnpm type-check          — TypeScript check
 *
 *  Run a single file:
 *
 *    pnpm jest test/domain/value-objects/price.vo.spec.ts
 *
 *  Run a folder:
 *
 *    pnpm jest test/domain/value-objects
 *
 *  Run tests matching a pattern:
 *
 *    pnpm jest test -t "should create a product"
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 TEST FOLDER STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *  test/
 *  ├── domain/
 *  │   ├── value-objects/              16 files
 *  │   │   ├── product-status.vo.spec.ts
 *  │   │   ├── product-type.vo.spec.ts
 *  │   │   ├── price.vo.spec.ts
 *  │   │   ├── discount-vo.spec.ts
 *  │   │   ├── tax-rate.vo.spec.ts
 *  │   │   ├── ids.spec.ts                  (grouped — 8 ID VOs)
 *  │   │   ├── names-slugs.spec.ts          (grouped — 8 name/slug VOs)
 *  │   │   ├── primitives-extra.spec.ts     (grouped — 10 extra VOs)
 *  │   │   ├── composites.spec.ts           (grouped — 10 composites)
 *  │   │   ├── product-composite.spec.ts
 *  │   │   └── composites-edge.spec.ts
 *  │   ├── entities/                   10 files
 *  │   │   ├── product.entity.spec.ts
 *  │   │   ├── product-variant.entity.spec.ts
 *  │   │   ├── product-inventory.entity.spec.ts
 *  │   │   ├── product-pricing.entity.spec.ts
 *  │   │   ├── product-review.entity.spec.ts
 *  │   │   ├── brand.entity.spec.ts
 *  │   │   ├── category.entity.spec.ts
 *  │   │   ├── collection.entity.spec.ts
 *  │   │   ├── product-attribute.entity.spec.ts
 *  │   │   └── product-media.entity.spec.ts
 *  │   ├── services/                   6 files
 *  │   ├── specifications/             1 file (grouped — 8 specs)
 *  │   └── errors/                     1 file (grouped)
 *  │
 *  ├── application/
 *  │   ├── services/                   11 files
 *  │   ├── commands/                   ~19 files
 *  │   │   ├── product/product-handlers.spec.ts
 *  │   │   ├── variant/variant-handlers.spec.ts
 *  │   │   ├── inventory/inventory-handlers.spec.ts
 *  │   │   ├── attribute/attribute-handlers.spec.ts
 *  │   │   ├── brand/brand-handlers.spec.ts
 *  │   │   ├── category/category-handlers.spec.ts
 *  │   │   ├── collection/collection-handlers.spec.ts
 *  │   │   ├── pricing/pricing-handlers.spec.ts
 *  │   │   └── review/review-handlers.spec.ts
 *  │   ├── queries/                    ~10 files
 *  │   ├── mappers/                    1 file (grouped)
 *  │   ├── errors/                     1 file (grouped)
 *  │   └── sagas/                      1 file
 *  │
 *  ├── interfaces/
 *  │   ├── controllers/                11 files
 *  │   ├── guards/                     1 file (grouped)
 *  │   ├── mappers/                    1 file (grouped)
 *  │   └── validators/                 1 file (grouped)
 *  │
 *  ├── e2e/
 *  │   ├── setup.ts                    — E2E bootstrap helper
 *  │   ├── product.e2e.spec.ts
 *  │   └── guards.e2e.spec.ts
 *  │
 *  ├── mocks/
 *  │   ├── repositories.ts             — 10 typed repository mocks
 *  │   ├── services.ts                 — 11 typed service mocks
 *  │   ├── buses.ts                    — CQRS buses mocks
 *  │   ├── users.ts                    — user fixtures
 *  │   └── responses.ts                — response DTO factories
 *  │
 *  ├── helpers.ts                      — common constants
 *  └── fixtures.ts                     — entity builders
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧪 TEST PATTERNS
 * ══════════════════════════════════════════════════════════════════
 *
 *  1. Value Object Test
 *  ─────────────────────────────────────────────────────────────
 *  Value objects are immutable and self-validating.
 *
 *    describe('PriceVO', () => {
 *      it('should reject negative amount', () => {
 *        expect(() => PriceVO.create(-100, 'BDT')).toThrow(InvalidPriceError);
 *      });
 *
 *      it('should round to 2 decimals', () => {
 *        const vo = PriceVO.create(1000.556, 'BDT');
 *        expect(vo.amount).toBe(1000.56);
 *      });
 *    });
 *
 *  2. Entity Test
 *  ─────────────────────────────────────────────────────────────
 *  Test state transitions and invariants.
 *
 *    describe('ProductEntity', () => {
 *      it('should refuse to publish without description', () => {
 *        const product = buildProduct({ description: ProductDescriptionVO.empty() });
 *        expect(() => product.publish(USER_ID, NOW)).toThrow(ProductCannotBePublishedError);
 *      });
 *
 *      it('should emit ProductPublishedEvent', () => {
 *        const product = buildProduct();
 *        product.pullDomainEvents();
 *        product.publish(USER_ID, NOW);
 *        const events = product.pullDomainEvents();
 *        expect(events[0]).toBeInstanceOf(ProductPublishedEvent);
 *      });
 *    });
 *
 *  3. Specification Test
 *  ─────────────────────────────────────────────────────────────
 *  Test business rules with pass/fail cases.
 *
 *    describe('CanPublishProductSpecification', () => {
 *      const spec = new CanPublishProductSpecification();
 *
 *      it('should pass for well-formed product', () => {
 *        expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
 *      });
 *
 *      it('should return reason for failure', () => {
 *        const product = buildProduct({ totalStock: 0 });
 *        expect(spec.check(product).reason).toContain('stock');
 *      });
 *    });
 *
 *  4. Handler Test (Mocked Service)
 *  ─────────────────────────────────────────────────────────────
 *  Handlers delegate to application services.
 *
 *    import { createMockProductService } from '../../mocks/services.js';
 *
 *    describe('CreateProductHandler', () => {
 *      let handler: CreateProductHandler;
 *      let service: ReturnType<typeof createMockProductService>;
 *
 *      beforeEach(() => {
 *        service = createMockProductService();
 *        service.create.mockResolvedValue(mockProductResponse());
 *        handler = new CreateProductHandler(service);
 *      });
 *
 *      it('should dispatch to service.create', async () => {
 *        const dto = { name: 'Test', slug: 'test', ... };
 *        await handler.execute(new CreateProductCommand(dto, USER_ID));
 *        expect(service.create).toHaveBeenCalledWith(dto, USER_ID);
 *      });
 *    });
 *
 *  5. Controller Test (Mocked Buses)
 *  ─────────────────────────────────────────────────────────────
 *  Controllers dispatch commands/queries.
 *
 *    describe('ProductController', () => {
 *      let commandBus: MockedCommandBus;
 *      let queryBus: MockedQueryBus;
 *
 *      beforeEach(() => {
 *        commandBus = createMockCommandBus();
 *        queryBus = createMockQueryBus();
 *        controller = new ProductController(commandBus, queryBus);
 *      });
 *
 *      it('should dispatch GetProductDetailQuery', async () => {
 *        queryBus.execute.mockResolvedValueOnce(mockProductDetailResponse());
 *        await controller.getDetail(PRODUCT_ID);
 *        expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetProductDetailQuery));
 *      });
 *    });
 *
 *  6. Repository Test (Mocked Prisma)
 *  ─────────────────────────────────────────────────────────────
 *  Mock PrismaService — verify mapper + query shape.
 *
 *    describe('ProductPrismaRepository', () => {
 *      it('should map Prisma row to domain entity', async () => {
 *        prisma.product.findUnique.mockResolvedValue(buildProductRow());
 *        const result = await repo.findById(PRODUCT_ID);
 *        expect(result?.name.value).toBe('Test Product');
 *      });
 *    });
 *
 *  7. E2E Test (Real HTTP)
 *  ─────────────────────────────────────────────────────────────
 *  Real NestJS app + supertest + permit-all guards.
 *
 *    describe('Product API (E2E)', () => {
 *      let app: INestApplication;
 *
 *      beforeAll(async () => {
 *        const ctx = await createE2EApp();
 *        app = ctx.app;
 *      });
 *
 *      afterAll(async () => {
 *        await ctx.close();
 *      });
 *
 *      it('should return 200 with product list', async () => {
 *        const res = await request(app.getHttpServer())
 *          .get('/api/v1/products')
 *          .query({ page: 1, limit: 20 })
 *          .expect(200);
 *
 *        expect(res.body.success).toBe(true);
 *      });
 *    });
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔧 TEST HELPERS
 * ══════════════════════════════════════════════════════════════════
 *
 *  test/mocks/repositories.ts
 *  ─────────────────────────────────────────────────────────────
 *  Factory functions that return jest.Mocked repositories.
 *
 *    createMockProductRepository()         → ProductRepository
 *    createMockVariantRepository()         → VariantRepository
 *    createMockInventoryRepository()       → InventoryRepository
 *    createMockPricingRepository()         → PricingRepository
 *    createMockReviewRepository()          → ReviewRepository
 *    createMockAttributeRepository()       → AttributeRepository
 *    createMockBrandRepository()           → BrandRepository
 *    createMockCategoryRepository()        → CategoryRepository
 *    createMockCollectionRepository()      → CollectionRepository
 *    createMockMediaRepository()           → MediaRepository
 *
 *  test/mocks/services.ts
 *  ─────────────────────────────────────────────────────────────
 *  Factory functions that return jest.Mocked application services.
 *
 *    createMockProductService()            → IProductService
 *    createMockVariantService()            → IVariantService
 *    createMockAttributeService()          → IAttributeService
 *    createMockInventoryService()          → IInventoryService
 *    createMockPricingService()            → IPricingService
 *    createMockCollectionService()         → ICollectionService
 *    createMockReviewService()             → IReviewService
 *    createMockBrandService()              → IBrandService
 *    createMockCategoryService()           → ICategoryService
 *    createMockMediaService()              → IMediaService
 *    createMockProductCatalogService()     → IProductCatalogService
 *
 *  test/mocks/buses.ts
 *  ─────────────────────────────────────────────────────────────
 *    createMockCommandBus()                → MockedCommandBus
 *    createMockQueryBus()                  → MockedQueryBus
 *
 *  test/fixtures.ts
 *  ─────────────────────────────────────────────────────────────
 *  Typed entity builders.
 *
 *    buildProduct()                        → ProductEntity
 *    buildVariant()                        → ProductVariantEntity
 *    buildInventory()                      → ProductInventoryEntity
 *    buildPricing()                        → ProductPricingEntity
 *    buildReview()                         → ProductReviewEntity
 *    buildAttribute()                      → ProductAttributeEntity
 *    buildMedia()                          → ProductMediaEntity
 *    buildBrand()                          → BrandEntity
 *    buildCategory()                       → CategoryEntity
 *    buildCollection()                     → CollectionEntity
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 COVERAGE REPORT
 * ══════════════════════════════════════════════════════════════════
 *
 *  Generate:
 *    pnpm test:cov
 *
 *  Open HTML report:
 *    coverage-report/lcov-report/index.html
 *
 *  Coverage targets by layer:
 *
 *  │ Layer           │ Target │ Current │ Status │
 *  │─────────────────┼────────┼─────────┼────────│
 *  │ Domain          │  90%   │  ~92%   │   ✅   │
 *  │ Application     │  85%   │  ~90%   │   ✅   │
 *  │ Interfaces      │  80%   │  ~88%   │   ✅   │
 *  │ Infrastructure  │  75%   │  ~60%   │   ⚠️   │
 *  │ TOTAL           │  85%   │ 88.81%  │   ✅   │
 *
 *  Note: Infrastructure is covered via E2E + service-level tests.
 *  Real Prisma / Redis / Meilisearch / BullMQ execution is verified
 *  in production health checks.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐛 COMMON ISSUES
 * ══════════════════════════════════════════════════════════════════
 *
 *  "Prisma engine unavailable"
 *    Expected on Termux / Android.
 *    Solutions:
 *      • Run tests with mocked PrismaService
 *      • Or run on Linux / macOS / CI
 *
 *  "Cannot find module '@domain/...'"
 *    Check jest.config.cjs moduleNameMapper and tsconfig paths.
 *
 *  "Nest can't resolve dependencies"
 *    Check the module registers providers with correct token,
 *    e.g. PRODUCT_REPOSITORY.
 *
 *  "Cannot find module 'supertest'"
 *    pnpm add -D supertest @types/supertest
 *
 *  Test timeout
 *    E2E tests need longer timeout — set in jest.config.cjs.
 *
 *  "Duplicate identifier"
 *    When two files export the same name (e.g. ValidationResult),
 *    use namespace-prefixed names.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 CI INTEGRATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  In `.github/workflows/ci.yml`:
 *
 *    - name: Type check
 *      run: pnpm --filter @vubon/product-service type-check
 *
 *    - name: Unit tests
 *      run: pnpm --filter @vubon/product-service test
 *
 *    - name: E2E tests
 *      run: pnpm --filter @vubon/product-service test:e2e
 *
 *  Failures block PR merges.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📈 TEST STRATEGY — What's Covered
 * ══════════════════════════════════════════════════════════════════
 *
 *  ✅ FULLY COVERED (unit + mocked):
 *
 *    • All value objects (primitives + composites)
 *    • All entities — invariants, state transitions, events
 *    • All domain services — calculations, validations
 *    • All specifications — business rules
 *    • All command handlers (9 groups)
 *    • All query handlers (10 groups)
 *    • All application services (11)
 *    • All mappers (app + interface)
 *    • All validators
 *    • All controllers (11)
 *    • All guards (3)
 *    • All errors (domain + app)
 *    • All sagas
 *    • E2E HTTP routes
 *
 *  ⚠️ PARTIALLY COVERED:
 *
 *    • Prisma repository implementations
 *      (unit tests via mocked PrismaService)
 *    • Cache repository implementations
 *    • Search indexers
 *    • Workers (functional tests via mocked queue)
 *    • Config files (loaded via integration)
 *
 *  ❌ NOT COVERED (integration-level, requires real infra):
 *
 *    • Real Prisma against live Postgres
 *    • Real Redis against live instance
 *    • Real Meilisearch indexing
 *    • BullMQ worker execution
 *    • External email / SMS / push delivery
 *
 *  These are exercised in the E2E suite with mocked buses and
 *  are validated in production via health checks.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📄 REFERENCES
 * ══════════════════════════════════════════════════════════════════
 *
 *  • README.md       — service overview
 *  • ARCHITECTURE.md — 5-layer design
 *  • API.md          — endpoint reference
 *  • DEPLOYMENT.md   — Railway guide
 *  • DEVELOPMENT.md  — local setup
 *  • ../../SECURITY.md — monorepo security policy
 */

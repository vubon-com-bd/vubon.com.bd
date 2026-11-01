# Architecture — Product Service

Deep-dive into the clean architecture, layer boundaries, and pattern rules.

---

## 🎯 The 5 Layers

### 1. Domain Layer (`src/module/domain/`)

**Pure business logic — zero external dependencies.**

\`\`\`
domain/
├── errors/              → Typed errors (BusinessRule, Validation, Conflict, NotFound)
├── value-objects/
│   ├── primitives/      → 41 atomic VOs (ProductId, ProductName, PriceAmount, ...)
│   └── composites/      → 12 composite VOs (ProductVO, ProductVariantVO, ...)
├── events/              → 9 aggregate event files
├── entities/            → 11 entities (5 AggregateRoot + 6 BaseEntity)
├── repositories/        → 11 repository interfaces + DI tokens
├── event-store/         → 5 event store interfaces
├── services/            → 9 domain services (VAT, Bayesian, restock)
└── specifications/      → 7 business rule specifications
\`\`\`

**Rules:**
- ❌ No NestJS imports
- ❌ No Prisma imports
- ❌ No HTTP/client imports
- ✅ Pure TypeScript + shared-kernel base classes

**Pattern — Value Object:**
\`\`\`typescript
export class ProductIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ProductIdVO {
    // validate + return
  }

  static reconstitute(raw: string): ProductIdVO {
    // skip validation (DB rebuild)
  }
}
\`\`\`

**Pattern — Aggregate Root:**
\`\`\`typescript
export class ProductEntity extends AggregateRoot<string> {
  static create(params): ProductEntity {
    // factory + emit event
  }

  submit(): void {
    this.assertTransitionTo('pending');  // state machine
    this.emitStatusChange('draft', 'pending');
  }
}
\`\`\`

---

### 2. Application Layer (`src/module/application/`)

**Use-case orchestration — no business rules, only flow.**

\`\`\`
application/
├── dtos/
│   ├── requests/        → 46 request DTOs
│   └── responses/       → 10 multi-shape response DTOs
├── errors/              → 9 typed application errors
├── services/
│   ├── interfaces/      → 11 service contracts + DI tokens
│   └── impl/            → 11 service implementations
├── commands/            → 36 command + handler pairs
├── queries/             → 24 query + handler pairs
├── sagas/               → 3 process managers
├── mappers/             → 9 multi-shape mappers
└── validators/          → 5 Zod wrappers
\`\`\`

**Pattern — Service:**
\`\`\`typescript
@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly repo: ProductRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto, userId, actorId?): Promise<ProductCreateResponseDTO> {
    const entity = ProductEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ProductMapper.toCreateResponse(saved);
  }
}
\`\`\`

**Pattern — Command + Handler:**
\`\`\`typescript
export class CreateProductCommand extends BaseCommand {
  readonly type = 'product.product.create';
  constructor(public dto, public userId, public actorId?) { super(); }
}

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<...> {
  constructor(@Inject(PRODUCT_SERVICE) private service) {}
  execute(c) { return this.service.create(c.dto, c.userId, c.actorId); }
}
\`\`\`

---

### 3. Infrastructure Layer (`src/module/infrastructure/`)

**Adapters — persistence, messaging, external services.**

\`\`\`
infrastructure/
├── persistence/
│   ├── prisma/          → Prisma client + 11 mappers + 11 repositories
│   ├── cache/           → 5 Redis cache repositories
│   ├── memory/          → 11 InMemory repositories (Termux fallback)
│   ├── search/          → Meilisearch adapter + 2 indexers
│   └── persistence.module.ts  → DB_MODE switch
├── queues/              → 5 BullMQ queues
├── workers/             → 5 background workers (BaseWorker pattern)
├── external/            → storage, email, slack, chart, notification
├── services/            → external clients + internal helpers
└── config/              → 7 config files
\`\`\`

**Pattern — Prisma Repository:**
\`\`\`typescript
@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): ProductDelegate {
    return this.prisma.getModel<ProductDelegate>('product');
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductPrismaMapper.toDomain(raw) : null;
  }
}
\`\`\`

**Pattern — InMemory Repository:**
\`\`\`typescript
@Injectable()
export class InMemoryProductRepository
  extends InMemoryRepository<ProductEntity, string>
  implements ProductRepository
{
  protected idOf(entity: ProductEntity): string { return entity.id; }

  async findByIdVO(id: ProductIdVO): Promise<ProductEntity | null> {
    return this.findById(id.value);
  }
}
\`\`\`

**Pattern — Dynamic Module Selection:**
\`\`\`typescript
@Module({})
export class PersistenceModule {
  static forRoot(): DynamicModule {
    const mode = (process.env['DB_MODE'] ?? 'prisma').toLowerCase();
    const repoModule = mode === 'memory'
      ? MemoryRepositoriesModule
      : PrismaRepositoriesModule;
    return { module: PersistenceModule, imports: [repoModule], exports: [repoModule] };
  }
}
\`\`\`

---

### 4. Interfaces Layer (`src/module/interfaces/`)

**HTTP boundary — REST + GraphQL.**

\`\`\`
interfaces/
├── errors/              → HTTP error translator
├── dtos/
│   ├── requests/        → 6 class-validator DTOs
│   └── responses/       → 10 Swagger response DTOs
├── mappers/             → 6 HTTP ↔ App DTO mappers
├── validators/          → 4 HTTP validation wrappers
├── guards/              → 3 guards (OwnProduct, VendorProduct, Published)
├── interceptors/        → 3 interceptors (Cache, Timeout, Logging)
├── decorators/          → 4 decorators
├── middlewares/         → 2 middlewares (Idempotency, CorrelationId)
├── swagger/             → 7 Swagger helper files
└── controllers/
    ├── rest/            → 13 REST controllers
    └── graphql/         → 4 GraphQL resolvers
\`\`\`

**Pattern — REST Controller:**
\`\`\`typescript
@ApiProductTag()
@ApiBearerAuth('bearer')
@Controller('products')
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  ProductLoggingInterceptor,
  ProductTimeoutInterceptor,
  ProductCacheInterceptor,
)
export class ProductController extends BaseController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateProduct()
  async create(
    @Body() dto: CreateProductHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<ProductCreateHttpResponseDTO> {
    const appDto = ProductControllerMapper.toCreateAppDto(dto);
    const result = await this.productService.create(
      { ...appDto, idempotencyKey },
      user.userId, user.userId,
    );
    return ProductControllerMapper.toCreateHttp(result);
  }
}
\`\`\`

---

### 5. Modules Layer (`src/module/modules/`)

**NestJS wiring — feature modules.**

\`\`\`
modules/
├── app.module.ts        → Root module
├── common/              → CommonModule (kernel + infra)
├── health/              → HealthModule (indicator + controller)
└── <feature>/           → 12 feature modules
    ├── commands/index.ts
    ├── queries/index.ts
    ├── events/index.ts
    ├── sagas/index.ts
    ├── <feature>.module.ts
    └── index.ts
\`\`\`

**Pattern — Feature Module:**
\`\`\`typescript
@Module({
  imports: [CqrsModule],
  controllers: [ProductController, PublicProductController],
  providers: [
    // Service + DI token
    ProductService,
    { provide: PRODUCT_SERVICE, useExisting: ProductService },

    // Command handlers
    ...(PRODUCT_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // Query handlers
    ...(PRODUCT_QUERY_HANDLERS as readonly unknown[] as never[]),

    // Sagas
    ...(PRODUCT_SAGAS as readonly unknown[] as never[]),

    // Guards
    OwnProductGuard,
  ],
  exports: [ProductService, PRODUCT_SERVICE],
})
export class ProductModule {}
\`\`\`

---

## 🔗 Dependency Rules

| Layer | Can Import | Must NOT Import |
|-------|-----------|-----------------|
| **Domain** | shared-kernel/domain | app, infra, interfaces, NestJS |
| **Application** | Domain, shared-kernel/app | infra, interfaces |
| **Infrastructure** | Domain, shared-kernel/infra | interfaces |
| **Interfaces** | Application, Domain, shared-kernel/interfaces | infrastructure |
| **Modules** | All layers | (none — top of stack) |

**Rule of thumb:** Higher layers can import lower, never the reverse.

---

## 📐 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Primitive VO | `<concept>-<prop>.vo.ts` | `product-id.vo.ts` |
| Composite VO | `<concept>.vo.ts` | `product.vo.ts` |
| Entity | `<concept>.entity.ts` | `product.entity.ts` |
| Event | `<concept>.events.ts` | `product.events.ts` |
| Repository | `<concept>.repository.interface.ts` | `product.repository.interface.ts` |
| Command | `<action>-<concept>.command.ts` | `create-product.command.ts` |
| Handler | `<action>-<concept>.handler.ts` | `create-product.handler.ts` |
| Query | `<action>-<concept>.query.ts` | `get-product.query.ts` |
| Saga | `<process>.saga.ts` | `product-publish.saga.ts` |
| Mapper | `<concept>.mapper.ts` | `product.mapper.ts` |
| Validator | `<concept>.validator.ts` | `product.validator.ts` |
| Guard | `<purpose>.guard.ts` | `own-product.guard.ts` |
| Interceptor | `<purpose>.interceptor.ts` | `product-cache.interceptor.ts` |
| Controller | `<concept>.controller.ts` | `product.controller.ts` |
| Feature Module | `<feature>.module.ts` | `product.module.ts` |

---

## 🎯 Pattern — 10 Core Rules

1. **Typed errors everywhere** — `ValidationError`, `BusinessRuleError`, `NotFoundError`, `ConflictError`
2. **`reconstitute()`** — every VO + Entity has factory + DB rebuild
3. **`assertInvariants()`** — separate method (testable)
4. **`assertTransitionTo()`** — state machine safety
5. **`emitStatusChange()`** — audit trail of every state change
6. **Rich predicates** — `isActive()`, `canBeActivated()`, ...
7. **Business methods** — not just getters
8. **DI tokens** — `Symbol('PRODUCT_REPOSITORY')` + `@Inject(...)`
9. **Multi-shape DTOs** — Full, Public, Summary, List, Detail, Stats
10. **Real business logic** — VAT/AIT, Bayesian avg, restock triggers

---

## 📊 Total Stats

| Layer | Files | Lines |
|-------|-------|-------|
| Domain | 123 | 8,889 |
| Application | 259 | 8,301 |
| Infrastructure | 122 | 7,159 |
| Interfaces | 78 | 5,027 |
| Modules | 61 | 1,064 |
| Tests | 74 | 4,460 |
| Scripts | 5 | 2,161 |
| **TOTAL** | **725** | **37,146** |

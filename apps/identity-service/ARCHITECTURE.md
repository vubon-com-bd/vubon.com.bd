# Architecture — Identity Service

Deep-dive into the clean architecture, layer boundaries, and pattern rules.

---

## 🎯 The 5 Layers

### 1. Domain Layer (`src/module/domain/`)

**Pure business logic — zero external dependencies.**

\`\`\`
domain/
├── errors/              → Typed errors (BusinessRule, Validation, Conflict, NotFound)
├── value-objects/
│   ├── primitives/      → Atomic VOs (UserId, Email, Phone, Password, SessionId, Token...)
│   └── composites/      → Composite VOs (AuthVO, SessionVO, UserVO, MfaVO...)
├── events/              → Domain events (UserCreated, LoginSucceeded, SessionRevoked...)
├── entities/            → Entities (UserEntity, AuthEntity, SessionEntity, MfaEntity...)
├── repositories/        → Repository interfaces + DI tokens
├── event-store/         → Event store interfaces
├── services/            → Domain services (password hasher, OTP generator, session rotator)
└── specifications/      → Business rule specifications (CanLogin, CanVerify...)
\`\`\`

**Rules:**
- ❌ No NestJS imports
- ❌ No Prisma imports
- ❌ No HTTP/client imports
- ✅ Pure TypeScript + shared-kernel base classes

**Pattern — Value Object:**
\`\`\`typescript
export class EmailVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): EmailVO {
    // validate format + normalize
  }

  static reconstitute(raw: string): EmailVO {
    // skip validation (DB rebuild)
  }

  get normalized(): string {
    return this.value.toLowerCase().trim();
  }
}
\`\`\`

**Pattern — Aggregate Root:**
\`\`\`typescript
export class UserEntity extends AggregateRoot<string> {
  static create(params): UserEntity {
    // factory + emit UserCreatedEvent
  }

  activate(): void {
    this.assertTransitionTo('active');  // state machine
    this.emitStatusChange('pending', 'active');
  }

  lock(reason: string): void {
    this.assertTransitionTo('locked');
    this.emitStatusChange('active', 'locked');
  }
}
\`\`\`

---

### 2. Application Layer (`src/module/application/`)

**Use-case orchestration — no business rules, only flow.**

\`\`\`
application/
├── dtos/
│   ├── requests/        → Request DTOs
│   └── responses/       → Multi-shape response DTOs
├── errors/              → Typed application errors
├── services/
│   ├── interfaces/      → Service contracts + DI tokens
│   └── impl/            → Service implementations
├── commands/            → Command + handler pairs
├── queries/             → Query + handler pairs
├── sagas/               → Process managers (login, session-expiry, verification)
├── mappers/             → Multi-shape mappers
└── validators/          → Zod wrappers
\`\`\`

**Pattern — Service:**
\`\`\`typescript
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly repo: AuthRepository,
    private readonly eventBridge: DomainEventBridgeService,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async register(dto, userId): Promise<AuthRegisterResponseDTO> {
    const hashed = await this.passwordHasher.hash(dto.password);
    const entity = AuthEntity.create({ ... });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return AuthMapper.toRegisterResponse(saved);
  }
}
\`\`\`

**Pattern — Command + Handler:**
\`\`\`typescript
export class LoginCommand extends BaseCommand {
  readonly type = 'identity.auth.login';
  constructor(public dto, public ip, public userAgent) { super(); }
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<...> {
  constructor(@Inject(AUTH_SERVICE) private service) {}
  execute(c) { return this.service.login(c.dto, c.ip, c.userAgent); }
}
\`\`\`

---

### 3. Infrastructure Layer (`src/module/infrastructure/`)

**Adapters — persistence, messaging, external services.**

\`\`\`
infrastructure/
├── persistence/
│   ├── prisma/          → Prisma client + 27 mappers + 27 repositories
│   ├── cache/           → Redis cache repositories
│   ├── memory/          → 27 InMemory repositories (Termux fallback)
│   └── persistence.module.ts  → DB_MODE switch
├── queues/              → BullMQ queues (email, sms, cleanup)
├── workers/             → Background workers (BaseWorker pattern)
├── external/            → email (SendGrid), sms (SSLWireless)
├── services/            → external clients + internal helpers (crypto, hashing)
└── config/              → config files
\`\`\`

**Pattern — Prisma Repository:**
\`\`\`typescript
@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: IdentityPrismaService) {}

  private get delegate(): UserDelegate {
    return this.prisma.getModel<UserDelegate>('user');
  }

  async findById(id: string): Promise<UserEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? UserPrismaMapper.toDomain(raw) : null;
  }

  async findByEmail(email: EmailVO): Promise<UserEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { email: email.normalized, deletedAt: null },
    });
    return raw ? UserPrismaMapper.toDomain(raw) : null;
  }
}
\`\`\`

**Pattern — InMemory Repository:**
\`\`\`typescript
@Injectable()
export class InMemoryUserRepository
  extends InMemoryRepository<UserEntity, string>
  implements UserRepository
{
  protected idOf(entity: UserEntity): string { return entity.id; }

  async findByIdVO(id: UserIdVO): Promise<UserEntity | null> {
    return this.findById(id.value);
  }

  async findByEmail(email: EmailVO): Promise<UserEntity | null> {
    const all = await this.findAll();
    return all.find((u) => u.email.normalized === email.normalized) ?? null;
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
│   ├── requests/        → class-validator DTOs
│   └── responses/       → Swagger response DTOs
├── mappers/             → HTTP ↔ App DTO mappers
├── validators/          → HTTP validation wrappers
├── guards/              → Guards (JwtAuthGuard, PublicGuard, OwnerGuard)
├── interceptors/        → Interceptors (Cache, Timeout, Logging)
├── decorators/          → Decorators (CurrentUser, Public, Owner, Roles)
├── middlewares/         → Middlewares (CorrelationId, RateLimit)
├── swagger/             → Swagger helper files
└── controllers/
    └── rest/            → 24 REST controllers
\`\`\`

**Pattern — REST Controller:**
\`\`\`typescript
@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { super(); }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiRegister()
  async register(
    @Body() dto: RegisterHttpDTO,
  ): Promise<AuthRegisterHttpResponseDTO> {
    const appDto = AuthControllerMapper.toRegisterAppDto(dto);
    const result = await this.authService.register(appDto);
    return AuthControllerMapper.toRegisterHttp(result);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  async login(
    @Body() dto: LoginHttpDTO,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<AuthLoginHttpResponseDTO> {
    const appDto = AuthControllerMapper.toLoginAppDto(dto);
    const result = await this.authService.login(appDto, ip, userAgent);
    return AuthControllerMapper.toLoginHttp(result);
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
├── health/              → HealthModule
├── auth/                → AuthModule
├── auth-session/        → Session management
├── auth-mfa/            → MFA
├── auth-social/         → Social login
├── auth-sso/            → SSO
├── auth-role/           → Roles
├── auth-permission/     → Permissions
├── user/                → User management
├── user-profile/        → Profile
├── user-settings/       → Settings
├── user-preferences/    → Preferences
├── user-address/        → Addresses
├── user-contact/        → Contacts
├── user-kyc/            → KYC
├── user-activity/       → Activity log
├── public-profile/      → Public profile
└── ...
\`\`\`

**Pattern — Feature Module:**
\`\`\`typescript
@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    // Service + DI token
    AuthService,
    { provide: AUTH_SERVICE, useExisting: AuthService },

    // Command handlers
    ...(AUTH_COMMAND_HANDLERS as readonly unknown[] as never[]),

    // Query handlers
    ...(AUTH_QUERY_HANDLERS as readonly unknown[] as never[]),

    // Sagas
    ...(AUTH_SAGAS as readonly unknown[] as never[]),

    // Guards
    JwtAuthGuard,
  ],
  exports: [AuthService, AUTH_SERVICE],
})
export class AuthModule {}
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
| Primitive VO | `<concept>-<prop>.vo.ts` | `user-id.vo.ts`, `session-id.vo.ts` |
| Composite VO | `<concept>.vo.ts` | `auth.vo.ts` |
| Entity | `<concept>.entity.ts` | `auth.entity.ts`, `user.entity.ts` |
| Event | `<concept>.events.ts` | `auth.events.ts` |
| Repository | `<concept>.repository.interface.ts` | `auth.repository.interface.ts` |
| Command | `<action>-<concept>.command.ts` | `login.command.ts` |
| Handler | `<action>-<concept>.handler.ts` | `login.handler.ts` |
| Query | `<action>-<concept>.query.ts` | `get-session.query.ts` |
| Saga | `<process>.saga.ts` | `auth-lifecycle.saga.ts` |
| Mapper | `<concept>.mapper.ts` | `auth.mapper.ts` |
| Validator | `<concept>.validator.ts` | `auth.validator.ts` |
| Guard | `<purpose>.guard.ts` | `jwt-auth.guard.ts` |
| Interceptor | `<purpose>.interceptor.ts` | `session-cache.interceptor.ts` |
| Controller | `<concept>.controller.ts` | `auth.controller.ts` |
| Feature Module | `<feature>.module.ts` | `auth.module.ts` |

---

## 🎯 Pattern — 10 Core Rules

1. **Typed errors everywhere** — `ValidationError`, `BusinessRuleError`, `NotFoundError`, `ConflictError`
2. **`reconstitute()`** — every VO + Entity has factory + DB rebuild
3. **`assertInvariants()`** — separate method (testable)
4. **`assertTransitionTo()`** — state machine safety (auth status, session status)
5. **`emitStatusChange()`** — audit trail of every state change
6. **Rich predicates** — `isActive()`, `isExpired()`, `isRevoked()`, ...
7. **Business methods** — not just getters
8. **DI tokens** — `Symbol('AUTH_REPOSITORY')` + `@Inject(...)`
9. **Multi-shape DTOs** — Full, Public, Summary, List, Detail, Stats
10. **Real business logic** — password hashing, TOTP validation, session rotation

---

## 📊 Total Stats

| Layer | Files |
|-------|-------|
| Domain | ~200 |
| Application | ~400 |
| Infrastructure | ~300 |
| Interfaces | ~150 |
| Modules | ~150 |
| **TOTAL** | **~1,200** |

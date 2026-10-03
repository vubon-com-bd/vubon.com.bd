/**
 * USER SERVICE — ARCHITECTURE DOCUMENTATION
 * @module user-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  📐 CLEAN ARCHITECTURE — 5 LAYERS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Layers (top → bottom):
 *
 *    ┌──────────────────────────────────────┐
 *    │  L5  Modules      (NestJS wiring)    │
 *    ├──────────────────────────────────────┤
 *    │  L4  Interfaces   (HTTP/Controllers) │
 *    ├──────────────────────────────────────┤
 *    │  L3  Infrastructure (DB/Cache/Queue) │
 *    ├──────────────────────────────────────┤
 *    │  L2  Application  (Use Cases/CQRS)   │
 *    ├──────────────────────────────────────┤
 *    │  L1  Domain       (Business rules)   │
 *    └──────────────────────────────────────┘
 *
 *  Rule: Higher layer may import from lower. Never reverse.
 *  Rule: Cross-service communication = Event only.
 */

export const USER_SERVICE_ARCHITECTURE = {
  name: 'user-service',
  version: '1.0.0',
  layers: 5,
  endpoints: 40,
  prismaModels: 8,
  totalSourceFiles: 481,
  totalTests: 932,
  testSuites: 191,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L1 — DOMAIN LAYER (Pure Business)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/domain/
 *
 *  Contains:
 *
 *  Value Objects (43 total):
 *    • 34 primitives — UserId, UserEmail, UserName, UserStatus, ...
 *    • 9 composites — UserVO, UserProfileVO, UserPersonaVO, ...
 *
 *  Entities (8 aggregates):
 *    • UserEntity, UserProfileEntity, UserSettingsEntity,
 *      UserPreferencesEntity, UserAddressEntity, UserContactEntity,
 *      UserKycEntity, UserActivityEntity
 *
 *  Repository Interfaces (8):
 *    • UserRepository, UserProfileRepository, UserSettingsRepository,
 *      UserPreferencesRepository, UserAddressRepository,
 *      UserContactRepository, UserKycRepository, UserActivityRepository
 *
 *  Domain Events (8 files):
 *    • user.events, user-profile.events, user-settings.events,
 *      user-preferences.events, user-address.events, user-contact.events,
 *      user-kyc.events, user-activity.events
 *
 *  Specifications (6):
 *    • CanUpdateProfile, CanAddAddress, CanSubmitKyc,
 *      CanChangeEmail, CanChangePhone, CanDeleteAccount
 *
 *  Services (8):
 *    • ProfileCompletionService, ProfileVisibilityService,
 *      AddressValidationService, ContactValidationService,
 *      KycEligibilityService, PreferenceMergerService,
 *      UserTierService, UserPersonaService
 *
 *  Principles:
 *    ✅ Pure TypeScript — no framework imports
 *    ✅ Immutable value objects
 *    ✅ Entities with identity + invariants
 *    ✅ Domain events on state change
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  L2 — APPLICATION LAYER (Use Cases / CQRS)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/application/
 *
 *  Contains:
 *
 *  Commands (27 handlers):
 *    • User: CreateUser, UpdateUser, DeleteUser, ActivateUser,
 *            DeactivateUser, SuspendUser, UnsuspendUser
 *    • Profile: UpdateProfile, UpdateAvatar, UpdateBio, UpdateVisibility
 *    • Address: AddAddress, UpdateAddress, DeleteAddress, SetDefaultAddress
 *    • Contact: AddContact, UpdateContact, DeleteContact, VerifyContact
 *    • Preferences: UpdatePreferences, ResetPreferences
 *    • Settings: UpdateSettings, ResetSettings
 *    • KYC: SubmitKyc, VerifyKyc, RejectKyc, ReverifyKyc
 *
 *  Queries (17 handlers):
 *    • User: GetUser, GetUserByEmail, ListUsers, SearchUsers
 *    • Profile: GetProfile, GetPublicProfile
 *    • Address: ListAddresses, GetAddress, GetDefaultAddress
 *    • Contact: ListContacts, GetContact
 *    • Preferences: GetPreferences
 *    • Settings: GetSettings
 *    • KYC: GetKycStatus, ListKycDocuments
 *    • Activity: ListActivities, GetUserStats
 *
 *  Sagas (3):
 *    • UserOnboardingSaga, UserVerificationSaga, KycVerificationSaga
 *
 *  Services (8):
 *    • UserService, UserProfileService, UserSettingsService,
 *      UserPreferencesService, UserAddressService, UserContactService,
 *      UserKycService, UserActivityService
 *
 *  DTOs (44):
 *    • 34 request DTOs + 10 response DTOs
 *
 *  Mappers (6): Entity ↔ DTO transformers
 *  Validators (5): Zod-based input validation
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  L3 — INFRASTRUCTURE LAYER (Adapters)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/infrastructure/
 *
 *  Contains:
 *
 *  Persistence:
 *    • Prisma repositories (8) — implement domain repository interfaces
 *    • Redis cache repositories (4) — cache layer
 *    • In-memory repositories (dev fallback for Termux / Android)
 *
 *  External Integrations:
 *    • Email (SMTP) — templates: welcome, profile-complete,
 *                              kyc-submitted, kyc-verified, kyc-rejected
 *    • SMS — verification codes
 *    • Push — device notifications
 *    • Storage — avatar uploads
 *
 *  Internal Services (5):
 *    • ProfileCompletionCalculatorService
 *    • AvatarProcessorService
 *    • KycDocumentValidatorService
 *    • UserTierEvaluatorService
 *    • ActivityRecorderService
 *
 *  Workers (6):
 *    • UserSyncWorker, ProfileCompletionWorker, KycExpiryWorker,
 *      ActivityCleanupWorker, AnalyticsProcessorWorker,
 *      NotificationDispatcherWorker
 *
 *  Queues (5): User, Profile, KYC, Notification, Analytics
 *  Config (8): user, profile, address, contact, preferences,
 *              kyc, activity, avatar
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  L4 — INTERFACES LAYER (HTTP Transport)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/interfaces/
 *
 *  Contains:
 *
 *  REST Controllers (9):
 *    • UserController, UserProfileController, UserSettingsController,
 *      UserPreferencesController, UserAddressController,
 *      UserContactController, UserKycController, UserActivityController,
 *      PublicProfileController
 *
 *  Guards (3): OwnProfileGuard, VerifiedUserGuard, KycVerifiedGuard
 *  Interceptors (2): UserCacheInterceptor, AvatarCacheInterceptor
 *  Decorators (3): RequireOwnProfile, RequireVerifiedUser, RequireKycVerified
 *
 *  DTOs (19): 8 request + 9 response + 2 index
 *  Mappers (5): HTTP DTO ↔ Application DTO
 *  Validators (3): Interface-level validation
 *  Swagger (5): API documentation helpers
 *
 *  Rules:
 *    • Thin controllers (5-10 lines each)
 *    • Command/Query dispatch only
 *    • No direct DB / business logic
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  L5 — MODULES LAYER (NestJS Wiring)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/modules/
 *
 *  Contains:
 *
 *    • app.module.ts — Root module (imports all features)
 *    • common/ — Global providers (CQRS, EventBus, Config)
 *
 *  Feature modules (9):
 *    • user, user-profile, user-settings, user-preferences,
 *      user-address, user-contact, user-kyc, user-activity,
 *      public-profile
 *
 *  Each feature module:
 *    • Registers its controller
 *    • Binds repositories (interface → impl)
 *    • Registers command + query handlers
 *    • Registers sagas (if any)
 *    • Exports its public service
 *
 *  Rules:
 *    • No business logic in modules
 *    • No DB / HTTP calls
 *    • Only wiring
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 CROSS-SERVICE COMMUNICATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  Rule: Events only. No DB sharing. No direct imports.
 *
 *  Consumes (from other services):
 *
 *    auth-service       → UserCreatedEvent      (create profile)
 *    auth-service       → UserVerifiedEvent     (mark verified)
 *    auth-service       → UserDeletedEvent      (soft delete)
 *    order-service      → OrderCompletedEvent   (record activity)
 *    payment-service    → PaymentCompletedEvent (record activity)
 *    product-service    → ReviewSubmittedEvent  (record activity)
 *
 *  Exposes (to other services):
 *
 *    ProfileCreatedEvent  → marketing-service
 *    ProfileUpdatedEvent  → order-service, analytics
 *    AddressAddedEvent    → order-service
 *    AddressUpdatedEvent  → order-service
 *    KycSubmittedEvent    → admin-service
 *    KycVerifiedEvent     → payment-service
 *    KycRejectedEvent     → notification-service
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 LAYER DEPENDENCY MATRIX
 * ══════════════════════════════════════════════════════════════════
 *
 *  From \ To         | kernel | domain | application | infra | iface | modules
 *  ──────────────────┼────────┼────────┼─────────────┼───────┼───────┼────────
 *  shared-kernel     |   ❌   |   ❌   |     ❌      |  ❌   |  ❌   |   ❌
 *  domain            |   ✅   |   ❌   |     ❌      |  ❌   |  ❌   |   ❌
 *  application       |   ✅   |   ✅   |     ❌      |  ❌   |  ❌   |   ❌
 *  infrastructure    |   ✅   |   ✅   |     ✅      |  ❌   |  ❌   |   ❌
 *  interfaces        |   ✅   |   ✅   |     ✅      |  ❌   |  ❌   |   ❌
 *  modules           |   ✅   |   ✅   |     ✅      |  ✅   |  ✅   |   ❌
 *
 *  Read: row → column ✅ means "can import from"
 *
 *  Forbidden:
 *    🔴 Infrastructure ↔ Interfaces (never direct)
 *    🔴 Domain → Application / Infra / Interfaces (reverse)
 *    🔴 Cross-service direct import
 *    🔴 Cross-service DB access
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 FOLDER STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *  apps/user-service/
 *  ├── docs/                            ← source-of-truth docs
 *  │   ├── architecture.doc.ts
 *  │   ├── api.doc.ts
 *  │   ├── deployment.doc.ts
 *  │   ├── development.doc.ts
 *  │   ├── testing.doc.ts
 *  │   └── extract-docs.cjs
 *  ├── src/
 *  │   ├── main.ts                      ← bootstrap entrypoint
 *  │   └── module/
 *  │       ├── domain/                  ← L1
 *  │       ├── application/             ← L2
 *  │       ├── infrastructure/          ← L3
 *  │       ├── interfaces/              ← L4
 *  │       └── modules/                 ← L5
 *  ├── test/
 *  │   ├── unit/                        ← 190 unit test files
 *  │   ├── e2e/                         ← 1 E2E test
 *  │   └── helpers/
 *  └── *.md                             ← AUTO-GENERATED docs
 */

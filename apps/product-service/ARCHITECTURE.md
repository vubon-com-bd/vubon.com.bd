# ARCHITECTURE

PRODUCT SERVICE — ARCHITECTURE DOCUMENTATION
@module product-service/docs

══════════════════════════════════════════════════════════════════
 📐 CLEAN ARCHITECTURE — 5 LAYERS
══════════════════════════════════════════════════════════════════

 Layers (top → bottom):

   ┌──────────────────────────────────────┐
   │  L5  Modules      (NestJS wiring)    │
   ├──────────────────────────────────────┤
   │  L4  Interfaces   (HTTP/Controllers) │
   ├──────────────────────────────────────┤
   │  L3  Infrastructure (DB/Cache/Queue) │
   ├──────────────────────────────────────┤
   │  L2  Application  (Use Cases/CQRS)   │
   ├──────────────────────────────────────┤
   │  L1  Domain       (Business rules)   │
   └──────────────────────────────────────┘

 Rule: Higher layer may import from lower. Never reverse.
 Rule: Cross-service communication = Event only.

---

══════════════════════════════════════════════════════════════════
 L1 — DOMAIN LAYER (Pure Business)
══════════════════════════════════════════════════════════════════

 Location: src/module/domain/

 Contains:

 Value Objects (50 total):
   • 37 primitives — ProductId, ProductName, ProductSlug, ProductSku,
     Price, Discount, TaxRate, CategoryId, BrandId, VariantId, ...
   • 13 composites — ProductVO, VariantVO, CategoryVO, BrandVO,
     InventoryVO, PricingVO, ReviewVO, MediaVO, AttributeVO,
     CollectionVO, ProductAggregateVO, VariantOptionSetVO

 Entities (10 aggregates):
   • ProductEntity (Aggregate Root)
   • ProductVariantEntity
   • ProductInventoryEntity
   • ProductPricingEntity
   • ProductMediaEntity
   • ProductAttributeEntity
   • ProductReviewEntity (Aggregate Root)
   • BrandEntity (Aggregate Root)
   • CategoryEntity (Aggregate Root)
   • CollectionEntity (Aggregate Root)

 Repository Interfaces (10):
   • ProductRepository, VariantRepository, InventoryRepository,
     PricingRepository, MediaRepository, AttributeRepository,
     ReviewRepository, BrandRepository, CategoryRepository,
     CollectionRepository

 Domain Events (9 files):
   • product.events (10 classes)
   • variant.events (7 classes)
   • inventory.events (7 classes)
   • pricing.events (5 classes)
   • review.events (7 classes)
   • media.events (4 classes)
   • brand.events (5 classes)
   • category.events (6 classes)
   • event.helpers

 Specifications (8):
   • CanPublishProduct, CanArchiveProduct, CanAddVariant,
     CanAddMedia, CanDeleteCategory, CanDeleteBrand,
     CanEditReview, CanTransitionStatus

 Domain Services (6):
   • SkuGeneratorService
   • SlugGeneratorService
   • PriceCalculatorService
   • StockAvailabilityService
   • PublishValidatorService
   • VariantMatrixService

 Errors (8 files):
   • product.errors, variant.errors, inventory.errors,
     pricing.errors, review.errors, media.errors,
     brand.errors, category.errors

 Principles:
   ✅ Pure TypeScript — no framework imports
   ✅ Immutable value objects
   ✅ Entities with identity + invariants
   ✅ Domain events on state change

---

══════════════════════════════════════════════════════════════════
 L2 — APPLICATION LAYER (Use Cases / CQRS)
══════════════════════════════════════════════════════════════════

 Location: src/module/application/

 Contains:

 Commands (46 handlers):
   • Product: Create, Update, Delete, Publish, Unpublish,
              Archive, Feature, Duplicate
   • Variant: Add, Update, Remove, RegenerateMatrix
   • Attribute: Add, Update, Remove
   • Inventory: Update, Adjust, Reserve, Release
   • Pricing: UpdatePrice, ApplyDiscount, RemoveDiscount
   • Collection: Create, Update, Delete,
                 AddProduct, RemoveProduct
   • Review: Submit, Update, Approve, Reject, Delete,
             MarkHelpful, Report
   • Brand: Create, Update, Delete, Activate, Deactivate, Feature
   • Category: Create, Update, Delete, Move, Activate, Deactivate

 Queries (23 handlers):
   • Product: Get, GetBySlug, GetDetail, List, Search
   • Variant: ListByProduct
   • Attribute: ListByProduct
   • Inventory: ListByProduct, ListLowStock
   • Pricing: GetByProduct, QuotePrice
   • Collection: Get, ListFeatured, ListActive
   • Review: ListByProduct, GetStats
   • Brand: Get, GetBySlug, ListFeatured
   • Category: Get, GetTree, ListByParent
   • Media: ListByProduct

 Sagas (3):
   • ProductPublishSaga
   • StockAlertSaga
   • ReviewModerationSaga

 Services (11):
   • ProductService, VariantService, AttributeService,
     InventoryService, PricingService, CollectionService,
     ReviewService, BrandService, CategoryService,
     MediaService, ProductCatalogService

 DTOs (59):
   • 46 request DTOs + 13 response DTOs

 Mappers (12): Entity ↔ DTO transformers
 Errors (11): Application-level error types

---

══════════════════════════════════════════════════════════════════
 L3 — INFRASTRUCTURE LAYER (Adapters)
══════════════════════════════════════════════════════════════════

 Location: src/module/infrastructure/

 Contains:

 Persistence:
   • Prisma repositories (10) — implement domain interfaces
   • Redis cache repositories (5) — product, list, category-tree,
     inventory, search-result
   • Search indexers (3) — product, category, brand

 External Integrations:
   • Meilisearch — full-text search
   • Storage (local / S3 / GCS) — media uploads
   • Notification — admin / vendor alerts

 Internal Services (8):
   • SkuGeneratorService, SlugGeneratorService,
     PriceCalculatorService, StockAvailabilityService,
     PublishValidatorService, VariantMatrixService,
     MediaProcessingService, ProductReferenceService

 External Services (5):
   • StorageService, ImageProcessingService,
     SearchIndexerService, NotificationService,
     EventPublisherService

 Workers (7):
   • ProductIndexWorker
   • InventoryAlertWorker
   • SearchReindexWorker
   • MediaProcessingWorker
   • ReviewModerationWorker
   • NotificationWorker

 Queues (6):
   • product, inventory, search, media, review, notification

 Config (8):
   • product, variant, inventory, pricing, review,
     media, search, brand

---

══════════════════════════════════════════════════════════════════
 L4 — INTERFACES LAYER (HTTP Transport)
══════════════════════════════════════════════════════════════════

 Location: src/module/interfaces/

 Contains:

 REST Controllers (11):
   • ProductController
   • ProductVariantController
   • ProductAttributeController
   • ProductInventoryController
   • ProductPricingController
   • ProductCollectionController
   • ProductReviewController
   • ProductMediaController
   • BrandController
   • CategoryController
   • PublicProductController

 Guards (3):
   • OwnProductGuard
   • VendorProductGuard
   • ProductPublishedGuard

 Interceptors (2):
   • ProductCacheInterceptor
   • SearchCacheInterceptor

 Decorators (3):
   • OwnProduct, VendorProduct, ProductPublished

 DTOs (23): 11 request + 12 response
 Mappers (5): App DTO ↔ HTTP DTO
 Validators (3): Product, Variant, Review

 Rules:
   • Thin controllers — 5-15 lines per method
   • Command/Query dispatch only
   • No direct DB / business logic

---

══════════════════════════════════════════════════════════════════
 L5 — MODULES LAYER (NestJS Wiring)
══════════════════════════════════════════════════════════════════

 Location: src/module/modules/

 Contains:
   • app.module.ts — Root module (imports all features)
   • common/ — Global providers (CQRS, Prisma)

 Feature modules (11):
   • ProductModule
   • ProductVariantModule
   • ProductAttributeModule
   • ProductInventoryModule
   • ProductPricingModule
   • ProductCollectionModule
   • ProductReviewModule
   • ProductMediaModule
   • BrandModule
   • CategoryModule
   • PublicProductModule

 Plus: QueuesWorkersModule (BullMQ workers)

 Each feature module:
   • Registers its controller
   • Binds repositories (interface → impl)
   • Registers command + query handlers
   • Registers sagas (if any)
   • Exports its public service

 Rules:
   • No business logic in modules
   • No DB / HTTP calls
   • Only wiring

---

══════════════════════════════════════════════════════════════════
 🔄 CROSS-SERVICE COMMUNICATION
══════════════════════════════════════════════════════════════════

 Rule: Events only. No DB sharing. No direct imports.

 Consumes (from other services):

   vendor-service     → VendorVerifiedEvent     (link vendor)
   vendor-service     → VendorSuspendedEvent    (unpublish products)
   order-service      → OrderCreatedEvent       (reserve stock)
   order-service      → OrderCancelledEvent     (release stock)
   user-service       → UserDeletedEvent        (anonymize reviews)

 Exposes (to other services):

   ProductCreatedEvent    → search-service, analytics
   ProductPublishedEvent  → search-service, order-service
   ProductDeletedEvent    → search-service, cart-service
   ProductArchivedEvent   → search-service
   VariantAddedEvent      → search-service, cart-service
   InventoryUpdatedEvent  → order-service, cart-service
   InventoryLowEvent      → notification-service, admin
   OutOfStockEvent        → notification-service, cart-service
   PriceChangedEvent      → order-service, cart-service
   ReviewSubmittedEvent   → user-service, notification-service
   ReviewApprovedEvent    → search-service, analytics

---

══════════════════════════════════════════════════════════════════
 📊 LAYER DEPENDENCY MATRIX
══════════════════════════════════════════════════════════════════

 From \ To         | kernel | domain | application | infra | iface | modules
 ──────────────────┼────────┼────────┼─────────────┼───────┼───────┼────────
 shared-kernel     |   ❌   |   ❌   |     ❌      |  ❌   |  ❌   |   ❌
 domain            |   ✅   |   ❌   |     ❌      |  ❌   |  ❌   |   ❌
 application       |   ✅   |   ✅   |     ❌      |  ❌   |  ❌   |   ❌
 infrastructure    |   ✅   |   ✅   |     ✅      |  ❌   |  ❌   |   ❌
 interfaces        |   ✅   |   ✅   |     ✅      |  ❌   |  ❌   |   ❌
 modules           |   ✅   |   ✅   |     ✅      |  ✅   |  ✅   |   ❌

 Read: row → column ✅ means "can import from"

 Forbidden:
   🔴 Infrastructure ↔ Interfaces (never direct)
   🔴 Domain → Application / Infra / Interfaces (reverse)
   🔴 Cross-service direct import
   🔴 Cross-service DB access

---

══════════════════════════════════════════════════════════════════
 📁 FOLDER STRUCTURE
══════════════════════════════════════════════════════════════════

 apps/product-service/
 ├── docs/                            ← source-of-truth docs
 │   ├── architecture.doc.ts
 │   ├── api.doc.ts
 │   ├── deployment.doc.ts
 │   ├── development.doc.ts
 │   ├── testing.doc.ts
 │   └── extract-docs.cjs
 ├── src/
 │   ├── main.ts                      ← bootstrap entrypoint
 │   └── module/
 │       ├── domain/                  ← L1
 │       ├── application/             ← L2
 │       ├── infrastructure/          ← L3
 │       ├── interfaces/              ← L4
 │       └── modules/                 ← L5
 ├── test/
 │   ├── domain/                      ← unit tests (VOs, entities, ...)
 │   ├── application/                 ← unit tests (services, handlers)
 │   ├── interfaces/                  ← unit tests (controllers, guards)
 │   ├── e2e/                         ← E2E tests
 │   ├── mocks/                       ← typed mocks
 │   └── fixtures.ts
 └── *.md                             ← AUTO-GENERATED docs

<!-- AUTO-GENERATED from docs/changelog.doc.ts. Do not edit directly. -->

ORDER SERVICE — CHANGELOG
@module order-service/docs

 All notable changes to this service will be documented here.
 Format based on Keep a Changelog.
 This project adheres to Semantic Versioning.

══════════════════════════════════════════════════════════════════
 [Unreleased]
══════════════════════════════════════════════════════════════════

 (No unreleased changes.)

---

══════════════════════════════════════════════════════════════════
 [1.0.0] — 2026-10-03
══════════════════════════════════════════════════════════════════

 ### Added

 **Domain**
   • 48 primitive VOs  (order-id, order-number, order-status, ...)
   • 15 composite VOs  (OrderVO, OrderItemVO, OrderTotalsCompositeVO, ...)
   • 13 entities       (OrderEntity aggregate root + 12 others)
   •  9 domain services (order-number, total, status-transition, ...)
   •  6 specifications (can-place, can-cancel, can-return, ...)
   •  9 error classes
   •  8 event files    (60+ event types)

 **Application**
   • 55 DTOs
   • 22 application services (interface + impl)
   • 32 command handlers
   • 22 query handlers
   •  7 sagas
   •  8 mappers, 5 validators, 9 errors

 **Infrastructure**
   • 13 Prisma repositories
   •  4 Redis cache repositories
   •  6 internal services
   •  4 external service stubs (payment, shipping, notification, analytics)
   •  5 BullMQ queues + 6 workers
   •  8 typed config files

 **Interfaces**
   •  8 REST controllers
   •  3 guards (OwnOrder, VendorOrder, OrderStatus)
   •  2 interceptors (OrderCache, CheckoutTimeout)
   •  3 decorators (@OwnOrder, @VendorOrder, @OrderStatus)
   • 16 DTOs, 5 mappers, 3 validators, 7 swagger helpers

 **Modules**
   • AppModule + CommonModule + 11 feature modules

 **Tests**
   • 115 unit test suites, 1,149 tests
   • 5 E2E suites, 40 tests
   • 78.9% statement coverage

 **Shared packages**
   • shared-constants — order channel/source/note/history/regex
   • shared-types     — checkout types, order delivery, response types
   • shared-schemas   — 28 new order/checkout request schemas
   • shared-kernel    — 13 new Order Prisma models

 ### Cross-service events

   Consumes:
     • CartCheckedOutEvent
     • PaymentCompletedEvent
     • PaymentFailedEvent
     • ShipmentCreatedEvent
     • ShipmentDeliveredEvent

   Emits:
     • OrderCreatedEvent
     • OrderConfirmedEvent
     • OrderShippedEvent
     • OrderDeliveredEvent
     • OrderCancelledEvent
     • OrderReturnedEvent

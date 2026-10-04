/**
 * PAYMENT SERVICE — CHANGELOG
 * @module payment-service/docs
 *
 *  All notable changes to this service will be documented here.
 *  Format based on Keep a Changelog.
 *  This project adheres to Semantic Versioning.
 *
 * ══════════════════════════════════════════════════════════════════
 *  [Unreleased]
 * ══════════════════════════════════════════════════════════════════
 *
 *  (No unreleased changes.)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  [1.0.0] — 2026-10-04
 * ══════════════════════════════════════════════════════════════════
 *
 *  ### Added
 *
 *  **Domain**
 *    • 22 primitive VOs  (payment-id, payment-status, payment-amount, ...)
 *    •  3 composite VOs  (PaymentVO, RefundVO, TransactionVO)
 *    •  4 entities       (PaymentEntity aggregate root + 3 others)
 *    •  5 domain services (fee, gateway-router, idempotency,
 *                          refund-policy, transaction-ledger)
 *    •  3 specifications (can-capture, can-refund, can-retry)
 *    •  4 error files
 *    •  5 event files    (payment, transaction, refund, webhook)
 *
 *  **Application**
 *    • 20 command handlers
 *    • 17 query handlers
 *    •  4 application services (Payment, Refund, Transaction, Webhook)
 *    •  3 sagas (payment, refund, webhook lifecycle)
 *    •  4 mappers, 2 validators, 4 error files
 *    • 15 DTOs
 *
 *  **Infrastructure**
 *    •  4 Prisma repositories
 *    •  4 Prisma mappers
 *    •  2 Redis cache repositories
 *    •  7 gateway adapters (bkash, nagad, rocket, sslcommerz,
 *                          stripe, paypal, cod)
 *    •  1 gateway resolver service
 *    •  4 internal services (signature, idempotency,
 *                            fee-calculator, retry-policy)
 *    •  2 external services (notification, analytics)
 *    •  3 BullMQ queues + 6 workers
 *    •  2 typed config files
 *
 *  **Interfaces**
 *    •  5 REST controllers (payment, refund, transaction, webhook, health)
 *    •  2 guards (PaymentOwner, PaymentStatus)
 *    •  1 interceptor (PaymentCache)
 *    •  2 middlewares (Idempotency, CorrelationId)
 *    •  3 validators, 4 mappers, 3 decorators, 2 swagger files
 *
 *  **Modules**
 *    • AppModule + CommonModule + 5 feature modules
 *
 *  **Tests**
 *    • 106 unit test suites, 996 tests
 *    •   5 E2E suites, 68 tests
 *    • 90.11% line coverage
 *
 *  **Shared packages**
 *    • shared-constants — 6 payment constants files
 *    • shared-types     — payment types (Payment, Transaction)
 *    • shared-schemas   — 7 payment Zod schemas
 *    • shared-kernel    — 4 new Prisma models (Payment, Transaction,
 *                         Refund, WebhookEvent)
 *    • shared-config    — 13 gateway config files
 *    • shared-api       — payment API endpoints + types
 *    • shared-utils     — payment validators (bkash, nagad, card, cvv)
 *
 *  ### Cross-service events
 *
 *  Consumes:
 *    • OrderConfirmedEvent   → initiate payment
 *    • OrderCancelledEvent   → cancel / refund payment
 *    • OrderReturnedEvent    → refund payment
 *
 *  Emits:
 *    • PaymentInitiatedEvent → order-service
 *    • PaymentCapturedEvent  → order-service
 *    • PaymentPaidEvent      → order-service
 *    • PaymentFailedEvent    → order-service
 *    • PaymentRefundedEvent  → order-service
 *    • PaymentChargebackEvent → order-service
 */

/**
 * Analytics Service — Domain Layer Barrel
 * @module analytics-service/domain
 *
 * সম্পূর্ণ Domain Layer export:
 * - Value Objects (primitives + composites)
 * - Entities (AggregateRoot + BaseEntity)
 * - Repository Interfaces (contracts)
 * - Event Stores (event sourcing)
 * - Domain Events
 * - Domain Services (business logic)
 * - Specifications (business rules)
 * - Domain Errors
 */
// ─── Value Objects ────────────────────────────────
export * from './value-objects/primitives/index.js';
export * from './value-objects/composites/index.js';

// ─── Entities ─────────────────────────────────────
export * from './entities/index.js';

// ─── Repository Contracts ─────────────────────────
export * from './repositories/index.js';

// ─── Event Stores ─────────────────────────────────
export * from './event-store/index.js';

// ─── Domain Events ────────────────────────────────
export * from './events/index.js';

// ─── Domain Services ──────────────────────────────
export * from './services/index.js';

// ─── Specifications ───────────────────────────────
export * from './specifications/index.js';

// ─── Domain Errors ────────────────────────────────
export * from './errors/index.js';

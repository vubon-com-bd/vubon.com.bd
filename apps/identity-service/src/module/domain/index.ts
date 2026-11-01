/**
 * Auth Service — Domain Layer Barrel
 * @module identity-service/domain
 *
 * Order: errors → primitives → composites → events → entities
 *        → repositories → event-store → services → specifications
 *
 * ⚠️ Composites exported AFTER primitives so that
 *    `RecoveryCodeVO` (composite) wins over primitive naming.
 */

// Errors
export * from './errors/index.js';

// Value Objects — Primitives first
export * from './value-objects/primitives/index.js';

// Value Objects — Composites (may override same-name exports)
export * from './value-objects/composites/index.js';

// Events
export * from './events/index.js';

// Entities
export * from './entities/index.js';

// Repositories
export * from './repositories/index.js';

// Event Stores
export * from './event-store/index.js';

// Services
export * from './services/index.js';

// Specifications
export * from './specifications/index.js';

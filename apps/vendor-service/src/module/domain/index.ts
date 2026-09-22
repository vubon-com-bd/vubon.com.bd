/**
 * Domain Layer — Barrel Export
 *
 * Vendor-service domain layer complete public API.
 * Pure business logic — framework-free.
 */

// Errors
export * from './errors';

// Value Objects
export * from './value-objects/primitives';
export * from './value-objects/composites';

// Events
export * from './events';

// Entities
export * from './entities';

// Repositories (interfaces only)
export * from './repositories';

// Event Stores (interfaces only)
export * from './event-store';

// Domain Services
export * from './services';

// Specifications
export * from './specifications';

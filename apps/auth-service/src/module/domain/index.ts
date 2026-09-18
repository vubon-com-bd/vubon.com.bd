/**
 * Domain Layer — Barrel Export
 *
 * Auth-service domain layer complete public API.
 * Pure business logic — framework-free.
 */

// Errors
export * from './errors';

// Value Objects
export * from './value-objects/primitives';
export * from './value-objects/composites';

// Entities
export * from './entities';

// Events
export * from './events';

// Repositories (interfaces only)
export * from './repositories';

// Event Stores (interfaces only)
export * from './event-store';

// Domain Services
export * from './services';

// Specifications
export * from './specifications';

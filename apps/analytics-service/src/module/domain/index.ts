// ═══════════════════════════════════════════════════════
// Domain Layer — Barrel Export
// ═══════════════════════════════════════════════════════

// Errors
export * from './errors';

// Value Objects
export * from './value-objects/primitives';
export * from './value-objects/composites';

// Entities
export * from './entities';

// Domain Events
export * from './events';

// Repositories (contracts only)
export * from './repositories';

// Event Stores (contracts only)
export * from './event-store';

// Domain Services
export * from './services';

// Specifications
export * from './specifications';

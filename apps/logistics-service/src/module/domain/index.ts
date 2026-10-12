/**
 * Domain Layer — Public API
 * @module logistics-service/domain
 *
 * Exports (in dependency order):
 *  - errors (foundation — no internal deps)
 *  - value-objects (depends on errors)
 *  - events (depends on value-objects types only)
 *  - entities (depends on value-objects + events + errors)
 *  - repositories (depends on entities)
 *  - services (depends on entities + value-objects)
 *  - specifications (depends on entities)
 */
export * from './errors/index.js';
export * from './value-objects/index.js';
export * from './events/index.js';
export * from './entities/index.js';
export * from './repositories/index.js';
export * from './services/index.js';
export * from './specifications/index.js';

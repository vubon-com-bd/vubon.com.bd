/**
 * Order Service — Domain Layer Barrel
 * @module order-service/domain
 *
 * Order: errors → primitives → composites → events → entities
 *        → repositories → event-store → services → specifications
 */
export * from './errors/index.js';
export * from './value-objects/primitives/index.js';
export * from './value-objects/composites/index.js';
export * from './events/index.js';
export * from './entities/index.js';
export * from './repositories/index.js';
export * from './event-store/index.js';
export * from './services/index.js';
export * from './specifications/index.js';

/**
 * Notification Service — Domain Layer
 * @module notification-service/domain
 *
 * Barrel order:
 *   errors → primitives → composites → events
 *   → entities → repositories → event-store
 *   → services → specifications
 *
 * ⚠️ DO NOT import from this barrel inside the domain layer itself।
 *   Each sub-barrel should be imported directly:
 *     import { X } from '@domain/primitives/x.vo.js'
 *     NOT from '@domain/index.js'
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

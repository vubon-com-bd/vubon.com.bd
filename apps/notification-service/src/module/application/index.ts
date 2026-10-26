/**
 * Notification Service — Application Layer
 * @module notification-service/application
 *
 * Barrel order (dependency-safe):
 *   errors → dtos → services → commands → queries → sagas → mappers → validators
 *
 * ⚠️ DO NOT import from this barrel inside the application layer itself।
 *   Each sub-barrel should be imported directly via alias:
 *     import { X } from '@application/errors/notification.errors.js'
 *     NOT from '@application/index.js'
 */
export * from './errors/index.js';
export * from './dtos/index.js';
export * from './services/index.js';
export * from './commands/index.js';
export * from './queries/index.js';
export * from './sagas/index.js';
export * from './mappers/index.js';
export * from './validators/index.js';

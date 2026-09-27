/**
 * Domain Layer — Barrel
 * @module auth-service/domain
 */
export * from './errors/index.js';
export * from './value-objects/index.js';
export * from './repositories/index.js';
export * from './events/index.js';
export * from './event-store/index.js';
export * from './services/index.js';
export * from './specifications/index.js';

// Re-export the colliding names explicitly so TS knows they are the same.
export type {
  BiometricKind,
  KycStatus,
  KycDocumentType,
} from './value-objects/index.js';

export * from './entities/index.js';

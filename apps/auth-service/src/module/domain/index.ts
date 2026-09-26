/**
 * Domain Layer — Barrel
 * @module auth-service/domain
 */
export * from './errors';
export * from './value-objects';
export * from './repositories';
export * from './events';
export * from './event-store';
export * from './services';
export * from './specifications';

// Re-export the colliding names explicitly so TS knows they are the same.
export type {
  BiometricKind,
  KycStatus,
  KycDocumentType,
} from './value-objects';

export * from './entities';

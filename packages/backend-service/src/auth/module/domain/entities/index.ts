/**
 * Entities Exports
 * Central export point for all entities in the auth domain
 */

// Export base entity
export { BaseEntity } from './base.entity';

// Export user entity
export { User } from './user.entity';

// Export session entity
export { Session } from './session.entity';

// Export MFA entity - commented out until mfa.entity.ts is complete
// export { MFA } from './mfa.entity';

// Export user types
export type { UserStatus, UserMetadata } from './user.entity';

// Export session types
export type { SessionStatus, SessionDeviceInfo } from './session.entity';

// Export MFA types - commented out until mfa.entity.ts is complete
// export type { MFAType, MFAStatus } from './mfa.entity';

// Note: Import and export other entities as they are created
// export { Token } from './token.entity';
// export { Role } from './role.entity';
// export { Permission } from './permission.entity';

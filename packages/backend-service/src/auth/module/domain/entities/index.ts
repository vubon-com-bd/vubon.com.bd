/**
 * Entities Exports
 * Central export point for all entities in the auth domain
 */

// Export base entity
export { BaseEntity } from './base.entity';

// Export user entity
export { User } from './user.entity';

// Export types
export type { UpdateProfileData, UserPreferences } from './user.entity';

// Note: Import and export other entities as they are created
// export { Session } from './session.entity';
// export { Token } from './token.entity';
// export { Role } from './role.entity';
// export { Permission } from './permission.entity';

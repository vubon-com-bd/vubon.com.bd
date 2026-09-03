/**
 * Shared Schemas Index
 * সকল শেয়ার্ড স্কিমা এক্সপোর্ট
 */

// Common exports
export * from './common';

// Auth exports
export * from './auth';

// User exports (UserSchema এবং UserProfileSchema কমন থেকে আসে, তাই এগুলো বাদ)
export { UserBaseSchema, UserCreateSchema, UserUpdateSchema } from './user';
export type { UserBaseSchemaType, UserCreateSchemaType, UserUpdateSchemaType } from './user';

// বাকি সব User স্কিমা (যেগুলো কমনে নেই)
export * from './user/user-status.schema';
export * from './user/user-type.schema';
export * from './user/user-role.schema';
export * from './user/user-permission.schema';
// UserProfileSchema কমনে আছে, তাই user-profile.schema.ts থেকে আলাদা নামে এক্সপোর্ট
export {
  UserProfileDataSchema,
  UserProfileCreateSchema,
  UserProfileUpdateSchema,
} from './user/user-profile.schema';
export type {
  UserProfileDataSchemaType,
  UserProfileCreateSchemaType,
  UserProfileUpdateSchemaType,
} from './user/user-profile.schema';
export * from './user/user-settings.schema';
export * from './user/user-preferences.schema';
export * from './user/user-address.schema';
export * from './user/user-contact.schema';
export * from './user/user-verification.schema';
export * from './user/user-kyc.schema';
export * from './user/user-activity.schema';
export * from './user/user-log.schema';
export * from './user/user-analytics.schema';

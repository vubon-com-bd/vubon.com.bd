/**
 * Role constants for the shared package
 * These constants define user roles and permissions across the application
 */

export const DEFAULT_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  GUEST: 'guest',
} as const;

export type DefaultRole = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SYSTEM: 'system',
  SUPPORT: 'support',
} as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

export const ALL_ROLES = {
  ...DEFAULT_ROLES,
  ...SYSTEM_ROLES,
} as const;

export type Role = (typeof ALL_ROLES)[keyof typeof ALL_ROLES];

export const ROLE_HIERARCHY = {
  [ALL_ROLES.SUPER_ADMIN]: 100,
  [ALL_ROLES.SYSTEM]: 90,
  [ALL_ROLES.ADMIN]: 80,
  [ALL_ROLES.MODERATOR]: 70,
  [ALL_ROLES.SUPPORT]: 60,
  [ALL_ROLES.CUSTOMER]: 10,
  [ALL_ROLES.GUEST]: 0,
} as const;

export type RoleHierarchy = typeof ROLE_HIERARCHY;

export const ROLE_PERMISSIONS = {
  [ALL_ROLES.SUPER_ADMIN]: ['*'],
  [ALL_ROLES.SYSTEM]: ['system:*', 'user:*', 'content:*', 'settings:*'],
  [ALL_ROLES.ADMIN]: ['user:read', 'user:write', 'content:read', 'content:write', 'settings:read'],
  [ALL_ROLES.MODERATOR]: ['user:read', 'content:read', 'content:moderate'],
  [ALL_ROLES.SUPPORT]: ['user:read', 'ticket:read', 'ticket:write'],
  [ALL_ROLES.CUSTOMER]: ['content:read', 'profile:read', 'profile:write'],
  [ALL_ROLES.GUEST]: ['content:read'],
} as const;

export type RolePermissions = typeof ROLE_PERMISSIONS;

export const DEFAULT_ASSIGNED_ROLE = DEFAULT_ROLES.CUSTOMER;

export const ROLE_DESCRIPTIONS = {
  [ALL_ROLES.SUPER_ADMIN]: 'Has complete system access and control',
  [ALL_ROLES.SYSTEM]: 'System-level automated processes and services',
  [ALL_ROLES.ADMIN]: 'Administrative user with elevated privileges',
  [ALL_ROLES.MODERATOR]: 'Can moderate content and user interactions',
  [ALL_ROLES.SUPPORT]: 'Can handle user support tickets and inquiries',
  [ALL_ROLES.CUSTOMER]: 'Standard user with basic access',
  [ALL_ROLES.GUEST]: 'Unauthenticated or limited access user',
} as const;

export type RoleDescription = (typeof ROLE_DESCRIPTIONS)[keyof typeof ROLE_DESCRIPTIONS];

export const ROLE_GROUPS = {
  ADMINISTRATIVE: [ALL_ROLES.SUPER_ADMIN, ALL_ROLES.SYSTEM, ALL_ROLES.ADMIN] as const,
  MODERATION: [ALL_ROLES.MODERATOR, ALL_ROLES.SUPPORT] as const,
  STANDARD: [ALL_ROLES.CUSTOMER] as const,
  PUBLIC: [ALL_ROLES.GUEST] as const,
} as const;

export type RoleGroup = keyof typeof ROLE_GROUPS;

export const HIGHEST_ROLE = ALL_ROLES.SUPER_ADMIN;
export const LOWEST_ROLE = ALL_ROLES.GUEST;

export const ROLE_WEIGHTS = {
  [ALL_ROLES.SUPER_ADMIN]: 7,
  [ALL_ROLES.SYSTEM]: 6,
  [ALL_ROLES.ADMIN]: 5,
  [ALL_ROLES.MODERATOR]: 4,
  [ALL_ROLES.SUPPORT]: 3,
  [ALL_ROLES.CUSTOMER]: 2,
  [ALL_ROLES.GUEST]: 1,
} as const;

export type RoleWeight = (typeof ROLE_WEIGHTS)[keyof typeof ROLE_WEIGHTS];

export const ROLE_COLORS = {
  [ALL_ROLES.SUPER_ADMIN]: '#FF0000',
  [ALL_ROLES.SYSTEM]: '#FF6B00',
  [ALL_ROLES.ADMIN]: '#FFA500',
  [ALL_ROLES.MODERATOR]: '#00BFFF',
  [ALL_ROLES.SUPPORT]: '#00FF7F',
  [ALL_ROLES.CUSTOMER]: '#4B0082',
  [ALL_ROLES.GUEST]: '#808080',
} as const;

export type RoleColor = (typeof ROLE_COLORS)[keyof typeof ROLE_COLORS];

export const ROLE_ICONS = {
  [ALL_ROLES.SUPER_ADMIN]: 'crown',
  [ALL_ROLES.SYSTEM]: 'server',
  [ALL_ROLES.ADMIN]: 'shield',
  [ALL_ROLES.MODERATOR]: 'gavel',
  [ALL_ROLES.SUPPORT]: 'headset',
  [ALL_ROLES.CUSTOMER]: 'user',
  [ALL_ROLES.GUEST]: 'user-secret',
} as const;

export type RoleIcon = (typeof ROLE_ICONS)[keyof typeof ROLE_ICONS];

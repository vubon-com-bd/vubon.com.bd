/**
 * Common Types
 * সাধারণ টাইপ কনস্ট্যান্টস
 */

export const TYPES = {
  // User types
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  GUEST: 'guest',
  VENDOR: 'vendor',
  MANAGER: 'manager',
  SUPPORT: 'support',
  DELIVERY_AGENT: 'delivery_agent',

  // Content types
  ARTICLE: 'article',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  DOCUMENT: 'document',

  // Status types
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DELETED: 'deleted',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
} as const;

export type CommonType = (typeof TYPES)[keyof typeof TYPES];

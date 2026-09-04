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

  // Attribute types (for product attributes)
  TEXT: 'text',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',

  // Pricing types
  FIXED: 'fixed',
  VARIABLE: 'variable',
  SUBSCRIPTION: 'subscription',
  DOWNLOADABLE: 'downloadable',
  VIRTUAL: 'virtual',
  SERVICE: 'service',
  DIGITAL: 'digital',
  PHYSICAL: 'physical',
} as const;

export type CommonType = (typeof TYPES)[keyof typeof TYPES];

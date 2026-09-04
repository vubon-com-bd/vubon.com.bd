/**
 * Admin Level Constants
 * অ্যাডমিন লেভেল সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_LEVEL = {
  // Admin levels
  LEVELS: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
    LEVEL_5: 'level_5',
  },

  // Level hierarchy
  HIERARCHY: {
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
  },

  // Level metadata
  METADATA: {
    LEVEL_1: {
      name: 'Level 1',
      nameBangla: 'লেভেল ১',
      description: 'Basic admin access',
      permissions: ['read'],
      maxUsers: 10,
    },
    LEVEL_2: {
      name: 'Level 2',
      nameBangla: 'লেভেল ২',
      description: 'Standard admin access',
      permissions: ['read', 'create', 'update'],
      maxUsers: 50,
    },
    LEVEL_3: {
      name: 'Level 3',
      nameBangla: 'লেভেল ৩',
      description: 'Advanced admin access',
      permissions: ['read', 'create', 'update', 'delete'],
      maxUsers: 100,
    },
    LEVEL_4: {
      name: 'Level 4',
      nameBangla: 'লেভেল ৪',
      description: 'Full admin access',
      permissions: ['*'],
      maxUsers: 500,
    },
    LEVEL_5: {
      name: 'Level 5',
      nameBangla: 'লেভেল ৫',
      description: 'Super admin access',
      permissions: ['*'],
      maxUsers: Infinity,
    },
  },

  // Default values
  DEFAULTS: {
    LEVEL: 'level_1',
    AUTO_PROMOTE: false,
    PROMOTE_THRESHOLD: 30,
  },
} as const;

export type AdminLevelValue = (typeof ADMIN_LEVEL.LEVELS)[keyof typeof ADMIN_LEVEL.LEVELS];
export type AdminLevelHierarchy =
  (typeof ADMIN_LEVEL.HIERARCHY)[keyof typeof ADMIN_LEVEL.HIERARCHY];

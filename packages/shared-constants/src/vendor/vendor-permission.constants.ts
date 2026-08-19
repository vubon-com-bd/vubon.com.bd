/**
 * ভেন্ডার পারমিশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পারমিশন রিসোর্স অবজেক্ট
 */
export const PermissionResource = {
  VENDOR: 'VENDOR',
  PROFILE: 'PROFILE',
  BUSINESS: 'BUSINESS',
  DOCUMENT: 'DOCUMENT',
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
  PAYMENT: 'PAYMENT',
  TEAM: 'TEAM',
  TICKET: 'TICKET',
  SUBSCRIPTION: 'SUBSCRIPTION',
  ANALYTICS: 'ANALYTICS',
} as const;

/**
 * পারমিশন রিসোর্স - ইউনিয়ন টাইপ
 */
export type PermissionResourceValue = (typeof PermissionResource)[keyof typeof PermissionResource];

/**
 * পারমিশন অ্যাকশন অবজেক্ট
 */
export const PermissionAction = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  VIEW: 'VIEW',
  EXPORT: 'EXPORT',
  MANAGE: 'MANAGE',
} as const;

/**
 * পারমিশন অ্যাকশন - ইউনিয়ন টাইপ
 */
export type PermissionActionValue = (typeof PermissionAction)[keyof typeof PermissionAction];

/**
 * পারমিশন রোল অবজেক্ট
 */
export const PermissionRoles = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  ACCOUNTANT: 'ACCOUNTANT',
  SUPPORT: 'SUPPORT',
} as const;

/**
 * পারমিশন রোল - ইউনিয়ন টাইপ
 */
export type PermissionRoleValue = (typeof PermissionRoles)[keyof typeof PermissionRoles];

/**
 * পারমিশন স্কোপ
 */
export const PermissionScope = {
  GLOBAL: 'GLOBAL',
  VENDOR_LEVEL: 'VENDOR_LEVEL',
  TEAM_LEVEL: 'TEAM_LEVEL',
} as const;

/**
 * পারমিশন স্কোপ - ইউনিয়ন টাইপ
 */
export type PermissionScopeValue = (typeof PermissionScope)[keyof typeof PermissionScope];

/**
 * পারমিশন রিসোর্স লেবেলসমূহ
 */
export const PermissionResourceLabels: Record<PermissionResourceValue, { en: string; bn: string }> =
  {
    [PermissionResource.VENDOR]: {
      en: 'Vendor',
      bn: 'ভেন্ডার',
    },
    [PermissionResource.PROFILE]: {
      en: 'Profile',
      bn: 'প্রোফাইল',
    },
    [PermissionResource.BUSINESS]: {
      en: 'Business',
      bn: 'ব্যবসা',
    },
    [PermissionResource.DOCUMENT]: {
      en: 'Document',
      bn: 'ডকুমেন্ট',
    },
    [PermissionResource.PRODUCT]: {
      en: 'Product',
      bn: 'পণ্য',
    },
    [PermissionResource.ORDER]: {
      en: 'Order',
      bn: 'অর্ডার',
    },
    [PermissionResource.PAYMENT]: {
      en: 'Payment',
      bn: 'পেমেন্ট',
    },
    [PermissionResource.TEAM]: {
      en: 'Team',
      bn: 'টিম',
    },
    [PermissionResource.TICKET]: {
      en: 'Ticket',
      bn: 'টিকেট',
    },
    [PermissionResource.SUBSCRIPTION]: {
      en: 'Subscription',
      bn: 'সাবস্ক্রিপশন',
    },
    [PermissionResource.ANALYTICS]: {
      en: 'Analytics',
      bn: 'বিশ্লেষণ',
    },
  };

/**
 * পারমিশন অ্যাকশন লেবেলসমূহ
 */
export const PermissionActionLabels: Record<PermissionActionValue, { en: string; bn: string }> = {
  [PermissionAction.CREATE]: {
    en: 'Create',
    bn: 'তৈরি',
  },
  [PermissionAction.READ]: {
    en: 'Read',
    bn: 'পড়া',
  },
  [PermissionAction.UPDATE]: {
    en: 'Update',
    bn: 'আপডেট',
  },
  [PermissionAction.DELETE]: {
    en: 'Delete',
    bn: 'মুছে ফেলা',
  },
  [PermissionAction.APPROVE]: {
    en: 'Approve',
    bn: 'অনুমোদন',
  },
  [PermissionAction.REJECT]: {
    en: 'Reject',
    bn: 'বাতিল',
  },
  [PermissionAction.VIEW]: {
    en: 'View',
    bn: 'দেখা',
  },
  [PermissionAction.EXPORT]: {
    en: 'Export',
    bn: 'এক্সপোর্ট',
  },
  [PermissionAction.MANAGE]: {
    en: 'Manage',
    bn: 'ব্যবস্থাপনা',
  },
};

/**
 * পারমিশন রোল লেবেলসমূহ
 */
export const PermissionRoleLabels: Record<PermissionRoleValue, { en: string; bn: string }> = {
  [PermissionRoles.OWNER]: {
    en: 'Owner',
    bn: 'মালিক',
  },
  [PermissionRoles.ADMIN]: {
    en: 'Admin',
    bn: 'প্রশাসক',
  },
  [PermissionRoles.MANAGER]: {
    en: 'Manager',
    bn: 'ম্যানেজার',
  },
  [PermissionRoles.STAFF]: {
    en: 'Staff',
    bn: 'স্টাফ',
  },
  [PermissionRoles.ACCOUNTANT]: {
    en: 'Accountant',
    bn: 'হিসাবরক্ষক',
  },
  [PermissionRoles.SUPPORT]: {
    en: 'Support',
    bn: 'সাপোর্ট',
  },
};

/**
 * পারমিশন রোল রঙ কোডসমূহ
 */
export const PermissionRoleColors: Record<PermissionRoleValue, string> = {
  [PermissionRoles.OWNER]: 'bg-purple-100 text-purple-800 border-purple-300',
  [PermissionRoles.ADMIN]: 'bg-blue-100 text-blue-800 border-blue-300',
  [PermissionRoles.MANAGER]: 'bg-green-100 text-green-800 border-green-300',
  [PermissionRoles.STAFF]: 'bg-gray-100 text-gray-800 border-gray-300',
  [PermissionRoles.ACCOUNTANT]: 'bg-orange-100 text-orange-800 border-orange-300',
  [PermissionRoles.SUPPORT]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

/**
 * ডিফল্ট পারমিশন (রোল অনুযায়ী)
 */
export const DefaultPermissions: Record<PermissionRoleValue, string[]> = {
  [PermissionRoles.OWNER]: [
    'VENDOR:MANAGE',
    'PROFILE:MANAGE',
    'BUSINESS:MANAGE',
    'DOCUMENT:MANAGE',
    'PRODUCT:MANAGE',
    'ORDER:MANAGE',
    'PAYMENT:MANAGE',
    'TEAM:MANAGE',
    'TICKET:MANAGE',
    'SUBSCRIPTION:MANAGE',
    'ANALYTICS:MANAGE',
  ],
  [PermissionRoles.ADMIN]: [
    'VENDOR:READ',
    'PROFILE:MANAGE',
    'BUSINESS:MANAGE',
    'DOCUMENT:MANAGE',
    'PRODUCT:MANAGE',
    'ORDER:MANAGE',
    'PAYMENT:READ',
    'TEAM:MANAGE',
    'TICKET:MANAGE',
    'SUBSCRIPTION:READ',
    'ANALYTICS:READ',
  ],
  [PermissionRoles.MANAGER]: [
    'PROFILE:READ',
    'BUSINESS:READ',
    'DOCUMENT:READ',
    'PRODUCT:MANAGE',
    'ORDER:MANAGE',
    'PAYMENT:READ',
    'TEAM:READ',
    'TICKET:MANAGE',
    'ANALYTICS:READ',
  ],
  [PermissionRoles.STAFF]: [
    'PROFILE:READ',
    'PRODUCT:CREATE',
    'PRODUCT:READ',
    'PRODUCT:UPDATE',
    'ORDER:READ',
    'ORDER:UPDATE',
    'TICKET:READ',
    'TICKET:CREATE',
  ],
  [PermissionRoles.ACCOUNTANT]: [
    'PROFILE:READ',
    'PAYMENT:READ',
    'PAYMENT:EXPORT',
    'ORDER:READ',
    'ANALYTICS:READ',
    'ANALYTICS:EXPORT',
  ],
  [PermissionRoles.SUPPORT]: [
    'PROFILE:READ',
    'ORDER:READ',
    'TICKET:MANAGE',
    'DOCUMENT:READ',
    'PRODUCT:READ',
  ],
};

/**
 * পারমিশন স্কোপ লেবেলসমূহ
 */
export const PermissionScopeLabels: Record<PermissionScopeValue, { en: string; bn: string }> = {
  [PermissionScope.GLOBAL]: {
    en: 'Global',
    bn: 'বৈশ্বিক',
  },
  [PermissionScope.VENDOR_LEVEL]: {
    en: 'Vendor Level',
    bn: 'ভেন্ডার স্তর',
  },
  [PermissionScope.TEAM_LEVEL]: {
    en: 'Team Level',
    bn: 'টিম স্তর',
  },
};

/**
 * পারমিশন ক্যাশে টিটিএল (সেকেন্ড)
 */
export const PermissionCacheTTL = 300;

/**
 * পারমিশন অডিট লগ রিটেনশন (দিন)
 */
export const PermissionAuditLogRetentionDays = 365;

/**
 * পারমিশন ম্যাক্স সেশন সময় (ঘণ্টা)
 */
export const PermissionMaxSessionHours = 24;

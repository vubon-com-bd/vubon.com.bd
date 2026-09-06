/**
 * Roles Constants
 * @module shared-constants/common/roles.constants
 */

export const ROLES = {
  // System roles
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  MODERATOR: 'moderator',

  // User roles
  CUSTOMER: 'customer',
  SELLER: 'seller',
  VENDOR: 'vendor',
  SUPPLIER: 'supplier',

  // Support roles
  SUPPORT_AGENT: 'support_agent',
  SUPPORT_MANAGER: 'support_manager',

  // Operations roles
  OPERATIONS: 'operations',
  LOGISTICS: 'logistics',
  WAREHOUSE: 'warehouse',
  DELIVERY: 'delivery',

  // Finance roles
  FINANCE: 'finance',
  ACCOUNTANT: 'accountant',
  AUDITOR: 'auditor',

  // Marketing roles
  MARKETING: 'marketing',
  SEO: 'seo',
  CONTENT: 'content',

  // Development roles
  DEVELOPER: 'developer',
  QA: 'qa',
  DEVOPS: 'devops',

  // Analytics roles
  ANALYST: 'analyst',
  DATA_SCIENTIST: 'data_scientist',

  // Guest/Public
  GUEST: 'guest',
  PUBLIC: 'public',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 90,
  [ROLES.MANAGER]: 80,
  [ROLES.MODERATOR]: 70,
  [ROLES.SUPPORT_MANAGER]: 65,
  [ROLES.SUPPORT_AGENT]: 60,
  [ROLES.FINANCE]: 55,
  [ROLES.ACCOUNTANT]: 50,
  [ROLES.AUDITOR]: 45,
  [ROLES.OPERATIONS]: 40,
  [ROLES.LOGISTICS]: 35,
  [ROLES.WAREHOUSE]: 30,
  [ROLES.DELIVERY]: 25,
  [ROLES.SELLER]: 20,
  [ROLES.VENDOR]: 18,
  [ROLES.SUPPLIER]: 15,
  [ROLES.MARKETING]: 12,
  [ROLES.SEO]: 10,
  [ROLES.CONTENT]: 8,
  [ROLES.DEVELOPER]: 5,
  [ROLES.QA]: 4,
  [ROLES.DEVOPS]: 3,
  [ROLES.ANALYST]: 2,
  [ROLES.DATA_SCIENTIST]: 2,
  [ROLES.CUSTOMER]: 1,
  [ROLES.GUEST]: 0,
  [ROLES.PUBLIC]: 0,
};

export const ADMIN_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.MANAGER,
  ROLES.MODERATOR,
] as const;

export const SUPPORT_ROLES = [ROLES.SUPPORT_AGENT, ROLES.SUPPORT_MANAGER] as const;

export const SELLER_ROLES = [ROLES.SELLER, ROLES.VENDOR, ROLES.SUPPLIER] as const;

export const FINANCE_ROLES = [ROLES.FINANCE, ROLES.ACCOUNTANT, ROLES.AUDITOR] as const;

export const OPERATIONS_ROLES = [
  ROLES.OPERATIONS,
  ROLES.LOGISTICS,
  ROLES.WAREHOUSE,
  ROLES.DELIVERY,
] as const;

export const STAFF_ROLES = [
  ...ADMIN_ROLES,
  ...SUPPORT_ROLES,
  ...FINANCE_ROLES,
  ...OPERATIONS_ROLES,
] as const;

export const ALL_ROLES = Object.values(ROLES);

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.MODERATOR]: 'Moderator',
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.SELLER]: 'Seller',
  [ROLES.VENDOR]: 'Vendor',
  [ROLES.SUPPLIER]: 'Supplier',
  [ROLES.SUPPORT_AGENT]: 'Support Agent',
  [ROLES.SUPPORT_MANAGER]: 'Support Manager',
  [ROLES.OPERATIONS]: 'Operations',
  [ROLES.LOGISTICS]: 'Logistics',
  [ROLES.WAREHOUSE]: 'Warehouse',
  [ROLES.DELIVERY]: 'Delivery',
  [ROLES.FINANCE]: 'Finance',
  [ROLES.ACCOUNTANT]: 'Accountant',
  [ROLES.AUDITOR]: 'Auditor',
  [ROLES.MARKETING]: 'Marketing',
  [ROLES.SEO]: 'SEO',
  [ROLES.CONTENT]: 'Content',
  [ROLES.DEVELOPER]: 'Developer',
  [ROLES.QA]: 'QA',
  [ROLES.DEVOPS]: 'DevOps',
  [ROLES.ANALYST]: 'Analyst',
  [ROLES.DATA_SCIENTIST]: 'Data Scientist',
  [ROLES.GUEST]: 'Guest',
  [ROLES.PUBLIC]: 'Public',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]: 'Full system access with all permissions',
  [ROLES.ADMIN]: 'Administrative access with most permissions',
  [ROLES.MANAGER]: 'Management level access',
  [ROLES.MODERATOR]: 'Content moderation access',
  [ROLES.CUSTOMER]: 'Regular customer access',
  [ROLES.SELLER]: 'Seller panel access',
  [ROLES.VENDOR]: 'Vendor panel access',
  [ROLES.SUPPLIER]: 'Supplier panel access',
  [ROLES.SUPPORT_AGENT]: 'Customer support access',
  [ROLES.SUPPORT_MANAGER]: 'Support team management',
  [ROLES.OPERATIONS]: 'Operations management access',
  [ROLES.LOGISTICS]: 'Logistics management access',
  [ROLES.WAREHOUSE]: 'Warehouse management access',
  [ROLES.DELIVERY]: 'Delivery management access',
  [ROLES.FINANCE]: 'Financial management access',
  [ROLES.ACCOUNTANT]: 'Accounting access',
  [ROLES.AUDITOR]: 'Audit access',
  [ROLES.MARKETING]: 'Marketing campaign access',
  [ROLES.SEO]: 'SEO management access',
  [ROLES.CONTENT]: 'Content management access',
  [ROLES.DEVELOPER]: 'Development access',
  [ROLES.QA]: 'Quality assurance access',
  [ROLES.DEVOPS]: 'DevOps infrastructure access',
  [ROLES.ANALYST]: 'Data analysis access',
  [ROLES.DATA_SCIENTIST]: 'Data science access',
  [ROLES.GUEST]: 'Guest user access (limited)',
  [ROLES.PUBLIC]: 'Public access (unauthenticated)',
};

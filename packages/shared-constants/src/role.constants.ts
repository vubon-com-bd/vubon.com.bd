/**
 * Role Constants - Pure immutable role definitions
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/role.constants
 * 
 * RULES:
 * ✅ NO permission checking logic, DB role fetching
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Available Roles in System (Extended for Bangladesh E-commerce)
// ============================================================
export const ROLES = {
  // ========== System/Admin Roles ==========
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SYSTEM_MONITOR: 'system_monitor',
  AUDITOR: 'auditor',
  
  // ========== Business Operation Roles ==========
  CONTENT_MANAGER: 'content_manager',
  MARKETING_MANAGER: 'marketing_manager',
  ANALYST: 'analyst',
  SUPPORT_AGENT: 'support_agent',
  SUPPORT_SUPERVISOR: 'support_supervisor',
  
  // ========== E-commerce Specific Roles ==========
  VENDOR: 'vendor',
  VENDOR_MANAGER: 'vendor_manager',
  DELIVERY_AGENT: 'delivery_agent',
  DELIVERY_MANAGER: 'delivery_manager',
  
  // ========== Shop Management ==========
  SHOP_MANAGER: 'shop_manager',
  SHOP_STAFF: 'shop_staff',
  
  // ========== Customer Facing ==========
  CUSTOMER: 'customer',
  GUEST: 'guest',
  PREMIUM_CUSTOMER: 'premium_customer',
  
  // ========== Bangladesh Specific ==========
  DISTRICT_MANAGER: 'district_manager',
  UPZILA_AGENT: 'upzila_agent',
  MFS_AGENT: 'mfs_agent',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// ============================================================
// Role Display Names (For UI)
// ============================================================
export const ROLE_DISPLAY_NAMES = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.SYSTEM_MONITOR]: 'System Monitor',
  [ROLES.AUDITOR]: 'Auditor',
  [ROLES.CONTENT_MANAGER]: 'Content Manager',
  [ROLES.MARKETING_MANAGER]: 'Marketing Manager',
  [ROLES.ANALYST]: 'Business Analyst',
  [ROLES.SUPPORT_AGENT]: 'Support Agent',
  [ROLES.SUPPORT_SUPERVISOR]: 'Support Supervisor',
  [ROLES.VENDOR]: 'Vendor',
  [ROLES.VENDOR_MANAGER]: 'Vendor Manager',
  [ROLES.DELIVERY_AGENT]: 'Delivery Agent',
  [ROLES.DELIVERY_MANAGER]: 'Delivery Manager',
  [ROLES.SHOP_MANAGER]: 'Shop Manager',
  [ROLES.SHOP_STAFF]: 'Shop Staff',
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.GUEST]: 'Guest',
  [ROLES.PREMIUM_CUSTOMER]: 'Premium Customer',
  [ROLES.DISTRICT_MANAGER]: 'District Manager',
  [ROLES.UPZILA_AGENT]: 'Upzila Agent',
  [ROLES.MFS_AGENT]: 'Mobile Financial Services Agent',
} as const;

// ============================================================
// Role Hierarchy (Higher index = More permissions)
// Used for simple role comparison
// ============================================================
export const ROLE_HIERARCHY = {
  // Level 100: System roles (Highest)
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 95,
  [ROLES.SYSTEM_MONITOR]: 90,
  [ROLES.AUDITOR]: 85,
  
  // Level 80: Management roles
  [ROLES.MARKETING_MANAGER]: 80,
  [ROLES.CONTENT_MANAGER]: 78,
  [ROLES.VENDOR_MANAGER]: 76,
  [ROLES.DELIVERY_MANAGER]: 75,
  [ROLES.DISTRICT_MANAGER]: 74,
  [ROLES.SUPPORT_SUPERVISOR]: 73,
  
  // Level 60: Operational roles
  [ROLES.ANALYST]: 65,
  [ROLES.SHOP_MANAGER]: 63,
  [ROLES.VENDOR]: 60,
  [ROLES.DELIVERY_AGENT]: 58,
  [ROLES.SUPPORT_AGENT]: 57,
  [ROLES.UPZILA_AGENT]: 56,
  
  // Level 40: Staff roles
  [ROLES.SHOP_STAFF]: 45,
  [ROLES.MFS_AGENT]: 43,
  
  // Level 20: Customer roles
  [ROLES.PREMIUM_CUSTOMER]: 25,
  [ROLES.CUSTOMER]: 20,
  
  // Level 0: Unauthenticated
  [ROLES.GUEST]: 0,
} as const;

// ============================================================
// Role Inheritance (Roles that inherit permissions from parent roles)
// ============================================================
export const ROLE_INHERITANCE = {
  [ROLES.SUPER_ADMIN]: null,
  [ROLES.ADMIN]: ROLES.SUPER_ADMIN,
  [ROLES.SYSTEM_MONITOR]: ROLES.ADMIN,
  [ROLES.AUDITOR]: ROLES.ADMIN,
  [ROLES.CONTENT_MANAGER]: ROLES.ADMIN,
  [ROLES.MARKETING_MANAGER]: ROLES.ADMIN,
  [ROLES.ANALYST]: ROLES.ADMIN,
  [ROLES.SUPPORT_SUPERVISOR]: ROLES.ADMIN,
  [ROLES.SUPPORT_AGENT]: ROLES.SUPPORT_SUPERVISOR,
  [ROLES.VENDOR_MANAGER]: ROLES.ADMIN,
  [ROLES.VENDOR]: ROLES.VENDOR_MANAGER,
  [ROLES.DELIVERY_MANAGER]: ROLES.ADMIN,
  [ROLES.DELIVERY_AGENT]: ROLES.DELIVERY_MANAGER,
  [ROLES.DISTRICT_MANAGER]: ROLES.ADMIN,
  [ROLES.UPZILA_AGENT]: ROLES.DISTRICT_MANAGER,
  [ROLES.SHOP_MANAGER]: ROLES.VENDOR,
  [ROLES.SHOP_STAFF]: ROLES.SHOP_MANAGER,
  [ROLES.MFS_AGENT]: ROLES.VENDOR,
  [ROLES.PREMIUM_CUSTOMER]: ROLES.CUSTOMER,
  [ROLES.CUSTOMER]: null,
  [ROLES.GUEST]: null,
} as const;

// ============================================================
// Default Role for New Users
// ============================================================
export const DEFAULT_ROLE = ROLES.CUSTOMER;

// ============================================================
// Role Categories (For UI grouping)
// ============================================================
export const ROLE_CATEGORIES = {
  SYSTEM: 'System Administration',
  MANAGEMENT: 'Management',
  OPERATIONS: 'Operations',
  VENDOR: 'Vendor Management',
  DELIVERY: 'Delivery & Logistics',
  CUSTOMER: 'Customer',
  BANGLADESH: 'Bangladesh Specific',
} as const;

export type RoleCategory = typeof ROLE_CATEGORIES[keyof typeof ROLE_CATEGORIES];

// ============================================================
// Role to Category Mapping
// ============================================================
export const ROLE_TO_CATEGORY = {
  [ROLES.SUPER_ADMIN]: ROLE_CATEGORIES.SYSTEM,
  [ROLES.ADMIN]: ROLE_CATEGORIES.SYSTEM,
  [ROLES.SYSTEM_MONITOR]: ROLE_CATEGORIES.SYSTEM,
  [ROLES.AUDITOR]: ROLE_CATEGORIES.SYSTEM,
  [ROLES.CONTENT_MANAGER]: ROLE_CATEGORIES.MANAGEMENT,
  [ROLES.MARKETING_MANAGER]: ROLE_CATEGORIES.MANAGEMENT,
  [ROLES.ANALYST]: ROLE_CATEGORIES.MANAGEMENT,
  [ROLES.SUPPORT_SUPERVISOR]: ROLE_CATEGORIES.MANAGEMENT,
  [ROLES.SUPPORT_AGENT]: ROLE_CATEGORIES.OPERATIONS,
  [ROLES.VENDOR_MANAGER]: ROLE_CATEGORIES.VENDOR,
  [ROLES.VENDOR]: ROLE_CATEGORIES.VENDOR,
  [ROLES.SHOP_MANAGER]: ROLE_CATEGORIES.VENDOR,
  [ROLES.SHOP_STAFF]: ROLE_CATEGORIES.VENDOR,
  [ROLES.DELIVERY_MANAGER]: ROLE_CATEGORIES.DELIVERY,
  [ROLES.DELIVERY_AGENT]: ROLE_CATEGORIES.DELIVERY,
  [ROLES.CUSTOMER]: ROLE_CATEGORIES.CUSTOMER,
  [ROLES.PREMIUM_CUSTOMER]: ROLE_CATEGORIES.CUSTOMER,
  [ROLES.GUEST]: ROLE_CATEGORIES.CUSTOMER,
  [ROLES.DISTRICT_MANAGER]: ROLE_CATEGORIES.BANGLADESH,
  [ROLES.UPZILA_AGENT]: ROLE_CATEGORIES.BANGLADESH,
  [ROLES.MFS_AGENT]: ROLE_CATEGORIES.BANGLADESH,
} as const;

// ============================================================
// Immutable Role Metadata
// ============================================================
export const ROLE_METADATA = {
  [ROLES.SUPER_ADMIN]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SUPER_ADMIN],
    description: 'Full system access with all permissions',
    isSystemRole: true,
    cannotBeDeleted: true,
    cannotBeAssignedAutomatically: true,
    maxAssignees: -1,
    requiresMfa: true,
    auditLogging: 'full',
  },
  [ROLES.ADMIN]: {
    name: ROLE_DISPLAY_NAMES[ROLES.ADMIN],
    description: 'Administrative access with most permissions',
    isSystemRole: true,
    cannotBeDeleted: true,
    cannotBeAssignedAutomatically: true,
    maxAssignees: 10,
    requiresMfa: true,
    auditLogging: 'full',
  },
  [ROLES.SYSTEM_MONITOR]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SYSTEM_MONITOR],
    description: 'Read-only access to system metrics and logs',
    isSystemRole: true,
    cannotBeDeleted: true,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 20,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.AUDITOR]: {
    name: ROLE_DISPLAY_NAMES[ROLES.AUDITOR],
    description: 'Audit access to logs and compliance data',
    isSystemRole: true,
    cannotBeDeleted: true,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 5,
    requiresMfa: true,
    auditLogging: 'full',
  },
  [ROLES.CONTENT_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.CONTENT_MANAGER],
    description: 'Manage products, categories, and content',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.MARKETING_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.MARKETING_MANAGER],
    description: 'Manage campaigns, offers, and promotions',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.ANALYST]: {
    name: ROLE_DISPLAY_NAMES[ROLES.ANALYST],
    description: 'Access to reports and analytics',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.SUPPORT_SUPERVISOR]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SUPPORT_SUPERVISOR],
    description: 'Manage support team and escalated tickets',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 50,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.SUPPORT_AGENT]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SUPPORT_AGENT],
    description: 'Handle customer support tickets',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
  },
  [ROLES.VENDOR_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.VENDOR_MANAGER],
    description: 'Manage multiple vendors and their shops',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 20,
    requiresMfa: true,
    auditLogging: 'standard',
  },
  [ROLES.VENDOR]: {
    name: ROLE_DISPLAY_NAMES[ROLES.VENDOR],
    description: 'Sell products on the marketplace',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: true,
    auditLogging: 'standard',
    requiresVerification: true,
  },
  [ROLES.SHOP_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SHOP_MANAGER],
    description: 'Manage a specific vendor shop',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 10,
    requiresMfa: false,
    auditLogging: 'basic',
  },
  [ROLES.SHOP_STAFF]: {
    name: ROLE_DISPLAY_NAMES[ROLES.SHOP_STAFF],
    description: 'Assist with shop operations',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
  },
  [ROLES.DELIVERY_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.DELIVERY_MANAGER],
    description: 'Manage delivery operations and agents',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 50,
    requiresMfa: false,
    auditLogging: 'standard',
  },
  [ROLES.DELIVERY_AGENT]: {
    name: ROLE_DISPLAY_NAMES[ROLES.DELIVERY_AGENT],
    description: 'Deliver orders to customers',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
    requiresVerification: true,
  },
  [ROLES.PREMIUM_CUSTOMER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.PREMIUM_CUSTOMER],
    description: 'Loyalty program members with benefits',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: true,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
    requiresPhoneVerification: true,
  },
  [ROLES.CUSTOMER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.CUSTOMER],
    description: 'Regular customer with standard access',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: true,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
  },
  [ROLES.GUEST]: {
    name: ROLE_DISPLAY_NAMES[ROLES.GUEST],
    description: 'Unauthenticated visitor',
    isSystemRole: true,
    cannotBeDeleted: true,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'none',
  },
  [ROLES.DISTRICT_MANAGER]: {
    name: ROLE_DISPLAY_NAMES[ROLES.DISTRICT_MANAGER],
    description: 'Manage operations at district level',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: 64,
    requiresMfa: true,
    auditLogging: 'standard',
  },
  [ROLES.UPZILA_AGENT]: {
    name: ROLE_DISPLAY_NAMES[ROLES.UPZILA_AGENT],
    description: 'Local agent for last-mile operations',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: false,
    auditLogging: 'basic',
    requiresVerification: true,
  },
  [ROLES.MFS_AGENT]: {
    name: ROLE_DISPLAY_NAMES[ROLES.MFS_AGENT],
    description: 'Agent for bKash/Nagad/Rocket payments',
    isSystemRole: false,
    cannotBeDeleted: false,
    cannotBeAssignedAutomatically: false,
    maxAssignees: -1,
    requiresMfa: true,
    auditLogging: 'full',
    requiresVerification: true,
  },
} as const;

// ============================================================
// Role Assignment Limits (UPDATED with DEFAULT)
// ============================================================
export const ROLE_ASSIGNMENT_LIMITS = {
  // Maximum number of users that can have this role
  MAX_ASSIGNEES: {
    [ROLES.SUPER_ADMIN]: 2,
    [ROLES.ADMIN]: 10,
    [ROLES.SYSTEM_MONITOR]: 20,
    [ROLES.AUDITOR]: 5,
    [ROLES.VENDOR_MANAGER]: 20,
    [ROLES.DELIVERY_MANAGER]: 50,
    [ROLES.DISTRICT_MANAGER]: 64,
    [ROLES.SUPPORT_SUPERVISOR]: 50,
    [ROLES.SHOP_MANAGER]: 10,
    DEFAULT: 100,
  },
  
  // Whether role requires approval before assignment
  REQUIRES_APPROVAL: {
    [ROLES.SUPER_ADMIN]: true,
    [ROLES.ADMIN]: true,
    [ROLES.VENDOR]: true,
    [ROLES.DELIVERY_AGENT]: true,
    [ROLES.MFS_AGENT]: true,
    [ROLES.DISTRICT_MANAGER]: true,
    [ROLES.UPZILA_AGENT]: true,
    [ROLES.VENDOR_MANAGER]: true,
    DEFAULT: false,
  },
  
  // Helper function to get max assignees (for runtime use)
  getMaxAssignees: (role: Role): number => {
    return (ROLE_ASSIGNMENT_LIMITS.MAX_ASSIGNEES as any)[role] || 
           (ROLE_ASSIGNMENT_LIMITS.MAX_ASSIGNEES as any).DEFAULT;
  },
  
  // Helper function to check if approval required
  requiresApproval: (role: Role): boolean => {
    return (ROLE_ASSIGNMENT_LIMITS.REQUIRES_APPROVAL as any)[role] || 
           (ROLE_ASSIGNMENT_LIMITS.REQUIRES_APPROVAL as any).DEFAULT;
  },
} as const;

// ============================================================
// Role Colors for UI (Hex codes)
// ============================================================
export const ROLE_COLORS = {
  [ROLES.SUPER_ADMIN]: '#DC2626',
  [ROLES.ADMIN]: '#EA580C',
  [ROLES.SYSTEM_MONITOR]: '#8B5CF6',
  [ROLES.AUDITOR]: '#6B7280',
  [ROLES.CONTENT_MANAGER]: '#10B981',
  [ROLES.MARKETING_MANAGER]: '#F59E0B',
  [ROLES.ANALYST]: '#3B82F6',
  [ROLES.SUPPORT_SUPERVISOR]: '#06B6D4',
  [ROLES.SUPPORT_AGENT]: '#14B8A6',
  [ROLES.VENDOR_MANAGER]: '#8B5CF6',
  [ROLES.VENDOR]: '#A855F7',
  [ROLES.SHOP_MANAGER]: '#D946EF',
  [ROLES.SHOP_STAFF]: '#EC4899',
  [ROLES.DELIVERY_MANAGER]: '#F97316',
  [ROLES.DELIVERY_AGENT]: '#FBBF24',
  [ROLES.PREMIUM_CUSTOMER]: '#F59E0B',
  [ROLES.CUSTOMER]: '#10B981',
  [ROLES.GUEST]: '#9CA3AF',
  [ROLES.DISTRICT_MANAGER]: '#0891B2',
  [ROLES.UPZILA_AGENT]: '#0D9488',
  [ROLES.MFS_AGENT]: '#6366F1',
} as const;

// ============================================================
// Role Badge Variants (For UI components)
// ============================================================
export const ROLE_BADGE_VARIANTS = {
  [ROLES.SUPER_ADMIN]: 'destructive',
  [ROLES.ADMIN]: 'warning',
  [ROLES.SYSTEM_MONITOR]: 'secondary',
  [ROLES.AUDITOR]: 'secondary',
  [ROLES.CONTENT_MANAGER]: 'success',
  [ROLES.MARKETING_MANAGER]: 'warning',
  [ROLES.ANALYST]: 'info',
  [ROLES.SUPPORT_SUPERVISOR]: 'info',
  [ROLES.SUPPORT_AGENT]: 'success',
  [ROLES.VENDOR_MANAGER]: 'secondary',
  [ROLES.VENDOR]: 'primary',
  [ROLES.SHOP_MANAGER]: 'primary',
  [ROLES.SHOP_STAFF]: 'secondary',
  [ROLES.DELIVERY_MANAGER]: 'warning',
  [ROLES.DELIVERY_AGENT]: 'success',
  [ROLES.PREMIUM_CUSTOMER]: 'premium',
  [ROLES.CUSTOMER]: 'default',
  [ROLES.GUEST]: 'secondary',
  [ROLES.DISTRICT_MANAGER]: 'info',
  [ROLES.UPZILA_AGENT]: 'success',
  [ROLES.MFS_AGENT]: 'primary',
} as const;

// ============================================================
// System Roles List (Cannot be modified/removed)
// ============================================================
export const SYSTEM_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.SYSTEM_MONITOR,
  ROLES.AUDITOR,
  ROLES.GUEST,
] as const;

// ============================================================
// Roles that require email verification
// ============================================================
export const ROLES_REQUIRING_EMAIL_VERIFICATION = [
  ROLES.VENDOR,
  ROLES.VENDOR_MANAGER,
  ROLES.DELIVERY_AGENT,
  ROLES.MFS_AGENT,
] as const;

// ============================================================
// Roles that require phone verification (Bangladesh specific)
// ============================================================
export const ROLES_REQUIRING_PHONE_VERIFICATION = [
  ROLES.VENDOR,
  ROLES.DELIVERY_AGENT,
  ROLES.MFS_AGENT,
  ROLES.PREMIUM_CUSTOMER,
  ROLES.UPZILA_AGENT,
] as const;

// ============================================================
// Roles that require KYC (Know Your Customer)
// ============================================================
export const ROLES_REQUIRING_KYC = [
  ROLES.VENDOR,
  ROLES.MFS_AGENT,
  ROLES.DELIVERY_AGENT,
  ROLES.UPZILA_AGENT,
] as const;

// ============================================================
// All Roles List (For iteration)
// ============================================================
export const ALL_ROLES = Object.values(ROLES) as readonly string[];

// ============================================================
// Editable Roles (Can be modified by admins)
// ============================================================
export const EDITABLE_ROLES = ALL_ROLES.filter(
  (role) => !SYSTEM_ROLES.includes(role as any)
) as readonly string[];

// ============================================================
// Role Priority (For sorting in UI)
// ============================================================
export const ROLE_PRIORITY = {
  [ROLES.SUPER_ADMIN]: 1,
  [ROLES.ADMIN]: 2,
  [ROLES.SYSTEM_MONITOR]: 3,
  [ROLES.AUDITOR]: 4,
  [ROLES.MARKETING_MANAGER]: 5,
  [ROLES.CONTENT_MANAGER]: 6,
  [ROLES.VENDOR_MANAGER]: 7,
  [ROLES.DELIVERY_MANAGER]: 8,
  [ROLES.DISTRICT_MANAGER]: 9,
  [ROLES.SUPPORT_SUPERVISOR]: 10,
  [ROLES.ANALYST]: 11,
  [ROLES.VENDOR]: 12,
  [ROLES.SHOP_MANAGER]: 13,
  [ROLES.DELIVERY_AGENT]: 14,
  [ROLES.SUPPORT_AGENT]: 15,
  [ROLES.UPZILA_AGENT]: 16,
  [ROLES.MFS_AGENT]: 17,
  [ROLES.SHOP_STAFF]: 18,
  [ROLES.PREMIUM_CUSTOMER]: 19,
  [ROLES.CUSTOMER]: 20,
  [ROLES.GUEST]: 21,
} as const;

// ============================================================
// Type Exports
// ============================================================
export type RoleHierarchy = typeof ROLE_HIERARCHY;
export type RoleInheritance = typeof ROLE_INHERITANCE;
export type RoleMetadata = typeof ROLE_METADATA;
export type RoleAssignmentLimits = typeof ROLE_ASSIGNMENT_LIMITS;
export type RoleColors = typeof ROLE_COLORS;
export type RoleBadgeVariants = typeof ROLE_BADGE_VARIANTS;
export type RolePriority = typeof ROLE_PRIORITY;

// ============================================================
// Helper Types
// ============================================================
export type SystemRole = typeof SYSTEM_ROLES[number];
export type RoleRequiringEmailVerification = typeof ROLES_REQUIRING_EMAIL_VERIFICATION[number];
export type RoleRequiringPhoneVerification = typeof ROLES_REQUIRING_PHONE_VERIFICATION[number];
export type RoleRequiringKYC = typeof ROLES_REQUIRING_KYC[number];
export type EditableRole = typeof EDITABLE_ROLES[number];

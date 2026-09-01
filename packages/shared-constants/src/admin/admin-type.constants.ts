/**
 * Admin Type Constants
 * Admin categorization types and helpers
 */

/**
 * Admin type - defines employment status
 */
export const ADMIN_TYPE = {
  /** Full-time administrator */
  FULL_TIME: 'full_time',
  /** Part-time administrator */
  PART_TIME: 'part_time',
  /** Contract-based administrator */
  CONTRACT: 'contract',
  /** Freelance administrator */
  FREELANCE: 'freelance',
  /** Intern administrator */
  INTERN: 'intern',
  /** Volunteer administrator */
  VOLUNTEER: 'volunteer',
  /** Consultant administrator */
  CONSULTANT: 'consultant',
  /** Temporary administrator */
  TEMPORARY: 'temporary',
  /** Permanent administrator */
  PERMANENT: 'permanent',
  /** Remote administrator */
  REMOTE: 'remote',
  /** On-site administrator */
  ONSITE: 'onsite',
  /** Hybrid administrator */
  HYBRID: 'hybrid',
} as const;

export type AdminType = (typeof ADMIN_TYPE)[keyof typeof ADMIN_TYPE];

/**
 * Admin specialization types
 */
export const ADMIN_SPECIALIZATION = {
  SYSTEM_ADMIN: 'system_administrator',
  DATABASE_ADMIN: 'database_administrator',
  NETWORK_ADMIN: 'network_administrator',
  SECURITY_ADMIN: 'security_administrator',
  USER_ADMIN: 'user_administrator',
  CONTENT_ADMIN: 'content_administrator',
  PRODUCT_ADMIN: 'product_administrator',
  ORDER_ADMIN: 'order_administrator',
  PAYMENT_ADMIN: 'payment_administrator',
  SHIPPING_ADMIN: 'shipping_administrator',
  INVENTORY_ADMIN: 'inventory_administrator',
  WAREHOUSE_ADMIN: 'warehouse_administrator',
  SUPPLIER_ADMIN: 'supplier_administrator',
  COUPON_ADMIN: 'coupon_administrator',
  PROMOTION_ADMIN: 'promotion_administrator',
  FLASH_SALE_ADMIN: 'flash_sale_administrator',
  DEAL_ADMIN: 'deal_administrator',
  REVIEW_ADMIN: 'review_administrator',
  RATING_ADMIN: 'rating_administrator',
  COMMENT_ADMIN: 'comment_administrator',
  SETTINGS_ADMIN: 'settings_administrator',
  CONFIG_ADMIN: 'config_administrator',
  TEMPLATE_ADMIN: 'template_administrator',
  REPORT_ADMIN: 'report_administrator',
  ANALYTICS_ADMIN: 'analytics_administrator',
  NOTIFICATION_ADMIN: 'notification_administrator',
  LOG_ADMIN: 'log_administrator',
  AUDIT_ADMIN: 'audit_administrator',
  SESSION_ADMIN: 'session_administrator',
  DEVICE_ADMIN: 'device_administrator',
  VERIFICATION_ADMIN: 'verification_administrator',
  BACKUP_ADMIN: 'backup_administrator',
  INTEGRATION_ADMIN: 'integration_administrator',
  WEBHOOK_ADMIN: 'webhook_administrator',
  API_KEY_ADMIN: 'api_key_administrator',
  SUPPORT_ADMIN: 'support_administrator',
  LEGAL_ADMIN: 'legal_administrator',
  COMPLIANCE_ADMIN: 'compliance_administrator',
  RISK_ADMIN: 'risk_administrator',
  QUALITY_ADMIN: 'quality_administrator',
} as const;

export type AdminSpecialization = (typeof ADMIN_SPECIALIZATION)[keyof typeof ADMIN_SPECIALIZATION];

/**
 * Admin type labels
 */
export const ADMIN_TYPE_LABEL: Record<AdminType, string> = {
  [ADMIN_TYPE.FULL_TIME]: 'Full Time',
  [ADMIN_TYPE.PART_TIME]: 'Part Time',
  [ADMIN_TYPE.CONTRACT]: 'Contract',
  [ADMIN_TYPE.FREELANCE]: 'Freelance',
  [ADMIN_TYPE.INTERN]: 'Intern',
  [ADMIN_TYPE.VOLUNTEER]: 'Volunteer',
  [ADMIN_TYPE.CONSULTANT]: 'Consultant',
  [ADMIN_TYPE.TEMPORARY]: 'Temporary',
  [ADMIN_TYPE.PERMANENT]: 'Permanent',
  [ADMIN_TYPE.REMOTE]: 'Remote',
  [ADMIN_TYPE.ONSITE]: 'On-site',
  [ADMIN_TYPE.HYBRID]: 'Hybrid',
};

/**
 * Admin type colors
 */
export const ADMIN_TYPE_COLOR: Record<AdminType, string> = {
  [ADMIN_TYPE.FULL_TIME]: '#28A745',
  [ADMIN_TYPE.PART_TIME]: '#17A2B8',
  [ADMIN_TYPE.CONTRACT]: '#FFC107',
  [ADMIN_TYPE.FREELANCE]: '#6F42C1',
  [ADMIN_TYPE.INTERN]: '#FD7E14',
  [ADMIN_TYPE.VOLUNTEER]: '#20C997',
  [ADMIN_TYPE.CONSULTANT]: '#007BFF',
  [ADMIN_TYPE.TEMPORARY]: '#6C757D',
  [ADMIN_TYPE.PERMANENT]: '#28A745',
  [ADMIN_TYPE.REMOTE]: '#17A2B8',
  [ADMIN_TYPE.ONSITE]: '#DC3545',
  [ADMIN_TYPE.HYBRID]: '#FFC107',
};

/**
 * Admin specialization labels
 */
export const ADMIN_SPECIALIZATION_LABEL: Record<AdminSpecialization, string> = {
  [ADMIN_SPECIALIZATION.SYSTEM_ADMIN]: 'System Administrator',
  [ADMIN_SPECIALIZATION.DATABASE_ADMIN]: 'Database Administrator',
  [ADMIN_SPECIALIZATION.NETWORK_ADMIN]: 'Network Administrator',
  [ADMIN_SPECIALIZATION.SECURITY_ADMIN]: 'Security Administrator',
  [ADMIN_SPECIALIZATION.USER_ADMIN]: 'User Administrator',
  [ADMIN_SPECIALIZATION.CONTENT_ADMIN]: 'Content Administrator',
  [ADMIN_SPECIALIZATION.PRODUCT_ADMIN]: 'Product Administrator',
  [ADMIN_SPECIALIZATION.ORDER_ADMIN]: 'Order Administrator',
  [ADMIN_SPECIALIZATION.PAYMENT_ADMIN]: 'Payment Administrator',
  [ADMIN_SPECIALIZATION.SHIPPING_ADMIN]: 'Shipping Administrator',
  [ADMIN_SPECIALIZATION.INVENTORY_ADMIN]: 'Inventory Administrator',
  [ADMIN_SPECIALIZATION.WAREHOUSE_ADMIN]: 'Warehouse Administrator',
  [ADMIN_SPECIALIZATION.SUPPLIER_ADMIN]: 'Supplier Administrator',
  [ADMIN_SPECIALIZATION.COUPON_ADMIN]: 'Coupon Administrator',
  [ADMIN_SPECIALIZATION.PROMOTION_ADMIN]: 'Promotion Administrator',
  [ADMIN_SPECIALIZATION.FLASH_SALE_ADMIN]: 'Flash Sale Administrator',
  [ADMIN_SPECIALIZATION.DEAL_ADMIN]: 'Deal Administrator',
  [ADMIN_SPECIALIZATION.REVIEW_ADMIN]: 'Review Administrator',
  [ADMIN_SPECIALIZATION.RATING_ADMIN]: 'Rating Administrator',
  [ADMIN_SPECIALIZATION.COMMENT_ADMIN]: 'Comment Administrator',
  [ADMIN_SPECIALIZATION.SETTINGS_ADMIN]: 'Settings Administrator',
  [ADMIN_SPECIALIZATION.CONFIG_ADMIN]: 'Config Administrator',
  [ADMIN_SPECIALIZATION.TEMPLATE_ADMIN]: 'Template Administrator',
  [ADMIN_SPECIALIZATION.REPORT_ADMIN]: 'Report Administrator',
  [ADMIN_SPECIALIZATION.ANALYTICS_ADMIN]: 'Analytics Administrator',
  [ADMIN_SPECIALIZATION.NOTIFICATION_ADMIN]: 'Notification Administrator',
  [ADMIN_SPECIALIZATION.LOG_ADMIN]: 'Log Administrator',
  [ADMIN_SPECIALIZATION.AUDIT_ADMIN]: 'Audit Administrator',
  [ADMIN_SPECIALIZATION.SESSION_ADMIN]: 'Session Administrator',
  [ADMIN_SPECIALIZATION.DEVICE_ADMIN]: 'Device Administrator',
  [ADMIN_SPECIALIZATION.VERIFICATION_ADMIN]: 'Verification Administrator',
  [ADMIN_SPECIALIZATION.BACKUP_ADMIN]: 'Backup Administrator',
  [ADMIN_SPECIALIZATION.INTEGRATION_ADMIN]: 'Integration Administrator',
  [ADMIN_SPECIALIZATION.WEBHOOK_ADMIN]: 'Webhook Administrator',
  [ADMIN_SPECIALIZATION.API_KEY_ADMIN]: 'API Key Administrator',
  [ADMIN_SPECIALIZATION.SUPPORT_ADMIN]: 'Support Administrator',
  [ADMIN_SPECIALIZATION.LEGAL_ADMIN]: 'Legal Administrator',
  [ADMIN_SPECIALIZATION.COMPLIANCE_ADMIN]: 'Compliance Administrator',
  [ADMIN_SPECIALIZATION.RISK_ADMIN]: 'Risk Administrator',
  [ADMIN_SPECIALIZATION.QUALITY_ADMIN]: 'Quality Administrator',
};

/**
 * Get admin type label
 */
export function getAdminTypeLabelFromType(type: string): string {
  return ADMIN_TYPE_LABEL[type as AdminType] || type;
}

/**
 * Get admin type color
 */
export function getAdminTypeColor(type: string): string {
  return ADMIN_TYPE_COLOR[type as AdminType] || '#6C757D';
}

/**
 * Get admin specialization label
 */
export function getAdminSpecializationLabel(specialization: string): string {
  return ADMIN_SPECIALIZATION_LABEL[specialization as AdminSpecialization] || specialization;
}

/**
 * Check if admin type is full-time or permanent
 */
export function isFullTimeAdmin(type: string): boolean {
  const fullTimeTypes: string[] = [ADMIN_TYPE.FULL_TIME, ADMIN_TYPE.PERMANENT, ADMIN_TYPE.ONSITE];
  return fullTimeTypes.includes(type);
}

/**
 * Check if admin type is part-time or temporary
 */
export function isPartTimeAdmin(type: string): boolean {
  const partTimeTypes: string[] = [
    ADMIN_TYPE.PART_TIME,
    ADMIN_TYPE.TEMPORARY,
    ADMIN_TYPE.CONTRACT,
    ADMIN_TYPE.FREELANCE,
  ];
  return partTimeTypes.includes(type);
}

/**
 * Get admin types for dropdown
 */
export function getAdminTypeOptions(): Array<{
  value: AdminType;
  label: string;
}> {
  return (Object.values(ADMIN_TYPE) as AdminType[]).map((type) => ({
    value: type,
    label: ADMIN_TYPE_LABEL[type] || type,
  }));
}

/**
 * Get admin specialization options for dropdown
 */
export function getAdminSpecializationOptions(): Array<{
  value: AdminSpecialization;
  label: string;
}> {
  return (Object.values(ADMIN_SPECIALIZATION) as AdminSpecialization[]).map((spec) => ({
    value: spec,
    label: ADMIN_SPECIALIZATION_LABEL[spec] || spec,
  }));
}

/**
 * Get admin types by category
 */
export function getAdminTypesByCategory(
  category: 'full_time' | 'part_time' | 'other'
): AdminType[] {
  const types: Record<string, AdminType[]> = {
    full_time: [ADMIN_TYPE.FULL_TIME, ADMIN_TYPE.PERMANENT, ADMIN_TYPE.ONSITE],
    part_time: [
      ADMIN_TYPE.PART_TIME,
      ADMIN_TYPE.TEMPORARY,
      ADMIN_TYPE.CONTRACT,
      ADMIN_TYPE.FREELANCE,
    ],
    other: [
      ADMIN_TYPE.INTERN,
      ADMIN_TYPE.VOLUNTEER,
      ADMIN_TYPE.CONSULTANT,
      ADMIN_TYPE.REMOTE,
      ADMIN_TYPE.HYBRID,
    ],
  };
  return types[category] || [];
}

/**
 * Validate admin type
 */
export function isValidAdminType(type: string): type is AdminType {
  return (Object.values(ADMIN_TYPE) as string[]).includes(type);
}

/**
 * Validate admin specialization
 */
export function isValidAdminSpecialization(
  specialization: string
): specialization is AdminSpecialization {
  return (Object.values(ADMIN_SPECIALIZATION) as string[]).includes(specialization);
}

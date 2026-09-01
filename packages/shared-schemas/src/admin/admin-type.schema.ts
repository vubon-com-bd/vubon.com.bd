/**
 * Admin Type Schema
 * Zod schemas for admin type and specialization definitions
 */

import { z } from 'zod';
import { ADMIN_TYPE, ADMIN_SPECIALIZATION } from '@vubon/shared-constants';

/**
 * Admin type enum schema (from constants)
 */
export const adminTypeSchema = z.enum([
  'full_time',
  'part_time',
  'contract',
  'freelance',
  'intern',
  'volunteer',
  'consultant',
  'temporary',
  'permanent',
  'remote',
  'onsite',
  'hybrid',
]);

/**
 * Admin specialization enum schema (from constants)
 */
export const adminSpecializationSchema = z.enum([
  'system_administrator',
  'database_administrator',
  'network_administrator',
  'security_administrator',
  'user_administrator',
  'content_administrator',
  'product_administrator',
  'order_administrator',
  'payment_administrator',
  'shipping_administrator',
  'inventory_administrator',
  'warehouse_administrator',
  'supplier_administrator',
  'coupon_administrator',
  'promotion_administrator',
  'flash_sale_administrator',
  'deal_administrator',
  'review_administrator',
  'rating_administrator',
  'comment_administrator',
  'settings_administrator',
  'config_administrator',
  'template_administrator',
  'report_administrator',
  'analytics_administrator',
  'notification_administrator',
  'log_administrator',
  'audit_administrator',
  'session_administrator',
  'device_administrator',
  'verification_administrator',
  'backup_administrator',
  'integration_administrator',
  'webhook_administrator',
  'api_key_administrator',
  'support_administrator',
  'legal_administrator',
  'compliance_administrator',
  'risk_administrator',
  'quality_administrator',
]);

/**
 * Admin type label schema
 */
export const adminTypeLabelSchema = z.string().min(1).max(50);

/**
 * Admin type color schema (hex color code)
 */
export const adminTypeColorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

/**
 * Admin specialization label schema
 */
export const adminSpecializationLabelSchema = z.string().min(1).max(100);

/**
 * Admin type category schema
 */
export const adminTypeCategorySchema = z.enum(['full_time', 'part_time', 'other']);

/**
 * Type inference from schemas
 */
export type AdminTypeSchema = z.infer<typeof adminTypeSchema>;
export type AdminSpecializationSchema = z.infer<typeof adminSpecializationSchema>;
export type AdminTypeLabelSchema = z.infer<typeof adminTypeLabelSchema>;
export type AdminTypeColorSchema = z.infer<typeof adminTypeColorSchema>;
export type AdminSpecializationLabelSchema = z.infer<typeof adminSpecializationLabelSchema>;
export type AdminTypeCategorySchema = z.infer<typeof adminTypeCategorySchema>;

/**
 * Helper function to check if admin type is full-time or permanent
 */
export function isFullTimeAdminType(type: AdminTypeSchema): boolean {
  const fullTimeTypes: AdminTypeSchema[] = ['full_time', 'permanent', 'onsite'];
  return fullTimeTypes.includes(type);
}

/**
 * Helper function to check if admin type is part-time or temporary
 */
export function isPartTimeAdminType(type: AdminTypeSchema): boolean {
  const partTimeTypes: AdminTypeSchema[] = ['part_time', 'temporary', 'contract', 'freelance'];
  return partTimeTypes.includes(type);
}

/**
 * Helper function to get admin type label
 */
export function getAdminTypeLabelFromType(type: AdminTypeSchema): string {
  const labelMap: Record<AdminTypeSchema, string> = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract: 'Contract',
    freelance: 'Freelance',
    intern: 'Intern',
    volunteer: 'Volunteer',
    consultant: 'Consultant',
    temporary: 'Temporary',
    permanent: 'Permanent',
    remote: 'Remote',
    onsite: 'On-site',
    hybrid: 'Hybrid',
  };
  return labelMap[type] || type;
}

/**
 * Helper function to get admin type color
 */
export function getAdminTypeColorFromType(type: AdminTypeSchema): string {
  const colorMap: Record<AdminTypeSchema, string> = {
    full_time: '#28A745',
    part_time: '#17A2B8',
    contract: '#FFC107',
    freelance: '#6F42C1',
    intern: '#FD7E14',
    volunteer: '#20C997',
    consultant: '#007BFF',
    temporary: '#6C757D',
    permanent: '#28A745',
    remote: '#17A2B8',
    onsite: '#DC3545',
    hybrid: '#FFC107',
  };
  return colorMap[type] || '#6C757D';
}

/**
 * Helper function to get admin specialization label
 */
export function getAdminSpecializationLabel(specialization: AdminSpecializationSchema): string {
  const labelMap: Record<AdminSpecializationSchema, string> = {
    system_administrator: 'System Administrator',
    database_administrator: 'Database Administrator',
    network_administrator: 'Network Administrator',
    security_administrator: 'Security Administrator',
    user_administrator: 'User Administrator',
    content_administrator: 'Content Administrator',
    product_administrator: 'Product Administrator',
    order_administrator: 'Order Administrator',
    payment_administrator: 'Payment Administrator',
    shipping_administrator: 'Shipping Administrator',
    inventory_administrator: 'Inventory Administrator',
    warehouse_administrator: 'Warehouse Administrator',
    supplier_administrator: 'Supplier Administrator',
    coupon_administrator: 'Coupon Administrator',
    promotion_administrator: 'Promotion Administrator',
    flash_sale_administrator: 'Flash Sale Administrator',
    deal_administrator: 'Deal Administrator',
    review_administrator: 'Review Administrator',
    rating_administrator: 'Rating Administrator',
    comment_administrator: 'Comment Administrator',
    settings_administrator: 'Settings Administrator',
    config_administrator: 'Config Administrator',
    template_administrator: 'Template Administrator',
    report_administrator: 'Report Administrator',
    analytics_administrator: 'Analytics Administrator',
    notification_administrator: 'Notification Administrator',
    log_administrator: 'Log Administrator',
    audit_administrator: 'Audit Administrator',
    session_administrator: 'Session Administrator',
    device_administrator: 'Device Administrator',
    verification_administrator: 'Verification Administrator',
    backup_administrator: 'Backup Administrator',
    integration_administrator: 'Integration Administrator',
    webhook_administrator: 'Webhook Administrator',
    api_key_administrator: 'API Key Administrator',
    support_administrator: 'Support Administrator',
    legal_administrator: 'Legal Administrator',
    compliance_administrator: 'Compliance Administrator',
    risk_administrator: 'Risk Administrator',
    quality_administrator: 'Quality Administrator',
  };
  return labelMap[specialization] || specialization;
}

/**
 * Helper function to get admin type category
 */
export function getAdminTypeCategory(type: AdminTypeSchema): AdminTypeCategorySchema {
  if (isFullTimeAdminType(type)) return 'full_time';
  if (isPartTimeAdminType(type)) return 'part_time';
  return 'other';
}

/**
 * Helper function to get admin types by category
 */
export function getAdminTypesByCategory(category: AdminTypeCategorySchema): AdminTypeSchema[] {
  const allTypes = Object.values(ADMIN_TYPE) as AdminTypeSchema[];
  return allTypes.filter((type) => getAdminTypeCategory(type) === category);
}

/**
 * Get all admin type options for dropdown
 */
export function getAdminTypeOptions(): Array<{
  value: AdminTypeSchema;
  label: string;
}> {
  return (Object.values(ADMIN_TYPE) as AdminTypeSchema[]).map((type) => ({
    value: type,
    label: getAdminTypeLabelFromType(type),
  }));
}

/**
 * Get all admin specialization options for dropdown
 */
export function getAdminSpecializationOptions(): Array<{
  value: AdminSpecializationSchema;
  label: string;
}> {
  return (Object.values(ADMIN_SPECIALIZATION) as AdminSpecializationSchema[]).map((spec) => ({
    value: spec,
    label: getAdminSpecializationLabel(spec),
  }));
}

/**
 * Validate admin type
 */
export function isValidAdminType(type: string): type is AdminTypeSchema {
  return (Object.values(ADMIN_TYPE) as string[]).includes(type);
}

/**
 * Validate admin specialization
 */
export function isValidAdminSpecialization(
  specialization: string
): specialization is AdminSpecializationSchema {
  return (Object.values(ADMIN_SPECIALIZATION) as string[]).includes(specialization);
}

/**
 * Export schemas as an object for convenient access
 */
export const adminTypeSchemas = {
  type: adminTypeSchema,
  specialization: adminSpecializationSchema,
  label: adminTypeLabelSchema,
  color: adminTypeColorSchema,
  specializationLabel: adminSpecializationLabelSchema,
  category: adminTypeCategorySchema,
  isFullTime: isFullTimeAdminType,
  isPartTime: isPartTimeAdminType,
  getLabel: getAdminTypeLabelFromType,
  getColor: getAdminTypeColorFromType,
  getSpecializationLabel: getAdminSpecializationLabel,
  getCategory: getAdminTypeCategory,
  getByCategory: getAdminTypesByCategory,
  getTypeOptions: getAdminTypeOptions,
  getSpecializationOptions: getAdminSpecializationOptions,
  isValid: isValidAdminType,
  isValidSpecialization: isValidAdminSpecialization,
};

export default adminTypeSchemas;

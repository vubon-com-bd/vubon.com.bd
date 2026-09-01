/**
 * Admin Department Schema
 * Zod schemas for admin department definitions
 */

import { z } from 'zod';
import { ADMIN_DEPARTMENT, DEPARTMENT_CATEGORY } from '@vubon/shared-constants';
import type { AdminDepartmentWithMetadata, AdminDepartmentFilterParams } from '@vubon/shared-types';

/**
 * Admin department enum schema (from constants)
 */
export const adminDepartmentSchema = z.enum([
  // Core departments
  'management',
  'operations',
  'administration',
  'executive',
  // Technical departments
  'technical',
  'development',
  'engineering',
  'information_technology',
  'devops',
  'security',
  // Business departments
  'business',
  'strategy',
  'planning',
  'innovation',
  // Creative departments
  'design',
  'user_experience',
  'user_interface',
  'creative',
  // Marketing departments
  'marketing',
  'digital_marketing',
  'social_media',
  'content',
  'brand',
  // Sales departments
  'sales',
  'retail',
  'wholesale',
  'b2b',
  'b2c',
  // Support departments
  'support',
  'customer_service',
  'help_desk',
  'technical_support',
  // Finance departments
  'finance',
  'accounting',
  'budget',
  'tax',
  'audit',
  'compliance',
  // HR departments
  'human_resources',
  'recruitment',
  'training',
  'development_hr',
  // Operations departments
  'logistics',
  'supply_chain',
  'procurement',
  'warehouse',
  'inventory',
  // Product departments
  'product',
  'product_development',
  'product_management',
  'quality_assurance',
  // Analytics departments
  'analytics',
  'data_science',
  'business_intelligence',
  'research',
  // Legal departments
  'legal',
  'legal_compliance',
  'regulatory',
  // Special departments
  'special_projects',
  'crisis_management',
  'change_management',
  'business_continuity',
]);

/**
 * Admin department category enum schema (from constants)
 */
export const adminDepartmentCategorySchema = z.enum([
  'core',
  'technical',
  'business',
  'creative',
  'marketing',
  'sales',
  'support',
  'finance',
  'hr',
  'operations',
  'product',
  'analytics',
  'legal',
  'special',
]);

/**
 * Admin department with metadata schema
 */
export const adminDepartmentWithMetadataSchema = z.object({
  department: adminDepartmentSchema,
  label: z.string(),
  color: z.string(),
  icon: z.string(),
  category: adminDepartmentCategorySchema,
}) satisfies z.ZodType<AdminDepartmentWithMetadata>;

/**
 * Admin department filter parameters schema
 */
export const adminDepartmentFilterParamsSchema = z.object({
  departments: z.union([adminDepartmentSchema, z.array(adminDepartmentSchema)]).optional(),
  category: z
    .union([adminDepartmentCategorySchema, z.array(adminDepartmentCategorySchema)])
    .optional(),
  search: z.string().optional(),
}) satisfies z.ZodType<AdminDepartmentFilterParams>;

/**
 * Admin department statistics schema - simplified to avoid complex type issues
 */
export const adminDepartmentStatisticsSchema = z.object({
  totalDepartments: z.number().int().min(0),
  categoryCounts: z.record(z.string(), z.number().int().min(0)),
  departmentsByCategory: z.record(z.string(), z.array(adminDepartmentSchema)),
  mostCommonCategory: z.string().optional(),
});

/**
 * Type inference from schemas
 */
export type AdminDepartmentSchema = z.infer<typeof adminDepartmentSchema>;
export type AdminDepartmentCategorySchema = z.infer<typeof adminDepartmentCategorySchema>;
export type AdminDepartmentWithMetadataSchema = z.infer<typeof adminDepartmentWithMetadataSchema>;
export type AdminDepartmentFilterParamsSchema = z.infer<typeof adminDepartmentFilterParamsSchema>;
export type AdminDepartmentStatisticsSchema = z.infer<typeof adminDepartmentStatisticsSchema>;

/**
 * Helper function to get admin department label
 */
export function getAdminDepartmentLabelFromDept(department: AdminDepartmentSchema): string {
  const labelMap: Record<AdminDepartmentSchema, string> = {
    management: 'Management',
    operations: 'Operations',
    administration: 'Administration',
    executive: 'Executive',
    technical: 'Technical',
    development: 'Development',
    engineering: 'Engineering',
    information_technology: 'Information Technology',
    devops: 'DevOps',
    security: 'Security',
    business: 'Business',
    strategy: 'Strategy',
    planning: 'Planning',
    innovation: 'Innovation',
    design: 'Design',
    user_experience: 'User Experience',
    user_interface: 'User Interface',
    creative: 'Creative',
    marketing: 'Marketing',
    digital_marketing: 'Digital Marketing',
    social_media: 'Social Media',
    content: 'Content',
    brand: 'Brand',
    sales: 'Sales',
    retail: 'Retail',
    wholesale: 'Wholesale',
    b2b: 'B2B',
    b2c: 'B2C',
    support: 'Support',
    customer_service: 'Customer Service',
    help_desk: 'Help Desk',
    technical_support: 'Technical Support',
    finance: 'Finance',
    accounting: 'Accounting',
    budget: 'Budget',
    tax: 'Tax',
    audit: 'Audit',
    compliance: 'Compliance',
    human_resources: 'Human Resources',
    recruitment: 'Recruitment',
    training: 'Training',
    development_hr: 'HR Development',
    logistics: 'Logistics',
    supply_chain: 'Supply Chain',
    procurement: 'Procurement',
    warehouse: 'Warehouse',
    inventory: 'Inventory',
    product: 'Product',
    product_development: 'Product Development',
    product_management: 'Product Management',
    quality_assurance: 'Quality Assurance',
    analytics: 'Analytics',
    data_science: 'Data Science',
    business_intelligence: 'Business Intelligence',
    research: 'Research',
    legal: 'Legal',
    legal_compliance: 'Legal Compliance',
    regulatory: 'Regulatory',
    special_projects: 'Special Projects',
    crisis_management: 'Crisis Management',
    change_management: 'Change Management',
    business_continuity: 'Business Continuity',
  };
  return labelMap[department] || department;
}

/**
 * Helper function to get admin department color
 */
export function getAdminDepartmentColorFromDept(department: AdminDepartmentSchema): string {
  const colorMap: Record<AdminDepartmentSchema, string> = {
    management: '#2C3E50',
    operations: '#34495E',
    administration: '#4A6A8B',
    executive: '#1A237E',
    technical: '#0D47A1',
    development: '#1565C0',
    engineering: '#1976D2',
    information_technology: '#1E88E5',
    devops: '#42A5F5',
    security: '#D32F2F',
    business: '#4E342E',
    strategy: '#5D4037',
    planning: '#6D4C41',
    innovation: '#795548',
    design: '#6A1B9A',
    user_experience: '#7B1FA2',
    user_interface: '#8E24AA',
    creative: '#9C27B0',
    marketing: '#E65100',
    digital_marketing: '#EF6C00',
    social_media: '#F57C00',
    content: '#FB8C00',
    brand: '#FF9800',
    sales: '#1B5E20',
    retail: '#2E7D32',
    wholesale: '#388E3C',
    b2b: '#43A047',
    b2c: '#4CAF50',
    support: '#00695C',
    customer_service: '#00796B',
    help_desk: '#00897B',
    technical_support: '#009688',
    finance: '#4A148C',
    accounting: '#6A1B9A',
    budget: '#7B1FA2',
    tax: '#8E24AA',
    audit: '#9C27B0',
    compliance: '#AB47BC',
    human_resources: '#BF360C',
    recruitment: '#D84315',
    training: '#E64A19',
    development_hr: '#F4511E',
    logistics: '#1A237E',
    supply_chain: '#283593',
    procurement: '#303F9F',
    warehouse: '#3949AB',
    inventory: '#3F51B5',
    product: '#004D40',
    product_development: '#00695C',
    product_management: '#00796B',
    quality_assurance: '#00897B',
    analytics: '#880E4F',
    data_science: '#AD1457',
    business_intelligence: '#C2185B',
    research: '#D81B60',
    legal: '#1A237E',
    legal_compliance: '#283593',
    regulatory: '#303F9F',
    special_projects: '#263238',
    crisis_management: '#37474F',
    change_management: '#455A64',
    business_continuity: '#546E7A',
  };
  return colorMap[department] || '#6C757D';
}

/**
 * Helper function to get admin department icon
 */
export function getAdminDepartmentIconFromDept(department: AdminDepartmentSchema): string {
  const iconMap: Record<AdminDepartmentSchema, string> = {
    management: 'briefcase',
    operations: 'cogs',
    administration: 'building',
    executive: 'user-tie',
    technical: 'microchip',
    development: 'code',
    engineering: 'laptop',
    information_technology: 'server',
    devops: 'cloud',
    security: 'shield',
    business: 'chart-line',
    strategy: 'chess-queen',
    planning: 'tasks',
    innovation: 'lightbulb',
    design: 'paint-brush',
    user_experience: 'hand-pointer',
    user_interface: 'desktop',
    creative: 'palette',
    marketing: 'bullhorn',
    digital_marketing: 'globe',
    social_media: 'share-alt',
    content: 'file-alt',
    brand: 'trademark',
    sales: 'dollar-sign',
    retail: 'store',
    wholesale: 'truck',
    b2b: 'handshake',
    b2c: 'user',
    support: 'headset',
    customer_service: 'phone',
    help_desk: 'question-circle',
    technical_support: 'wrench',
    finance: 'money-bill',
    accounting: 'calculator',
    budget: 'chart-pie',
    tax: 'receipt',
    audit: 'clipboard-check',
    compliance: 'balance-scale',
    human_resources: 'users',
    recruitment: 'user-plus',
    training: 'graduation-cap',
    development_hr: 'user-graduate',
    logistics: 'shipping',
    supply_chain: 'link',
    procurement: 'shopping-cart',
    warehouse: 'warehouse',
    inventory: 'boxes',
    product: 'cube',
    product_development: 'cubes',
    product_management: 'tasks',
    quality_assurance: 'check-double',
    analytics: 'chart-bar',
    data_science: 'brain',
    business_intelligence: 'chart-area',
    research: 'search',
    legal: 'gavel',
    legal_compliance: 'scale',
    regulatory: 'file-signature',
    special_projects: 'rocket',
    crisis_management: 'exclamation-triangle',
    change_management: 'sync',
    business_continuity: 'infinity',
  };
  return iconMap[department] || 'building';
}

/**
 * Helper function to get admin department category
 */
export function getAdminDepartmentCategoryFromDept(
  department: AdminDepartmentSchema
): AdminDepartmentCategorySchema {
  const categoryMap: Record<AdminDepartmentSchema, AdminDepartmentCategorySchema> = {
    management: 'core',
    operations: 'operations',
    administration: 'core',
    executive: 'core',
    technical: 'technical',
    development: 'technical',
    engineering: 'technical',
    information_technology: 'technical',
    devops: 'technical',
    security: 'technical',
    business: 'business',
    strategy: 'business',
    planning: 'business',
    innovation: 'business',
    design: 'creative',
    user_experience: 'creative',
    user_interface: 'creative',
    creative: 'creative',
    marketing: 'marketing',
    digital_marketing: 'marketing',
    social_media: 'marketing',
    content: 'marketing',
    brand: 'marketing',
    sales: 'sales',
    retail: 'sales',
    wholesale: 'sales',
    b2b: 'sales',
    b2c: 'sales',
    support: 'support',
    customer_service: 'support',
    help_desk: 'support',
    technical_support: 'support',
    finance: 'finance',
    accounting: 'finance',
    budget: 'finance',
    tax: 'finance',
    audit: 'finance',
    compliance: 'legal',
    human_resources: 'hr',
    recruitment: 'hr',
    training: 'hr',
    development_hr: 'hr',
    logistics: 'operations',
    supply_chain: 'operations',
    procurement: 'operations',
    warehouse: 'operations',
    inventory: 'operations',
    product: 'product',
    product_development: 'product',
    product_management: 'product',
    quality_assurance: 'product',
    analytics: 'analytics',
    data_science: 'analytics',
    business_intelligence: 'analytics',
    research: 'analytics',
    legal: 'legal',
    legal_compliance: 'legal',
    regulatory: 'legal',
    special_projects: 'special',
    crisis_management: 'special',
    change_management: 'special',
    business_continuity: 'special',
  };
  return categoryMap[department] || 'core';
}

/**
 * Helper function to get all departments in a category
 */
export function getAdminDepartmentsByCategory(
  category: AdminDepartmentCategorySchema
): AdminDepartmentSchema[] {
  const allDepartments = Object.values(ADMIN_DEPARTMENT) as AdminDepartmentSchema[];
  return allDepartments.filter((dept) => getAdminDepartmentCategoryFromDept(dept) === category);
}

/**
 * Helper function to get all departments with metadata
 */
export function getAdminAllDepartmentsWithMetadata(): AdminDepartmentWithMetadataSchema[] {
  const allDepartments = Object.values(ADMIN_DEPARTMENT) as AdminDepartmentSchema[];
  return allDepartments.map((dept) => ({
    department: dept,
    label: getAdminDepartmentLabelFromDept(dept),
    color: getAdminDepartmentColorFromDept(dept),
    icon: getAdminDepartmentIconFromDept(dept),
    category: getAdminDepartmentCategoryFromDept(dept),
  }));
}

/**
 * Helper function to get department dropdown options
 */
export function getAdminDepartmentDropdownOptions(): Array<{
  value: AdminDepartmentSchema;
  label: string;
  category: AdminDepartmentCategorySchema;
  color: string;
}> {
  const allDepartments = Object.values(ADMIN_DEPARTMENT) as AdminDepartmentSchema[];
  return allDepartments.map((dept) => ({
    value: dept,
    label: getAdminDepartmentLabelFromDept(dept),
    category: getAdminDepartmentCategoryFromDept(dept),
    color: getAdminDepartmentColorFromDept(dept),
  }));
}

/**
 * Helper function to create department statistics
 */
export function createAdminDepartmentStatistics(
  departments: AdminDepartmentSchema[]
): AdminDepartmentStatisticsSchema {
  const categoryCounts: Record<string, number> = {};
  const departmentsByCategory: Record<string, AdminDepartmentSchema[]> = {};

  // Initialize with all categories
  const allCategories = Object.values(DEPARTMENT_CATEGORY) as AdminDepartmentCategorySchema[];
  allCategories.forEach((cat) => {
    categoryCounts[cat] = 0;
    departmentsByCategory[cat] = [];
  });

  departments.forEach((dept) => {
    const category = getAdminDepartmentCategoryFromDept(dept);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    departmentsByCategory[category].push(dept);
  });

  let mostCommonCategory: string | undefined;
  let maxCount = 0;
  for (const [category, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonCategory = category;
    }
  }

  return {
    totalDepartments: departments.length,
    categoryCounts,
    departmentsByCategory,
    mostCommonCategory,
  };
}

/**
 * Export schemas as an object for convenient access
 */
export const adminDepartmentSchemas = {
  department: adminDepartmentSchema,
  category: adminDepartmentCategorySchema,
  withMetadata: adminDepartmentWithMetadataSchema,
  filter: adminDepartmentFilterParamsSchema,
  statistics: adminDepartmentStatisticsSchema,
  getLabel: getAdminDepartmentLabelFromDept,
  getColor: getAdminDepartmentColorFromDept,
  getIcon: getAdminDepartmentIconFromDept,
  getCategory: getAdminDepartmentCategoryFromDept,
  getByCategory: getAdminDepartmentsByCategory,
  getAllWithMetadata: getAdminAllDepartmentsWithMetadata,
  getDropdownOptions: getAdminDepartmentDropdownOptions,
  createStatistics: createAdminDepartmentStatistics,
};

export default adminDepartmentSchemas;

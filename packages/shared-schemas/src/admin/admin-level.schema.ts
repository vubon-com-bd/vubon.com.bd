/**
 * Admin Level Schema
 * Zod schemas for admin level and seniority definitions
 */

import { z } from 'zod';

/**
 * Admin level enum schema (from constants)
 */
export const adminLevelSchema = z.enum([
  'junior',
  'senior',
  'expert',
  'lead',
  'manager',
  'director',
  'vice_president',
  'c_level',
  'executive',
]);

/**
 * Admin level hierarchy schema (number, higher = more senior)
 */
export const adminLevelHierarchySchema = z.number().int().min(0).max(100);

/**
 * Admin level experience schema (years of experience required)
 */
export const adminLevelExperienceSchema = z.number().int().min(0).max(50);

/**
 * Admin level label schema
 */
export const adminLevelLabelSchema = z.string().min(1).max(50);

/**
 * Admin level color schema (hex color code)
 */
export const adminLevelColorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

/**
 * Admin level permission multiplier schema
 */
export const adminLevelPermissionMultiplierSchema = z.number().min(0).max(10);

/**
 * Admin level salary range schema
 */
export const adminLevelSalaryRangeSchema = z
  .object({
    min: z.number().int().min(0),
    max: z.number().int().min(0),
  })
  .refine((data) => data.min <= data.max, {
    message: 'Minimum salary must be less than or equal to maximum salary',
  });

/**
 * Admin level with metadata schema
 */
export const adminLevelWithMetadataSchema = z.object({
  level: adminLevelSchema,
  hierarchy: adminLevelHierarchySchema,
  experience: adminLevelExperienceSchema,
  label: adminLevelLabelSchema,
  color: adminLevelColorSchema,
  permissionMultiplier: adminLevelPermissionMultiplierSchema,
  salaryRange: adminLevelSalaryRangeSchema,
});

/**
 * Type inference from schemas
 */
export type AdminLevelSchema = z.infer<typeof adminLevelSchema>;
export type AdminLevelHierarchySchema = z.infer<typeof adminLevelHierarchySchema>;
export type AdminLevelExperienceSchema = z.infer<typeof adminLevelExperienceSchema>;
export type AdminLevelLabelSchema = z.infer<typeof adminLevelLabelSchema>;
export type AdminLevelColorSchema = z.infer<typeof adminLevelColorSchema>;
export type AdminLevelPermissionMultiplierSchema = z.infer<
  typeof adminLevelPermissionMultiplierSchema
>;
export type AdminLevelSalaryRangeSchema = z.infer<typeof adminLevelSalaryRangeSchema>;
export type AdminLevelWithMetadataSchema = z.infer<typeof adminLevelWithMetadataSchema>;

/**
 * Helper function to get admin level hierarchy number
 */
export function getAdminLevelHierarchyFromLevel(level: AdminLevelSchema): number {
  const hierarchyMap: Record<AdminLevelSchema, number> = {
    junior: 10,
    senior: 20,
    expert: 30,
    lead: 40,
    manager: 50,
    director: 60,
    vice_president: 70,
    c_level: 80,
    executive: 90,
  };
  return hierarchyMap[level] || 0;
}

/**
 * Helper function to get admin level experience requirement
 */
export function getAdminLevelExperienceFromLevel(level: AdminLevelSchema): number {
  const experienceMap: Record<AdminLevelSchema, number> = {
    junior: 0,
    senior: 2,
    expert: 5,
    lead: 8,
    manager: 10,
    director: 12,
    vice_president: 15,
    c_level: 20,
    executive: 25,
  };
  return experienceMap[level] || 0;
}

/**
 * Helper function to get admin level label
 */
export function getAdminLevelLabelFromLevel(level: AdminLevelSchema): string {
  const labelMap: Record<AdminLevelSchema, string> = {
    junior: 'Junior Admin',
    senior: 'Senior Admin',
    expert: 'Expert Admin',
    lead: 'Lead Admin',
    manager: 'Admin Manager',
    director: 'Admin Director',
    vice_president: 'VP of Administration',
    c_level: 'C-Level Admin',
    executive: 'Executive Admin',
  };
  return labelMap[level] || level;
}

/**
 * Helper function to get admin level color
 */
export function getAdminLevelColorFromLevel(level: AdminLevelSchema): string {
  const colorMap: Record<AdminLevelSchema, string> = {
    junior: '#6C757D',
    senior: '#007BFF',
    expert: '#17A2B8',
    lead: '#28A745',
    manager: '#FFC107',
    director: '#FD7E14',
    vice_president: '#DC3545',
    c_level: '#6F42C1',
    executive: '#343A40',
  };
  return colorMap[level] || '#6C757D';
}

/**
 * Helper function to get admin level permission multiplier
 */
export function getAdminLevelPermissionMultiplierFromLevel(level: AdminLevelSchema): number {
  const multiplierMap: Record<AdminLevelSchema, number> = {
    junior: 0.5,
    senior: 0.75,
    expert: 1.0,
    lead: 1.25,
    manager: 1.5,
    director: 1.75,
    vice_president: 2.0,
    c_level: 2.5,
    executive: 3.0,
  };
  return multiplierMap[level] || 0.5;
}

/**
 * Helper function to get admin level salary range
 */
export function getAdminLevelSalaryRangeFromLevel(level: AdminLevelSchema): {
  min: number;
  max: number;
} {
  const salaryMap: Record<AdminLevelSchema, { min: number; max: number }> = {
    junior: { min: 25000, max: 40000 },
    senior: { min: 40000, max: 60000 },
    expert: { min: 60000, max: 85000 },
    lead: { min: 85000, max: 120000 },
    manager: { min: 120000, max: 180000 },
    director: { min: 180000, max: 250000 },
    vice_president: { min: 250000, max: 400000 },
    c_level: { min: 400000, max: 700000 },
    executive: { min: 700000, max: 1000000 },
  };
  return salaryMap[level] || { min: 0, max: 0 };
}

/**
 * Helper function to get admin level based on experience
 */
export function getAdminLevelByExperience(years: number): AdminLevelSchema {
  if (years >= 25) return 'executive';
  if (years >= 20) return 'c_level';
  if (years >= 15) return 'vice_president';
  if (years >= 12) return 'director';
  if (years >= 10) return 'manager';
  if (years >= 8) return 'lead';
  if (years >= 5) return 'expert';
  if (years >= 2) return 'senior';
  return 'junior';
}

/**
 * Helper function to check if level has higher authority than another level
 */
export function hasHigherLevelAuthority(
  level1: AdminLevelSchema,
  level2: AdminLevelSchema
): boolean {
  return getAdminLevelHierarchyFromLevel(level1) > getAdminLevelHierarchyFromLevel(level2);
}

/**
 * Helper function to check if level meets minimum requirement
 */
export function meetsMinimumLevel(
  currentLevel: AdminLevelSchema,
  requiredLevel: AdminLevelSchema
): boolean {
  return (
    getAdminLevelHierarchyFromLevel(currentLevel) >= getAdminLevelHierarchyFromLevel(requiredLevel)
  );
}

/**
 * Helper function to get levels below a given level
 */
export function getLevelsBelow(level: AdminLevelSchema): AdminLevelSchema[] {
  const allLevels = [
    'junior',
    'senior',
    'expert',
    'lead',
    'manager',
    'director',
    'vice_president',
    'c_level',
    'executive',
  ] as AdminLevelSchema[];
  const hierarchy = getAdminLevelHierarchyFromLevel(level);
  return allLevels.filter((l) => getAdminLevelHierarchyFromLevel(l) < hierarchy);
}

/**
 * Helper function to get levels above a given level
 */
export function getLevelsAbove(level: AdminLevelSchema): AdminLevelSchema[] {
  const allLevels = [
    'junior',
    'senior',
    'expert',
    'lead',
    'manager',
    'director',
    'vice_president',
    'c_level',
    'executive',
  ] as AdminLevelSchema[];
  const hierarchy = getAdminLevelHierarchyFromLevel(level);
  return allLevels.filter((l) => getAdminLevelHierarchyFromLevel(l) > hierarchy);
}

/**
 * Helper function to get next level
 */
export function getNextLevel(level: AdminLevelSchema): AdminLevelSchema | null {
  const allLevels = [
    'junior',
    'senior',
    'expert',
    'lead',
    'manager',
    'director',
    'vice_president',
    'c_level',
    'executive',
  ] as AdminLevelSchema[];
  const sorted = [...allLevels].sort(
    (a, b) => getAdminLevelHierarchyFromLevel(a) - getAdminLevelHierarchyFromLevel(b)
  );
  const index = sorted.indexOf(level);
  if (index === -1 || index === sorted.length - 1) {
    return null;
  }
  return sorted[index + 1];
}

/**
 * Helper function to get previous level
 */
export function getPreviousLevel(level: AdminLevelSchema): AdminLevelSchema | null {
  const allLevels = [
    'junior',
    'senior',
    'expert',
    'lead',
    'manager',
    'director',
    'vice_president',
    'c_level',
    'executive',
  ] as AdminLevelSchema[];
  const sorted = [...allLevels].sort(
    (a, b) => getAdminLevelHierarchyFromLevel(a) - getAdminLevelHierarchyFromLevel(b)
  );
  const index = sorted.indexOf(level);
  if (index <= 0) {
    return null;
  }
  return sorted[index - 1];
}

/**
 * Get all admin level options for dropdown
 */
export function getAdminLevelOptions(): Array<{
  value: AdminLevelSchema;
  label: string;
  hierarchy: number;
}> {
  const allLevels = [
    'junior',
    'senior',
    'expert',
    'lead',
    'manager',
    'director',
    'vice_president',
    'c_level',
    'executive',
  ] as AdminLevelSchema[];
  return allLevels.map((level) => ({
    value: level,
    label: getAdminLevelLabelFromLevel(level),
    hierarchy: getAdminLevelHierarchyFromLevel(level),
  }));
}

/**
 * Get recommended level based on role
 */
export function getRecommendedLevelForRole(role: string): AdminLevelSchema {
  const roleLevelMap: Record<string, AdminLevelSchema> = {
    super_admin: 'executive',
    admin: 'director',
    manager: 'manager',
    moderator: 'senior',
    editor: 'senior',
    viewer: 'junior',
    support_agent: 'junior',
    developer: 'expert',
    devops: 'expert',
    security_admin: 'lead',
    compliance_officer: 'manager',
    auditor: 'senior',
    analyst: 'senior',
    accountant: 'senior',
    hr_admin: 'manager',
    vendor_manager: 'manager',
    product_manager: 'manager',
    order_manager: 'manager',
    payment_manager: 'manager',
  };
  return roleLevelMap[role] || 'junior';
}

/**
 * Export schemas as an object for convenient access
 */
export const adminLevelSchemas = {
  level: adminLevelSchema,
  hierarchy: adminLevelHierarchySchema,
  experience: adminLevelExperienceSchema,
  label: adminLevelLabelSchema,
  color: adminLevelColorSchema,
  permissionMultiplier: adminLevelPermissionMultiplierSchema,
  salaryRange: adminLevelSalaryRangeSchema,
  withMetadata: adminLevelWithMetadataSchema,
  getHierarchy: getAdminLevelHierarchyFromLevel,
  getExperience: getAdminLevelExperienceFromLevel,
  getLabel: getAdminLevelLabelFromLevel,
  getColor: getAdminLevelColorFromLevel,
  getMultiplier: getAdminLevelPermissionMultiplierFromLevel,
  getSalaryRange: getAdminLevelSalaryRangeFromLevel,
  getByExperience: getAdminLevelByExperience,
  hasHigherAuthority: hasHigherLevelAuthority,
  meetsMinimum: meetsMinimumLevel,
  getBelow: getLevelsBelow,
  getAbove: getLevelsAbove,
  getNext: getNextLevel,
  getPrevious: getPreviousLevel,
  getOptions: getAdminLevelOptions,
  getRecommendedForRole: getRecommendedLevelForRole,
};

export default adminLevelSchemas;

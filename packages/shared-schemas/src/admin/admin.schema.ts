/**
 * Admin Schema
 * Zod schemas for core admin entity and configuration
 */

import { z } from 'zod';
import {
  idSchema,
  emailSchema,
  timestampSchema,
  urlSchema,
  nullable,
  optional,
  stringWithLength,
} from '../common/core-primitives.schema';
import { adminRoleSchema } from './admin-role.schema';
import { adminDepartmentSchema } from './admin-department.schema';
import { adminLevelSchema } from './admin-level.schema';
import { adminTypeSchema } from './admin-type.schema';
import { adminPermissionStringSchema } from './admin-permission.schema';

/**
 * Admin status enum schema (from constants) - renamed to avoid conflict
 */
export const adminStatusEnumSchema = z.enum([
  'active',
  'inactive',
  'pending',
  'suspended',
  'deleted',
  'archived',
  'verified',
  'unverified',
  'locked',
  'unlocked',
  'blocked',
  'enabled',
  'disabled',
]);

/**
 * Admin configuration schema
 */
export const adminConfigSchema = z.object({
  defaultRole: adminRoleSchema.default('admin'),
  defaultStatus: adminStatusEnumSchema.default('active'),
  maxLoginAttempts: z.number().int().positive().default(5),
  sessionTimeout: z.number().int().positive().default(28800),
  passwordResetExpiry: z.number().int().positive().default(3600),
  otpExpiry: z.number().int().positive().default(300),
  mfaDefaultEnabled: z.boolean().default(false),
  maxConcurrentSessions: z.number().int().positive().default(3),
  auditLogRetention: z.number().int().positive().default(90),
  activityLogRetention: z.number().int().positive().default(30),
  sessionLogRetention: z.number().int().positive().default(30),
});

/**
 * Admin entity schema (full admin object)
 */
export const adminSchema = z.object({
  id: idSchema,
  email: emailSchema,
  name: stringWithLength(2, 100),
  role: adminRoleSchema,
  status: adminStatusEnumSchema,
  level: adminLevelSchema,
  type: adminTypeSchema,
  department: adminDepartmentSchema,
  permissions: z.array(adminPermissionStringSchema).default([]),
  isVerified: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  isMfaEnabled: z.boolean().default(false),
  avatar: nullable(urlSchema).default(null),
  phone: nullable(stringWithLength(11, 15)).default(null),
  lastLoginAt: nullable(timestampSchema).default(null),
  lastPasswordChangeAt: nullable(timestampSchema).default(null),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin create data schema (for creating new admin)
 */
export const adminCreateDataSchema = z.object({
  email: emailSchema,
  name: stringWithLength(2, 100),
  role: optional(adminRoleSchema),
  type: optional(adminTypeSchema),
  department: optional(adminDepartmentSchema),
  level: optional(adminLevelSchema),
  password: stringWithLength(8, 100),
  phone: optional(stringWithLength(11, 15)),
  avatar: optional(urlSchema),
});

/**
 * Admin update data schema (for updating existing admin)
 */
export const adminUpdateDataSchema = z.object({
  name: optional(stringWithLength(2, 100)),
  role: optional(adminRoleSchema),
  status: optional(adminStatusEnumSchema),
  level: optional(adminLevelSchema),
  type: optional(adminTypeSchema),
  department: optional(adminDepartmentSchema),
  phone: optional(stringWithLength(11, 15)),
  avatar: optional(urlSchema),
  permissions: optional(z.array(adminPermissionStringSchema)),
  isMfaEnabled: optional(z.boolean()),
});

/**
 * Admin filter parameters schema
 */
export const adminFilterParamsSchema = z.object({
  role: optional(z.union([adminRoleSchema, z.array(adminRoleSchema)])),
  status: optional(z.union([adminStatusEnumSchema, z.array(adminStatusEnumSchema)])),
  level: optional(z.union([adminLevelSchema, z.array(adminLevelSchema)])),
  type: optional(z.union([adminTypeSchema, z.array(adminTypeSchema)])),
  department: optional(z.union([adminDepartmentSchema, z.array(adminDepartmentSchema)])),
  isVerified: optional(z.boolean()),
  isMfaEnabled: optional(z.boolean()),
  isLocked: optional(z.boolean()),
  search: optional(stringWithLength(1, 100)),
  dateRange: optional(
    z.object({
      start: optional(timestampSchema),
      end: optional(timestampSchema),
    })
  ),
});

/**
 * Admin statistics schema
 */
export const adminStatisticsSchema = z.object({
  totalAdmins: z.number().int().min(0),
  roleCounts: z.record(z.string(), z.number().int().min(0)),
  statusCounts: z.record(z.string(), z.number().int().min(0)),
  levelCounts: z.record(z.string(), z.number().int().min(0)),
  departmentCounts: z.record(z.string(), z.number().int().min(0)),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  averageMonthlyCreation: z.number().min(0),
  latestAdmin: nullable(adminSchema),
});

/**
 * Admin login result schema
 */
export const adminLoginResultSchema = z.object({
  success: z.boolean(),
  admin: optional(adminSchema),
  accessToken: optional(z.string()),
  refreshToken: optional(z.string()),
  error: optional(z.string()),
  mfaRequired: optional(z.boolean()),
  mfaSessionId: optional(z.string()),
});

/**
 * Type inference from schemas
 */
export type AdminSchema = z.infer<typeof adminSchema>;
export type AdminStatusSchema = z.infer<typeof adminStatusEnumSchema>;
export type AdminCreateDataSchema = z.infer<typeof adminCreateDataSchema>;
export type AdminUpdateDataSchema = z.infer<typeof adminUpdateDataSchema>;
export type AdminConfigSchema = z.infer<typeof adminConfigSchema>;
export type AdminFilterParamsSchema = z.infer<typeof adminFilterParamsSchema>;
export type AdminStatisticsSchema = z.infer<typeof adminStatisticsSchema>;
export type AdminLoginResultSchema = z.infer<typeof adminLoginResultSchema>;

/**
 * Helper function to check if admin is active
 */
export function isAdminActive(admin: AdminSchema): boolean {
  return admin.status === 'active' && !admin.isLocked && !admin.deletedAt;
}

/**
 * Helper function to check if admin has full access
 */
export function adminHasFullAccess(admin: AdminSchema): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

/**
 * Helper function to check if admin can manage other admins
 */
export function adminCanManageAdmins(admin: AdminSchema): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

/**
 * Helper function to get admin display name
 */
export function getAdminDisplayName(admin: AdminSchema): string {
  return admin.name || admin.email || '';
}

/**
 * Helper function to create admin statistics
 */
export function createAdminStatistics(
  admins: AdminSchema[],
  period: { start: Date; end: Date }
): AdminStatisticsSchema {
  const stats: AdminStatisticsSchema = {
    totalAdmins: admins.length,
    roleCounts: {},
    statusCounts: {},
    levelCounts: {},
    departmentCounts: {},
    typeCounts: {},
    averageMonthlyCreation: 0,
    latestAdmin: null,
  };

  admins.forEach((admin) => {
    const role = admin.role as string;
    const status = admin.status as string;
    const level = admin.level as string;
    const department = admin.department as string;
    const type = admin.type as string;

    stats.roleCounts[role] = (stats.roleCounts[role] || 0) + 1;
    stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;
    stats.levelCounts[level] = (stats.levelCounts[level] || 0) + 1;
    stats.departmentCounts[department] = (stats.departmentCounts[department] || 0) + 1;
    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
  });

  if (admins.length > 0) {
    stats.latestAdmin = admins.reduce((latest, current) => {
      return current.createdAt > latest.createdAt ? current : latest;
    });
  }

  const daysDiff = (period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24);
  const months = daysDiff / 30;
  stats.averageMonthlyCreation = months > 0 ? admins.length / months : admins.length;

  return stats;
}

/**
 * Export schemas as an object for convenient access
 */
export const adminSchemas = {
  admin: adminSchema,
  adminCreate: adminCreateDataSchema,
  adminUpdate: adminUpdateDataSchema,
  adminConfig: adminConfigSchema,
  adminFilter: adminFilterParamsSchema,
  adminStatistics: adminStatisticsSchema,
  adminLoginResult: adminLoginResultSchema,
  status: adminStatusEnumSchema,
  isActive: isAdminActive,
  hasFullAccess: adminHasFullAccess,
  canManageAdmins: adminCanManageAdmins,
  getDisplayName: getAdminDisplayName,
  createStatistics: createAdminStatistics,
};

export default adminSchemas;

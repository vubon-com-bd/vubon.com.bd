/**
 * Admin Department Types
 * Type definitions for admin departments based on shared-constants
 * @module AdminDepartmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin department
// ============================================================
import {
  // Core Department Constants
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  ADMIN_TECH_DEPARTMENTS,
  ADMIN_BUSINESS_DEPARTMENTS,
  ADMIN_SUPPORT_DEPARTMENTS,
  // Core Department Types
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
  // Core Department Functions
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isAdminTechDepartment,
  isAdminBusinessDepartment,
  isAdminSupportDepartment,
  getAdminDepartments,
} from '@vubon/shared-constants';

// ============================================================
// Admin Department Extended Types
// ============================================================

/**
 * Admin department with additional metadata
 */
export interface AdminDepartmentExtended extends BaseEntity, Timestamp {
  id: ID;
  type: AdminDepartmentType;
  label: AdminDepartmentLabel;
  description: AdminDepartmentDescription;
  headCount: AdminDepartmentHeadCount;
  budget: AdminDepartmentBudget;
  isTech: boolean;
  isBusiness: boolean;
  isSupport: boolean;
  leadAdminId?: ID;
  memberIds: ID[];
  memberCount: number;
  teams: AdminDepartmentType[];
  subDepartments?: AdminDepartmentType[];
  parentDepartment?: AdminDepartmentType;
  metadata?: Metadata;
}

/**
 * Admin department member
 */
export interface AdminDepartmentMember extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  departmentType: AdminDepartmentType;
  role: 'head' | 'member' | 'observer';
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  responsibilities: string[];
  metadata?: Metadata;
}

/**
 * Admin department filter
 */
export interface AdminDepartmentFilter {
  types?: AdminDepartmentType[];
  labels?: AdminDepartmentLabel[];
  isTech?: boolean;
  isBusiness?: boolean;
  isSupport?: boolean;
  hasMember?: ID;
  headCountRange?: {
    min: number;
    max: number;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Admin department statistics
 */
export interface AdminDepartmentStatistics {
  totalDepartments: number;
  techDepartments: number;
  businessDepartments: number;
  supportDepartments: number;
  totalMembers: number;
  totalBudget: number;
  averageMembersPerDepartment: number;
  largestDepartment: AdminDepartmentType;
  highestBudgetDepartment: AdminDepartmentType;
  byType: Record<AdminDepartmentType, number>;
  byMemberCount: Record<AdminDepartmentType, number>;
  byBudget: Record<AdminDepartmentType, number>;
  departmentDistribution: {
    type: AdminDepartmentType;
    count: number;
    members: number;
    budget: number;
  }[];
}

/**
 * Admin department summary
 */
export interface AdminDepartmentSummary {
  total: number;
  tech: number;
  business: number;
  support: number;
  totalMembers: number;
  totalBudget: number;
  averageMembers: number;
  averageBudget: number;
  departments: {
    type: AdminDepartmentType;
    label: string;
    memberCount: number;
    budget: number;
    isTech: boolean;
    isBusiness: boolean;
    isSupport: boolean;
  }[];
}

/**
 * Admin department configuration
 */
export interface AdminDepartmentConfiguration {
  enabled: boolean;
  maxMembersPerDepartment: number;
  requireHead: boolean;
  allowMultipleMemberships: boolean;
  budgetTrackingEnabled: boolean;
  headCountTrackingEnabled: boolean;
  notificationOnJoin: boolean;
  notificationOnLeave: boolean;
  notificationOnHeadChange: boolean;
  departmentCreationRequiresApproval: boolean;
}

/**
 * Admin department history
 */
export interface AdminDepartmentHistory extends BaseEntity, Timestamp {
  id: ID;
  departmentType: AdminDepartmentType;
  adminId: ID;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'join'
    | 'leave'
    | 'head_change'
    | 'budget_update'
    | 'headcount_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Admin department budget allocation
 */
export interface AdminDepartmentBudgetAllocation extends BaseEntity, Timestamp {
  id: ID;
  departmentType: AdminDepartmentType;
  fiscalYear: string;
  allocatedBudget: number;
  spentBudget: number;
  remainingBudget: number;
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * Admin department headcount planning
 */
export interface AdminDepartmentHeadcountPlanning extends BaseEntity, Timestamp {
  id: ID;
  departmentType: AdminDepartmentType;
  fiscalYear: string;
  currentHeadcount: number;
  plannedHeadcount: number;
  approvedHeadcount: number;
  openPositions: number;
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * Admin department report
 */
export interface AdminDepartmentReport extends BaseEntity, Timestamp {
  id: ID;
  generatedBy: ID;
  period: {
    start: Date;
    end: Date;
  };
  summary: AdminDepartmentSummary;
  statistics: AdminDepartmentStatistics;
  departmentDetails: AdminDepartmentExtended[];
  budgetAllocations: AdminDepartmentBudgetAllocation[];
  headcountPlanning: AdminDepartmentHeadcountPlanning[];
  recommendations?: string[];
  format: 'json' | 'csv' | 'pdf';
  metadata?: Metadata;
}

/**
 * Admin department export
 */
export interface AdminDepartmentExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminDepartmentFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  ADMIN_TECH_DEPARTMENTS,
  ADMIN_BUSINESS_DEPARTMENTS,
  ADMIN_SUPPORT_DEPARTMENTS,
  // Core Types
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
  // Core Functions
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isAdminTechDepartment,
  isAdminBusinessDepartment,
  isAdminSupportDepartment,
  getAdminDepartments,
};

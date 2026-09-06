/**
 * Admin Level Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-level.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_LEVELS = {
  // Base types from common
  ...TYPES,

  // Admin levels
  LEVEL_1: 'level_1',
  LEVEL_2: 'level_2',
  LEVEL_3: 'level_3',
  LEVEL_4: 'level_4',
  LEVEL_5: 'level_5',
  LEVEL_6: 'level_6',
  LEVEL_7: 'level_7',
  LEVEL_8: 'level_8',
  LEVEL_9: 'level_9',
  LEVEL_10: 'level_10',

  // Admin level labels
  LABELS: {
    LEVEL_1: 'Junior Admin',
    LEVEL_2: 'Admin',
    LEVEL_3: 'Senior Admin',
    LEVEL_4: 'Lead Admin',
    LEVEL_5: 'Manager',
    LEVEL_6: 'Senior Manager',
    LEVEL_7: 'Director',
    LEVEL_8: 'Senior Director',
    LEVEL_9: 'VP',
    LEVEL_10: 'Executive',
  } as const,

  // Admin level permissions
  PERMISSIONS: {
    LEVEL_1: ['basic_access', 'view_only'],
    LEVEL_2: ['basic_access', 'view', 'create', 'update'],
    LEVEL_3: ['basic_access', 'view', 'create', 'update', 'delete', 'approve'],
    LEVEL_4: ['basic_access', 'view', 'create', 'update', 'delete', 'approve', 'reject'],
    LEVEL_5: ['basic_access', 'view', 'create', 'update', 'delete', 'approve', 'reject', 'manage'],
    LEVEL_6: [
      'basic_access',
      'view',
      'create',
      'update',
      'delete',
      'approve',
      'reject',
      'manage',
      'admin',
    ],
    LEVEL_7: [
      'basic_access',
      'view',
      'create',
      'update',
      'delete',
      'approve',
      'reject',
      'manage',
      'admin',
      'system',
    ],
    LEVEL_8: [
      'basic_access',
      'view',
      'create',
      'update',
      'delete',
      'approve',
      'reject',
      'manage',
      'admin',
      'system',
      'audit',
    ],
    LEVEL_9: [
      'basic_access',
      'view',
      'create',
      'update',
      'delete',
      'approve',
      'reject',
      'manage',
      'admin',
      'system',
      'audit',
      'security',
    ],
    LEVEL_10: [
      'basic_access',
      'view',
      'create',
      'update',
      'delete',
      'approve',
      'reject',
      'manage',
      'admin',
      'system',
      'audit',
      'security',
      'super',
    ],
  } as const,

  // Admin level requirements
  REQUIREMENTS: {
    LEVEL_1: {
      min_experience_years: 0,
      required_education: 'high_school',
      required_training: false,
      supervision_level: 'none',
    },
    LEVEL_2: {
      min_experience_years: 1,
      required_education: 'bachelor',
      required_training: true,
      supervision_level: 'self',
    },
    LEVEL_3: {
      min_experience_years: 3,
      required_education: 'bachelor',
      required_training: true,
      supervision_level: 'junior',
    },
    LEVEL_4: {
      min_experience_years: 5,
      required_education: 'master',
      required_training: true,
      supervision_level: 'team',
    },
    LEVEL_5: {
      min_experience_years: 7,
      required_education: 'master',
      required_training: true,
      supervision_level: 'department',
    },
    LEVEL_6: {
      min_experience_years: 10,
      required_education: 'master',
      required_training: true,
      supervision_level: 'multiple_departments',
    },
    LEVEL_7: {
      min_experience_years: 12,
      required_education: 'master_or_phd',
      required_training: true,
      supervision_level: 'division',
    },
    LEVEL_8: {
      min_experience_years: 15,
      required_education: 'phd_or_equivalent',
      required_training: true,
      supervision_level: 'organization',
    },
    LEVEL_9: {
      min_experience_years: 18,
      required_education: 'phd_or_equivalent',
      required_training: true,
      supervision_level: 'enterprise',
    },
    LEVEL_10: {
      min_experience_years: 20,
      required_education: 'phd_or_equivalent',
      required_training: true,
      supervision_level: 'global',
    },
  } as const,

  // Admin level benefits
  BENEFITS: {
    LEVEL_1: {
      salary_range: [20000, 30000],
      bonus_percentage: 5,
      leave_days: 14,
      insurance: 'basic',
    },
    LEVEL_2: {
      salary_range: [30000, 50000],
      bonus_percentage: 10,
      leave_days: 18,
      insurance: 'standard',
    },
    LEVEL_3: {
      salary_range: [50000, 80000],
      bonus_percentage: 15,
      leave_days: 21,
      insurance: 'premium',
    },
    LEVEL_4: {
      salary_range: [80000, 120000],
      bonus_percentage: 20,
      leave_days: 24,
      insurance: 'premium_plus',
    },
    LEVEL_5: {
      salary_range: [120000, 180000],
      bonus_percentage: 25,
      leave_days: 28,
      insurance: 'executive',
    },
    LEVEL_6: {
      salary_range: [180000, 250000],
      bonus_percentage: 30,
      leave_days: 30,
      insurance: 'executive_plus',
    },
    LEVEL_7: {
      salary_range: [250000, 350000],
      bonus_percentage: 35,
      leave_days: 32,
      insurance: 'director',
    },
    LEVEL_8: {
      salary_range: [350000, 500000],
      bonus_percentage: 40,
      leave_days: 35,
      insurance: 'director_plus',
    },
    LEVEL_9: {
      salary_range: [500000, 750000],
      bonus_percentage: 45,
      leave_days: 38,
      insurance: 'vp',
    },
    LEVEL_10: {
      salary_range: [750000, 1000000],
      bonus_percentage: 50,
      leave_days: 42,
      insurance: 'executive',
    },
  } as const,
} as const;

export type AdminLevel = keyof typeof ADMIN_LEVELS.LABELS;
export type AdminLevelPermission =
  (typeof ADMIN_LEVELS.PERMISSIONS)[keyof typeof ADMIN_LEVELS.PERMISSIONS];

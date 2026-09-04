/**
 * Department Configuration
 * অ্যাডমিন ডিপার্টমেন্ট কনফিগারেশন
 */

import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';

export interface DepartmentConfig {
  enabled: boolean;
  departments: string[];
  statuses: string[];
  defaultStatus: string;
  maxMembersPerDepartment: number;
  maxDepartmentsPerAdmin: number;
  hierarchy: {
    enabled: boolean;
    maxLevels: number;
  };
}

export const createDepartmentConfig = (): DepartmentConfig => ({
  enabled: true,
  departments: Object.values(ADMIN_DEPARTMENT.DEPARTMENTS),
  statuses: ['active', 'inactive'],
  defaultStatus: 'active',
  maxMembersPerDepartment: 50,
  maxDepartmentsPerAdmin: 3,
  hierarchy: {
    enabled: true,
    maxLevels: 5,
  },
});

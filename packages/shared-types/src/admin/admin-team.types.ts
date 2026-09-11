import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';
import { AdminPublic } from './admin.types';

/**
 * Admin team status and department values
 */
export type AdminTeamStatus = (typeof STATUS)[keyof typeof STATUS];
export type AdminTeamDepartment = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];

/**
 * Admin team interface
 */
export interface AdminTeam extends BaseEntity {
  teamId: string;
  name: string;
  description: string;
  leadId: string;
  lead: AdminPublic;
  members: AdminPublic[];
  status: AdminTeamStatus;
  department: AdminTeamDepartment;
}

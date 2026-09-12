import { BaseEntity } from '../common/base.types';
import { ADMIN_TEAM_STATUS } from '@vubon/shared-constants/src/admin/admin-status.constants';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';

/**
 * Admin team status — from ADMIN_TEAM_STATUS (flat enum, no nested objects).
 */
export type AdminTeamStatus = (typeof ADMIN_TEAM_STATUS)[keyof typeof ADMIN_TEAM_STATUS];

/**
 * Admin team department value
 */
export type AdminTeamDepartment = (typeof ADMIN_DEPARTMENT)[keyof typeof ADMIN_DEPARTMENT];

/**
 * Admin team interface
 */
export interface AdminTeam extends BaseEntity {
  teamId: string;
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  status: AdminTeamStatus;
  department: AdminTeamDepartment;
}

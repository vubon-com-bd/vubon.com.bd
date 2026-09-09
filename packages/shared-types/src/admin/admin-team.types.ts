import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { Admin } from './admin.types';

/**
 * Admin team interface
 */
export interface AdminTeam extends BaseEntity {
  teamId: string;
  name: string;
  description: string;
  leadId: string;
  lead: Admin;
  members: Admin[];
  status: keyof typeof STATUS;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

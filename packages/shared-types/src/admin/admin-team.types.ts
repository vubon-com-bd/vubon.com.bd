import { STATUS } from '@vubon/shared-constants';
import { Admin } from './admin.types';

export interface AdminTeam {
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

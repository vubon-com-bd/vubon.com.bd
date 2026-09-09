import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { LEAD_STATUS } from '@vubon/shared-constants/src/marketing/lead-status.constants';
import { LeadSource } from './lead-source.types';

export interface LeadGeneration extends BaseEntity {
  leadId: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  status: keyof typeof LEAD_STATUS | string;
  source: LeadSource;
  score: number;
  interest: string[];
  budget?: number;
  company?: string;
  position?: string;
  assignedTo?: string;
  assignedToUser?: User;
  convertedToUserId?: string;
  convertedToUser?: User;
  convertedAt?: Date;
  lostAt?: Date;
  lostReason?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

import { BaseEntity } from '../common/base.types';
import { SUPPORT_TEAM } from '@vubon/shared-constants/src/support/support-team.constants';
import { SupportAgent } from './support-agent.types';

export interface SupportTeam extends BaseEntity {
  teamId: string;
  name: string;
  description?: string;
  status: keyof typeof SUPPORT_TEAM.STATUS | string;
  type: keyof typeof SUPPORT_TEAM.TYPES | string;
  leadId: string;
  lead: SupportAgent;
  members: SupportAgent[];
  memberCount: number;
  minSize: number;
  maxSize: number;
  shiftRotationDays: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

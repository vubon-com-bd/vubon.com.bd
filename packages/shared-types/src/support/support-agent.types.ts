import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { SUPPORT_AGENT } from '@vubon/shared-constants/src/support/support-agent.constants';
import { SupportTeam } from './support-team.types';

export interface SupportAgent extends BaseEntity {
  agentId: string;
  userId: string;
  user: User;
  status: keyof typeof SUPPORT_AGENT.STATUS | string;
  role: keyof typeof SUPPORT_AGENT.ROLES | string;
  type: keyof typeof SUPPORT_AGENT.AGENT_TYPES | string;
  teamId?: string;
  team?: SupportTeam;
  skills: string[];
  languages: string[];
  timezone: string;
  shiftStart: string;
  shiftEnd: string;
  maxTickets: number;
  maxChats: number;
  currentTickets: number;
  currentChats: number;
  totalResolved: number;
  averageRating: number;
  satisfactionScore: number;
  isAvailable: boolean;
  isOnDuty: boolean;
  isOnLeave: boolean;
  metadata: Record<string, unknown>;
}

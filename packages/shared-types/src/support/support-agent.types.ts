/**
 * Support Agent Types
 * @module shared-types/support
 */

import type {
  SUPPORT_AGENT_STATUS,
  SUPPORT_AGENT_LEVEL,
  SUPPORT_AGENT_SKILL,
} from '@vubon/shared-constants/support';
import type { UserId } from '../common/primitives';

export type SupportAgentStatusValue =
  (typeof SUPPORT_AGENT_STATUS)[keyof typeof SUPPORT_AGENT_STATUS];

export type SupportAgentLevelValue = (typeof SUPPORT_AGENT_LEVEL)[keyof typeof SUPPORT_AGENT_LEVEL];

export type SupportAgentSkillValue = (typeof SUPPORT_AGENT_SKILL)[keyof typeof SUPPORT_AGENT_SKILL];

export interface SupportAgent {
  readonly userId: UserId;
  readonly name: string;
  readonly email: string;
  readonly status: SupportAgentStatusValue;
  readonly level: SupportAgentLevelValue;
  readonly skills: readonly SupportAgentSkillValue[];
  readonly teamIds: readonly string[];
  readonly languages: readonly string[];
  readonly activeTicketCount: number;
  readonly activeChatCount: number;
  readonly maxConcurrentTickets: number;
  readonly maxConcurrentChats: number;
  readonly resolvedToday: number;
  readonly averageResolutionMinutes: number;
  readonly satisfactionScore: number;
  readonly lastActiveAt: string;
  readonly isAvailable: boolean;
}

export interface SupportAgentPublic {
  readonly userId: UserId;
  readonly name: string;
  readonly status: SupportAgentStatusValue;
  readonly level: SupportAgentLevelValue;
  readonly isAvailable: boolean;
}

export interface SupportAgentAvailability {
  readonly userId: UserId;
  readonly isOnline: boolean;
  readonly status: SupportAgentStatusValue;
  readonly activeTicketCount: number;
  readonly canAcceptNewTicket: boolean;
  readonly checkedAt: string;
}

/**
 * Support Team Types
 * @module shared-types/support
 */

import type {
  SUPPORT_TEAM_TYPE,
  SUPPORT_TEAM_STATUS,
  SUPPORT_TEAM_ROUTING,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type SupportTeamTypeValue = (typeof SUPPORT_TEAM_TYPE)[keyof typeof SUPPORT_TEAM_TYPE];

export type SupportTeamStatusValue = (typeof SUPPORT_TEAM_STATUS)[keyof typeof SUPPORT_TEAM_STATUS];

export type SupportTeamRoutingValue =
  (typeof SUPPORT_TEAM_ROUTING)[keyof typeof SUPPORT_TEAM_ROUTING];

export interface SupportTeam extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportTeamTypeValue;
  readonly status: SupportTeamStatusValue;
  readonly routing: SupportTeamRoutingValue;
  readonly leaderId?: UserId;
  readonly memberIds: readonly UserId[];
  readonly skills: readonly string[];
  readonly categories: readonly string[];
  readonly maxTickets: number;
  readonly activeTicketCount: number;
  readonly isDefault: boolean;
}

export interface SupportTeamPublic {
  readonly id: string;
  readonly name: string;
  readonly type: SupportTeamTypeValue;
  readonly status: SupportTeamStatusValue;
  readonly memberCount: number;
  readonly activeTicketCount: number;
}

export interface SupportTeamMembership {
  readonly teamId: string;
  readonly userId: UserId;
  readonly isLeader: boolean;
  readonly joinedAt: string;
  readonly leftAt?: string;
}

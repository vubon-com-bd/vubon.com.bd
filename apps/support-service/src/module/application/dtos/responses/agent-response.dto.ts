/**
 * AgentResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportAgentStatusValue,
  SupportAgentLevelValue,
  SupportAgentSkillValue,
} from '@vubon/shared-types/support';

export interface AgentResponseDTO {
  readonly id: string;
  readonly userId: string;
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

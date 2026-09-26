/**
 * UpdateAgentRequestDTO
 * @module support-service/application/dtos/requests/agent
 */
import type {
  SupportAgentLevelValue,
  SupportAgentSkillValue,
} from '@vubon/shared-types/support';

export interface UpdateAgentRequestDTO {
  readonly agentId: string;
  readonly name?: string;
  readonly level?: SupportAgentLevelValue;
  readonly skills?: readonly SupportAgentSkillValue[];
  readonly languages?: readonly string[];
  readonly maxConcurrentTickets?: number;
}

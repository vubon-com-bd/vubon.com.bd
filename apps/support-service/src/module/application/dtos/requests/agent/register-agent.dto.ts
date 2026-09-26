/**
 * RegisterAgentRequestDTO
 * @module support-service/application/dtos/requests/agent
 */
import type {
  SupportAgentLevelValue,
  SupportAgentSkillValue,
} from '@vubon/shared-types/support';

export interface RegisterAgentRequestDTO {
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly level: SupportAgentLevelValue;
  readonly skills?: readonly SupportAgentSkillValue[];
  readonly teamIds?: readonly string[];
  readonly languages?: readonly string[];
  readonly maxConcurrentTickets?: number;
  readonly maxConcurrentChats?: number;
}

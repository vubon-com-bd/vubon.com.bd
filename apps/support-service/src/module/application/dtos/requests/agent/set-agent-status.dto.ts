/**
 * SetAgentStatusRequestDTO
 * @module support-service/application/dtos/requests/agent
 */
import type { SupportAgentStatusValue } from '@vubon/shared-types/support';

export interface SetAgentStatusRequestDTO {
  readonly agentId: string;
  readonly status: SupportAgentStatusValue;
}

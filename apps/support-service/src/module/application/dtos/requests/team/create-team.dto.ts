/**
 * CreateTeamRequestDTO
 * @module support-service/application/dtos/requests/team
 */
import type {
  SupportTeamTypeValue,
  SupportTeamRoutingValue,
} from '@vubon/shared-types/support';

export interface CreateTeamRequestDTO {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportTeamTypeValue;
  readonly routing?: SupportTeamRoutingValue;
  readonly leaderId?: string;
  readonly skills?: readonly string[];
  readonly categories?: readonly string[];
  readonly maxTickets?: number;
}

/**
 * TeamResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportTeamTypeValue,
  SupportTeamStatusValue,
  SupportTeamRoutingValue,
} from '@vubon/shared-types/support';

export interface TeamResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: SupportTeamTypeValue;
  readonly status: SupportTeamStatusValue;
  readonly routing: SupportTeamRoutingValue;
  readonly leaderId?: string;
  readonly memberIds: readonly string[];
  readonly skills: readonly string[];
  readonly categories: readonly string[];
  readonly maxTickets: number;
  readonly activeTicketCount: number;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

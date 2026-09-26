/**
 * CreateSlaRequestDTO
 * @module support-service/application/dtos/requests/sla
 */
import type {
  SupportSlaMetricValue,
  TicketPriorityValue,
} from '@vubon/shared-types/support';

export interface CreateSlaRequestDTO {
  readonly ticketId: string;
  readonly metric: SupportSlaMetricValue;
  readonly targetMinutes: number;
  readonly priority: TicketPriorityValue;
  readonly warningThresholdPercent?: number;
}

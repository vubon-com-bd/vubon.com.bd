/**
 * SlaResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportSlaMetricValue,
  SupportSlaStatusValue,
  TicketPriorityValue,
} from '@vubon/shared-types/support';

export interface SlaResponseDTO {
  readonly id: string;
  readonly ticketId: string;
  readonly metric: SupportSlaMetricValue;
  readonly targetMinutes: number;
  readonly actualMinutes?: number;
  readonly status: SupportSlaStatusValue;
  readonly priority: TicketPriorityValue;
  readonly dueAt: string;
  readonly metAt?: string;
  readonly breachedAt?: string;
  readonly remainingMinutes?: number;
  readonly warningThresholdPercent?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

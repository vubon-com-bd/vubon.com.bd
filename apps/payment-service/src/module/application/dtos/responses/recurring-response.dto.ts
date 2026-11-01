/**
 * Recurring Payment Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { RecurringStatusValue } from '@domain/primitives/recurring-status.vo';
import type { RecurringIntervalValue } from '@domain/primitives/recurring-frequency.vo';

export interface RecurringResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly status: RecurringStatusValue;
  readonly interval: RecurringIntervalValue;
  readonly intervalCount: number;
  readonly amount: number;
  readonly currency: string;
  readonly startAt: string;
  readonly endAt?: string;
  readonly nextRunAt?: string;
  readonly attemptCount: number;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RecurringSummaryResponseDTO {
  readonly id: string;
  readonly status: RecurringStatusValue;
  readonly amount: number;
  readonly currency: string;
  readonly nextRunAt?: string;
}

export interface RecurringListResponseDTO {
  readonly items: readonly RecurringSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

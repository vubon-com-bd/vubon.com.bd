/**
 * CreateRecurringRequestDTO
 * @module payment-service/application/dtos/requests/recurring
 *
 * Creates a recurring payment schedule.
 */
import type {
  RecurringIntervalValue,
} from '@domain/primitives/recurring-frequency.vo';
import type { PaymentMethodValue } from '@vubon/shared-types/business/payment';

export interface CreateRecurringRequestDTO {
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly interval: RecurringIntervalValue;
  readonly intervalCount: number;
  readonly startAt: string;
  readonly endAt?: string;
  readonly method?: PaymentMethodValue;
  readonly gateway?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: string;
}

export interface CreateRecurringContextDTO {
  readonly request: CreateRecurringRequestDTO;
  readonly userId: string;
}

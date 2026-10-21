/**
 * IRecurringPaymentService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  CreateRecurringRequestDTO,
  PauseRecurringRequestDTO,
  CancelRecurringRequestDTO,
} from '@application/dtos/requests/recurring/index.js';
import type {
  RecurringResponseDTO,
  RecurringListResponseDTO,
} from '@application/dtos/responses/recurring-response.dto.js';

export const RECURRING_PAYMENT_SERVICE = Symbol('RECURRING_PAYMENT_SERVICE');

export interface RecurringListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly paymentId?: string;
    readonly status?: string;
    readonly interval?: string;
  };
}

export interface IRecurringPaymentService {
  create(dto: CreateRecurringRequestDTO, userId: string): Promise<RecurringResponseDTO>;
  pause(dto: PauseRecurringRequestDTO, actorId?: string): Promise<RecurringResponseDTO>;
  cancel(dto: CancelRecurringRequestDTO, actorId?: string): Promise<RecurringResponseDTO>;

  getById(id: string): Promise<RecurringResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly RecurringResponseDTO[]>;
  list(options: RecurringListOptionsDTO): Promise<RecurringListResponseDTO>;
}

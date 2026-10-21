/**
 * CreateSplitPaymentRequestDTO
 * @module payment-service/application/dtos/requests/split
 *
 * Split payment across 2+ receivers.
 * Validation: percentages must total 100 OR fixed amounts must equal total.
 */
import type { SplitTypeValue } from '@domain/primitives/split-type.vo';

export interface SplitReceiverInputDTO {
  readonly receiverId: string;
  readonly percentage?: number;
  readonly fixedAmount?: number;
}

export interface CreateSplitPaymentRequestDTO {
  readonly paymentId: string;
  readonly type: SplitTypeValue;
  readonly totalAmount: number;
  readonly currency: string;
  readonly receivers: readonly SplitReceiverInputDTO[];
  readonly idempotencyKey?: string;
}

export interface CreateSplitPaymentContextDTO {
  readonly request: CreateSplitPaymentRequestDTO;
  readonly actorId?: string;
}

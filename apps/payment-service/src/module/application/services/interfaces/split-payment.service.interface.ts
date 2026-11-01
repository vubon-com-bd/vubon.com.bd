/**
 * ISplitPaymentService — contract
 * @module payment-service/application/services/interfaces
 */
import type { CreateSplitPaymentRequestDTO } from '@application/dtos/requests/split/index.js';
import type {
  SplitResponseDTO,
  SplitListResponseDTO,
} from '@application/dtos/responses/split-response.dto.js';

export const SPLIT_PAYMENT_SERVICE = Symbol('SPLIT_PAYMENT_SERVICE');

export interface SplitListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly paymentId?: string;
    readonly type?: string;
    readonly receiverId?: string;
  };
}

export interface ISplitPaymentService {
  create(dto: CreateSplitPaymentRequestDTO, actorId?: string): Promise<SplitResponseDTO>;
  execute(splitId: string, actorId?: string): Promise<SplitResponseDTO>;

  getById(id: string): Promise<SplitResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly SplitResponseDTO[]>;
  list(options: SplitListOptionsDTO): Promise<SplitListResponseDTO>;
}

import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RefundEntity } from '../../../domain/entities/refund.entity';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';

export interface RefundServiceInterface
  extends BaseServiceInterface<RefundEntity, string> {
  listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]>;
  listPending(): Promise<readonly RefundResponseDTO[]>;
}

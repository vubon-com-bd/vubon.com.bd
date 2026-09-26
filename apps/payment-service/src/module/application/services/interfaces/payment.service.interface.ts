import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PaymentEntity } from '../../../domain/entities/payment.entity';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';

export interface PaymentServiceInterface
  extends BaseServiceInterface<PaymentEntity, string> {
  findById(paymentId: string): Promise<PaymentResponseDTO | null>;
  findByOrderId(orderId: string): Promise<readonly PaymentResponseDTO[]>;
  list(limit?: number): Promise<readonly PaymentResponseDTO[]>;
}

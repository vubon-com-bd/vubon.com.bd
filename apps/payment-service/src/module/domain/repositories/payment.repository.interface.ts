import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo';
import { GatewayReferenceVO } from '../value-objects/primitives/gateway-reference.vo';

export interface PaymentRepository extends BaseRepository<PaymentEntity, PaymentIdVO> {
  findByIdempotencyKey(key: IdempotencyKeyVO): Promise<PaymentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly PaymentEntity[]>;
  findByGatewayReference(ref: GatewayReferenceVO): Promise<PaymentEntity | null>;
}

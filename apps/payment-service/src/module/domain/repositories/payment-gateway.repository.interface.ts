import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PaymentGatewayEntity } from '../entities/payment-gateway.entity';

export interface PaymentGatewayRepository extends BaseRepository<PaymentGatewayEntity, string> {
  findByGateway(gateway: string): Promise<PaymentGatewayEntity | null>;
  findActive(): Promise<readonly PaymentGatewayEntity[]>;
}

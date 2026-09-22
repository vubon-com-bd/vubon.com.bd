import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PaymentGatewayEntity } from '../../../domain/entities/payment-gateway.entity';

export interface PaymentGatewayServiceInterface
  extends BaseServiceInterface<PaymentGatewayEntity, string> {
  pickGateway(method: string): string;
  isAvailable(gateway: string): Promise<boolean>;
}

import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PaymentGatewayServiceInterface } from '../interfaces/payment-gateway.service.interface';
import type { PaymentGatewayRepository } from '../../../domain/repositories/payment-gateway.repository.interface';
import { PaymentGatewayEntity } from '../../../domain/entities/payment-gateway.entity';
import { PaymentRoutingService } from '../../../domain/services/payment-routing.service';

@Injectable()
export class PaymentGatewayService
  extends BaseService<PaymentGatewayEntity, string>
  implements PaymentGatewayServiceInterface
{
  readonly name = 'PaymentGatewayService';

  constructor(
    @Inject('PaymentGatewayRepository')
    private readonly gatewayRepo: PaymentGatewayRepository,
    private readonly routingService: PaymentRoutingService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  pickGateway(method: string): string {
    return this.routingService.pickGateway(method);
  }

  async isAvailable(gateway: string): Promise<boolean> {
    const entity = await this.gatewayRepo.findByGateway(gateway);
    return entity !== null && entity.status === 'active';
  }
}

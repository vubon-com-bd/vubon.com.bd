import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PaymentServiceInterface } from '../interfaces/payment.service.interface';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { PaymentEntity } from '../../../domain/entities/payment.entity';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';

@Injectable()
export class PaymentService
  extends BaseService<PaymentEntity, string>
  implements PaymentServiceInterface
{
  readonly name = 'PaymentService';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findById(paymentId: string): Promise<PaymentResponseDTO | null> {
    const entity = await this.paymentRepo.findById(PaymentIdVO.create(paymentId));
    return entity ? this.toDTO(entity) : null;
  }

  async findByOrderId(orderId: string): Promise<readonly PaymentResponseDTO[]> {
    const entities = await this.paymentRepo.findByOrderId(OrderIdVO.create(orderId));
    return entities.map((e) => this.toDTO(e));
  }

  async list(limit = 20): Promise<readonly PaymentResponseDTO[]> {
    const entities = await this.paymentRepo.findAll();
    return entities.slice(0, limit).map((e) => this.toDTO(e));
  }

  private toDTO(entity: PaymentEntity): PaymentResponseDTO {
    return {
      success: true,
      payment: {
        id: entity.id.value,
        orderId: entity.orderId.value,
        status: entity.status.value,
        method: entity.type.value,
        gateway: entity.gateway?.value,
        amount: entity.amount.amount as never,
        currency: entity.currency.value,
        createdAt: entity.createdAt,
        capturedAt: entity.capturedAt?.toISOString(),
      },
    } as unknown as PaymentResponseDTO;
  }
}

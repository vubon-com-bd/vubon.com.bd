import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RefundServiceInterface } from '../interfaces/refund.service.interface';
import type { RefundRepository } from '../../../domain/repositories/refund.repository.interface';
import { RefundEntity } from '../../../domain/entities/refund.entity';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';

@Injectable()
export class RefundService
  extends BaseService<RefundEntity, string>
  implements RefundServiceInterface
{
  readonly name = 'RefundService';

  constructor(
    @Inject('RefundRepository')
    private readonly refundRepo: RefundRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]> {
    const entities = await this.refundRepo.findByPaymentId(PaymentIdVO.create(paymentId));
    return entities.map((e) => this.toDTO(e));
  }

  async listPending(): Promise<readonly RefundResponseDTO[]> {
    const entities = await this.refundRepo.findPending();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: RefundEntity): RefundResponseDTO {
    return {
      id: entity.id.value,
      status: entity.status.value,
      amount: entity.amount.amount as never,
      currency: entity.currency.value,
      reason: entity.reason ?? undefined,
      createdAt: entity.createdAt,
      processedAt: entity.processedAt?.toISOString(),
    } as unknown as RefundResponseDTO;
  }
}

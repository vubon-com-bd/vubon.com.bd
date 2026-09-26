import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TransactionServiceInterface } from '../interfaces/transaction.service.interface';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository.interface';
import { TransactionEntity } from '../../../domain/entities/transaction.entity';
import { TransactionIdVO } from '../../../domain/value-objects/primitives/transaction-id.vo';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto';

@Injectable()
export class TransactionService
  extends BaseService<TransactionEntity, string>
  implements TransactionServiceInterface
{
  readonly name = 'TransactionService';

  constructor(
    @Inject('TransactionRepository')
    private readonly txRepo: TransactionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]> {
    const entities = await this.txRepo.findByPaymentId(PaymentIdVO.create(paymentId));
    return entities.map((e) => this.toDTO(e));
  }

  async findById(transactionId: string): Promise<TransactionResponseDTO | null> {
    const entity = await this.txRepo.findById(TransactionIdVO.create(transactionId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: TransactionEntity): TransactionResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount.amount as never,
      currency: entity.currency.value,
      reference: entity.reference ?? undefined,
      createdAt: entity.createdAt,
    } as unknown as TransactionResponseDTO;
  }
}

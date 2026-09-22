import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import type { TransactionResponseDTO } from '../dtos/responses/transaction-response.dto';

@Injectable()
export class TransactionMapper {
  toResponse(entity: TransactionEntity): TransactionResponseDTO {
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

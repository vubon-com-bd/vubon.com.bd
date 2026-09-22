import { Injectable } from '@nestjs/common';
import { InvoiceEntity } from '../../domain/entities/invoice.entity';
import type { InvoiceResponseDTO } from '../dtos/responses/invoice-response.dto';

@Injectable()
export class InvoiceMapper {
  toResponse(entity: InvoiceEntity): InvoiceResponseDTO {
    return {
      id: entity.id.value,
      number: entity.number.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      dueAt: entity.dueAt?.toISOString(),
      paidAt: entity.paidAt?.toISOString(),
      createdAt: entity.createdAt,
    };
  }
}

import { Injectable } from '@nestjs/common';
import type { InvoiceResponseDTO } from '../../application/dtos/responses/invoice-response.dto';
import { InvoiceResponseDto } from '../dtos/responses/invoice.response.dto';

@Injectable()
export class InvoiceControllerMapper {
  toResponse(app: InvoiceResponseDTO): InvoiceResponseDto {
    return {
      id: app.id,
      number: app.number,
      status: app.status,
      amount: app.amount,
      currency: app.currency,
      dueAt: app.dueAt ?? undefined,
      paidAt: app.paidAt ?? undefined,
      createdAt: app.createdAt,
    };
  }
}

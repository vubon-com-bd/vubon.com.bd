import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { InvoiceEntity } from '../../../domain/entities/invoice.entity';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';

export interface InvoiceServiceInterface
  extends BaseServiceInterface<InvoiceEntity, string> {
  findById(invoiceId: string): Promise<InvoiceResponseDTO | null>;
  findOverdue(before: Date): Promise<readonly InvoiceResponseDTO[]>;
}

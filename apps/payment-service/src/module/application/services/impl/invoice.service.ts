import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { InvoiceServiceInterface } from '../interfaces/invoice.service.interface';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';
import { InvoiceEntity } from '../../../domain/entities/invoice.entity';
import { InvoiceIdVO } from '../../../domain/value-objects/primitives/invoice-id.vo';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';

@Injectable()
export class InvoiceService
  extends BaseService<InvoiceEntity, string>
  implements InvoiceServiceInterface
{
  readonly name = 'InvoiceService';

  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepo: InvoiceRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findById(invoiceId: string): Promise<InvoiceResponseDTO | null> {
    const entity = await this.invoiceRepo.findById(InvoiceIdVO.create(invoiceId));
    return entity ? this.toDTO(entity) : null;
  }

  async findOverdue(before: Date): Promise<readonly InvoiceResponseDTO[]> {
    const entities = await this.invoiceRepo.findOverdue(before);
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: InvoiceEntity): InvoiceResponseDTO {
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

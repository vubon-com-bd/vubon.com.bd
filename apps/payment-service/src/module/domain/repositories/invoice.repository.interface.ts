import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceIdVO } from '../value-objects/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '../value-objects/primitives/invoice-number.vo';

export interface InvoiceRepository extends BaseRepository<InvoiceEntity, InvoiceIdVO> {
  findByNumber(number: InvoiceNumberVO): Promise<InvoiceEntity | null>;
  findOverdue(before: Date): Promise<readonly InvoiceEntity[]>;
}

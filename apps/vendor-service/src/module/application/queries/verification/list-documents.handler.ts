import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDocumentsQuery } from './list-documents.query';
import type { VendorDocumentRepository } from '../../../domain/repositories/vendor-document.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface DocumentListItemDto {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly url: string;
  readonly expiresAt: string | null;
}

@QueryHandler(ListDocumentsQuery)
export class ListDocumentsHandler
  extends BaseQueryHandler<ListDocumentsQuery, readonly DocumentListItemDto[]>
  implements IQueryHandler<ListDocumentsQuery>
{
  readonly queryType = 'vendor.verification.list-documents';

  constructor(private readonly documentRepo: VendorDocumentRepository) {
    super();
  }

  async execute(query: ListDocumentsQuery): Promise<readonly DocumentListItemDto[]> {
    const docs = await this.documentRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return docs.map((d) => ({
      id: d.id.value,
      type: d.type.value,
      status: d.status.value,
      url: d.url.value,
      expiresAt: d.expiresAt?.toISOString() ?? null,
    }));
  }
}

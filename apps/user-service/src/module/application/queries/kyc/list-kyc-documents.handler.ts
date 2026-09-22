import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListKycDocumentsQuery } from './list-kyc-documents.query';

@QueryHandler(ListKycDocumentsQuery)
export class ListKycDocumentsHandler
  extends BaseQueryHandler<ListKycDocumentsQuery, readonly unknown[]>
  implements IQueryHandler<ListKycDocumentsQuery>
{
  readonly queryType = 'user.kyc.list-documents';

  async execute(query: ListKycDocumentsQuery): Promise<readonly unknown[]> {
    void query;
    return [];
  }
}

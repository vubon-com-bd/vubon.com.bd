import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPendingFulfillmentsQuery } from './list-pending-fulfillments.query';
import type { FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@QueryHandler(ListPendingFulfillmentsQuery)
export class ListPendingFulfillmentsHandler
  extends BaseQueryHandler<ListPendingFulfillmentsQuery, readonly FulfillmentResponseDTO[]>
  implements IQueryHandler<ListPendingFulfillmentsQuery>
{
  readonly queryType = 'logistics.fulfillment.list-pending';

  constructor(private readonly repo: FulfillmentRepository) {
    super();
  }

  async execute(_query: ListPendingFulfillmentsQuery): Promise<readonly FulfillmentResponseDTO[]> {
    const entities = await this.repo.findPending();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as FulfillmentResponseDTO));
  }
}

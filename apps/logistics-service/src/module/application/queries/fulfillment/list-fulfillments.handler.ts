import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListFulfillmentsQuery } from './list-fulfillments.query';
import type { FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository.interface';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@QueryHandler(ListFulfillmentsQuery)
export class ListFulfillmentsHandler
  extends BaseQueryHandler<ListFulfillmentsQuery, readonly FulfillmentResponseDTO[]>
  implements IQueryHandler<ListFulfillmentsQuery>
{
  readonly queryType = 'logistics.fulfillment.list';

  constructor(private readonly repo: FulfillmentRepository) {
    super();
  }

  async execute(query: ListFulfillmentsQuery): Promise<readonly FulfillmentResponseDTO[]> {
    const entities = query.orderId
      ? await this.repo.findByOrder(OrderIdVO.create(query.orderId))
      : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as FulfillmentResponseDTO));
  }
}

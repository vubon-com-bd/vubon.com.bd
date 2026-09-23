import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFulfillmentQuery } from './get-fulfillment.query';
import type { FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository.interface';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@QueryHandler(GetFulfillmentQuery)
export class GetFulfillmentHandler
  extends BaseQueryHandler<GetFulfillmentQuery, FulfillmentResponseDTO | null>
  implements IQueryHandler<GetFulfillmentQuery>
{
  readonly queryType = 'logistics.fulfillment.get';

  constructor(private readonly repo: FulfillmentRepository) {
    super();
  }

  async execute(query: GetFulfillmentQuery): Promise<FulfillmentResponseDTO | null> {
    const entity = await this.repo.findById(FulfillmentIdVO.create(query.fulfillmentId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as FulfillmentResponseDTO;
  }
}

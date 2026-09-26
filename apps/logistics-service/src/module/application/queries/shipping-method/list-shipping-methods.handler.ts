import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListShippingMethodsQuery } from './list-shipping-methods.query';
import type { ShippingMethodRepository } from '../../../domain/repositories/shipping-method.repository.interface';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

@QueryHandler(ListShippingMethodsQuery)
export class ListShippingMethodsHandler
  extends BaseQueryHandler<ListShippingMethodsQuery, readonly ShippingMethodResponseDTO[]>
  implements IQueryHandler<ListShippingMethodsQuery>
{
  readonly queryType = 'logistics.shipping-method.list';

  constructor(private readonly repo: ShippingMethodRepository) {
    super();
  }

  async execute(query: ListShippingMethodsQuery): Promise<readonly ShippingMethodResponseDTO[]> {
    const entities = query.activeOnly ? await this.repo.findActive() : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as ShippingMethodResponseDTO));
  }
}

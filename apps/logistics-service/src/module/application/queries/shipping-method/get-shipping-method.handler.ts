import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetShippingMethodQuery } from './get-shipping-method.query';
import type { ShippingMethodRepository } from '../../../domain/repositories/shipping-method.repository.interface';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

@QueryHandler(GetShippingMethodQuery)
export class GetShippingMethodHandler
  extends BaseQueryHandler<GetShippingMethodQuery, ShippingMethodResponseDTO | null>
  implements IQueryHandler<GetShippingMethodQuery>
{
  readonly queryType = 'logistics.shipping-method.get';

  constructor(private readonly repo: ShippingMethodRepository) {
    super();
  }

  async execute(query: GetShippingMethodQuery): Promise<ShippingMethodResponseDTO | null> {
    const entity = await this.repo.findById(query.methodId);
    if (!entity) return null;
    return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as ShippingMethodResponseDTO;
  }
}

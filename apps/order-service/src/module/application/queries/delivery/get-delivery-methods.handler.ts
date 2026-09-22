import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryMethodsQuery } from './get-delivery-methods.query';
import type { DeliveryMethodServiceInterface } from '../../services/interfaces/delivery-method.service.interface';
import type { DeliveryMethodEntity } from '../../../domain/entities/delivery-method.entity';

@QueryHandler(GetDeliveryMethodsQuery)
export class GetDeliveryMethodsHandler
  extends BaseQueryHandler<GetDeliveryMethodsQuery, readonly DeliveryMethodEntity[]>
  implements IQueryHandler<GetDeliveryMethodsQuery>
{
  readonly queryType = 'delivery.methods.list';

  constructor(private readonly methodService: DeliveryMethodServiceInterface) {
    super();
  }

  async execute(_query: GetDeliveryMethodsQuery): Promise<readonly DeliveryMethodEntity[]> {
    return this.methodService.listActive();
  }
}

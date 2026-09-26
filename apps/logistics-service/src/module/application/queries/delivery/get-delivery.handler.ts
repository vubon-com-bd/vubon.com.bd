import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryQuery } from './get-delivery.query';
import type { DeliveryRepository } from '../../../domain/repositories/delivery.repository.interface';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo';
import { DeliveryOperationFailedError } from '../../errors/delivery.errors';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(GetDeliveryQuery)
export class GetDeliveryHandler
  extends BaseQueryHandler<GetDeliveryQuery, DeliveryResponseDTO>
  implements IQueryHandler<GetDeliveryQuery>
{
  readonly queryType = 'logistics.delivery.get';

  constructor(private readonly repo: DeliveryRepository) {
    super();
  }

  async execute(query: GetDeliveryQuery): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findById(DeliveryIdVO.create(query.deliveryId));
    if (!entity) throw new DeliveryOperationFailedError('not found');
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DeliveryResponseDTO;
  }
}

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryAttemptsQuery } from './get-delivery-attempts.query';
import type { DeliveryAttemptRepository } from '../../../domain/repositories/delivery-attempt.repository.interface';
import type { DeliveryAttemptEntity } from '../../../domain/entities/delivery-attempt.entity';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo';

@QueryHandler(GetDeliveryAttemptsQuery)
export class GetDeliveryAttemptsHandler
  extends BaseQueryHandler<GetDeliveryAttemptsQuery, readonly DeliveryAttemptEntity[]>
  implements IQueryHandler<GetDeliveryAttemptsQuery>
{
  readonly queryType = 'logistics.delivery.get-attempts';

  constructor(private readonly repo: DeliveryAttemptRepository) {
    super();
  }

  async execute(query: GetDeliveryAttemptsQuery): Promise<readonly DeliveryAttemptEntity[]> {
    return this.repo.findByDelivery(DeliveryIdVO.create(query.deliveryId));
  }
}

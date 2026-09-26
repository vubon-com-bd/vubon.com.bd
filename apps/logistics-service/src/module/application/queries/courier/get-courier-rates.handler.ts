import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCourierRatesQuery } from './get-courier-rates.query';
import type { CourierRateRepository } from '../../../domain/repositories/courier-rate.repository.interface';
import type { CourierRateEntity } from '../../../domain/entities/courier-rate.entity';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo';

@QueryHandler(GetCourierRatesQuery)
export class GetCourierRatesHandler
  extends BaseQueryHandler<GetCourierRatesQuery, readonly CourierRateEntity[]>
  implements IQueryHandler<GetCourierRatesQuery>
{
  readonly queryType = 'logistics.courier.get-rates';

  constructor(private readonly repo: CourierRateRepository) {
    super();
  }

  async execute(query: GetCourierRatesQuery): Promise<readonly CourierRateEntity[]> {
    return this.repo.findByCourier(CourierIdVO.create(query.courierId));
  }
}

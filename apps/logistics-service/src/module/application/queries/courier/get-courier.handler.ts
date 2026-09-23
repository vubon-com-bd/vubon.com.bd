import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCourierQuery } from './get-courier.query';
import type { CourierRepository } from '../../../domain/repositories/courier.repository.interface';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

@QueryHandler(GetCourierQuery)
export class GetCourierHandler
  extends BaseQueryHandler<GetCourierQuery, CourierResponseDTO | null>
  implements IQueryHandler<GetCourierQuery>
{
  readonly queryType = 'logistics.courier.get';

  constructor(private readonly repo: CourierRepository) {
    super();
  }

  async execute(query: GetCourierQuery): Promise<CourierResponseDTO | null> {
    const entity = await this.repo.findById(CourierIdVO.create(query.courierId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as CourierResponseDTO;
  }
}

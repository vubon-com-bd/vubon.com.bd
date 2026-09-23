import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTrackingQuery } from './get-tracking.query';
import type { TrackingRepository } from '../../../domain/repositories/tracking.repository.interface';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler
  extends BaseQueryHandler<GetTrackingQuery, TrackingResponseDTO | null>
  implements IQueryHandler<GetTrackingQuery>
{
  readonly queryType = 'logistics.tracking.get';

  constructor(private readonly repo: TrackingRepository) {
    super();
  }

  async execute(query: GetTrackingQuery): Promise<TrackingResponseDTO | null> {
    const entity = await this.repo.findByNumber(TrackingNumberVO.create(query.trackingNumber));
    if (!entity) return null;
    return {
      id: entity.id.value,
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
    } as unknown as TrackingResponseDTO;
  }
}

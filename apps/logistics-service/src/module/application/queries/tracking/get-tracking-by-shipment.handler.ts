import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTrackingByShipmentQuery } from './get-tracking-by-shipment.query';
import type { TrackingRepository } from '../../../domain/repositories/tracking.repository.interface';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@QueryHandler(GetTrackingByShipmentQuery)
export class GetTrackingByShipmentHandler
  extends BaseQueryHandler<GetTrackingByShipmentQuery, TrackingResponseDTO | null>
  implements IQueryHandler<GetTrackingByShipmentQuery>
{
  readonly queryType = 'logistics.tracking.get-by-shipment';

  constructor(private readonly repo: TrackingRepository) {
    super();
  }

  async execute(query: GetTrackingByShipmentQuery): Promise<TrackingResponseDTO | null> {
    const entity = await this.repo.findByShipment(ShipmentIdVO.create(query.shipmentId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
    } as unknown as TrackingResponseDTO;
  }
}

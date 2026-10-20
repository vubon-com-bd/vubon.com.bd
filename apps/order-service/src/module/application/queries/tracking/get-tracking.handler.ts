/**
 * GetTrackingHandler
 * @module order-service/application/queries/tracking
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingQuery } from './get-tracking.query.js';
import {
  ORDER_TRACKING_SERVICE,
  type IOrderTrackingService,
} from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingEntryResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler
  implements IQueryHandler<GetTrackingQuery, TrackingEntryResponseDTO>
{
  constructor(
    @Inject(ORDER_TRACKING_SERVICE)
    private readonly service: IOrderTrackingService,
  ) {}

  async execute(q: GetTrackingQuery): Promise<TrackingEntryResponseDTO> {
    return this.service.getById(q.trackingId);
  }
}

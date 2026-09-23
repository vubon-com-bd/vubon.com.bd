import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrackingEntity } from '../../../domain/entities/tracking.entity';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

export interface TrackingServiceInterface
  extends BaseServiceInterface<TrackingEntity, string> {
  findByNumber(number: string): Promise<TrackingResponseDTO | null>;
  findByShipment(shipmentId: string): Promise<TrackingResponseDTO | null>;
  sync(trackingId: string): Promise<TrackingResponseDTO>;
}

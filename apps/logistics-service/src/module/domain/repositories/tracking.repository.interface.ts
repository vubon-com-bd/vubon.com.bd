import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrackingEntity } from '../entities/tracking.entity';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';

export interface TrackingRepository
  extends BaseRepository<TrackingEntity, TrackingIdVO> {
  findByNumber(number: TrackingNumberVO): Promise<TrackingEntity | null>;
  findByShipment(shipmentId: ShipmentIdVO): Promise<TrackingEntity | null>;
}

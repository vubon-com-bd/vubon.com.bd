import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CourierRateEntity } from '../entities/courier-rate.entity';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';

export interface CourierRateRepository
  extends BaseRepository<CourierRateEntity, string> {
  findByCourier(courierId: CourierIdVO): Promise<readonly CourierRateEntity[]>;
  findByZone(zoneId: ZoneIdVO): Promise<readonly CourierRateEntity[]>;
}

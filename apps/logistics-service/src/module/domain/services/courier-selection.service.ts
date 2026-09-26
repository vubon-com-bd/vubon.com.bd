import { CourierEntity } from '../entities/courier.entity';

export class CourierSelectionService {
  selectBest(couriers: readonly CourierEntity[]): CourierEntity | null {
    const active = couriers.filter((c) => c.isActive);
    if (active.length === 0) return null;
    return active[0];
  }
}

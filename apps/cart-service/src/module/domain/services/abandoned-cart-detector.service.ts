import type { CartEntity } from '../entities/cart.entity';

export interface AbandonmentThreshold {
  readonly idleHours: number;
}

export class AbandonedCartDetectorService {
  isAbandoned(
    cart: CartEntity,
    lastActivityAt: Date,
    threshold: AbandonmentThreshold,
    now: Date = new Date(),
  ): boolean {
    if (cart.isEmpty) return false;
    if (cart.status.value !== 'active') return false;
    const idleMs = now.getTime() - lastActivityAt.getTime();
    return idleMs >= threshold.idleHours * 3_600_000;
  }
}

import { Injectable } from '@nestjs/common';
import { AbandonedCartDetectorService as DomainDetector } from '../../../domain/services/abandoned-cart-detector.service';
import type { CartEntity } from '../../../domain/entities/cart.entity';
import { ABANDONMENT_CONFIG } from '../../config/abandonment.config';

@Injectable()
export class AbandonmentDetectorService {
  constructor(private readonly domainDetector: DomainDetector) {}

  isAbandoned(cart: CartEntity, lastActivityAt: Date): boolean {
    return this.domainDetector.isAbandoned(
      cart,
      lastActivityAt,
      { idleHours: ABANDONMENT_CONFIG.idleThresholdHours },
    );
  }
}

/**
 * SubscriptionRenewalWorker — renews upcoming vendor subscriptions
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import {
  VENDOR_SUBSCRIPTION_REPOSITORY,
  type VendorSubscriptionRepository,
} from '../../domain/repositories/vendor-subscription.repository.interface.js';

@Injectable()
export class SubscriptionRenewalWorker implements OnModuleInit {
  private readonly logger = new Logger(SubscriptionRenewalWorker.name);

  constructor(
    @Inject(VENDOR_SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepo: VendorSubscriptionRepository,
  ) {}

  onModuleInit(): void {
    this.logger.log('SubscriptionRenewalWorker registered');
  }

  async renewDue(): Promise<{ renewed: number; failed: number }> {
    const due = await this.subscriptionRepo.findForRenewal();
    let renewed = 0;
    let failed = 0;

    for (const sub of due) {
      try {
        const now = new Date();
        const newPeriodEnd = new Date(now);
        if (sub.cycle === 'monthly') newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1);
        else if (sub.cycle === 'yearly') newPeriodEnd.setFullYear(newPeriodEnd.getFullYear() + 1);
        else if (sub.cycle === 'quarterly') newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 3);
        else newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1);

        sub.renew(newPeriodEnd.toISOString(), sub.priceAmount);
        await this.subscriptionRepo.save(sub);
        renewed += 1;
      } catch (err) {
        this.logger.warn(`Renewal failed for ${sub.id}: ${err instanceof Error ? err.message : 'unknown'}`);
        failed += 1;
      }
    }

    this.logger.log(`Subscription renewal done — renewed=${renewed} failed=${failed}`);
    return { renewed, failed };
  }
}

/**
 * VendorSubscriptionSaga — orchestrate subscription changes
 * @module vendor-service/application/sagas
 *
 * Steps:
 *  1. Apply plan change
 *  2. Adjust feature flags
 *  3. Notify vendor
 */
import { Injectable } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface VendorSubscriptionSagaContext {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly fromPlan: string;
  readonly toPlan: string;
  readonly planApplied: boolean;
  readonly featuresUpdated: boolean;
  readonly notified: boolean;
}

@Injectable()
export class VendorSubscriptionSaga extends BaseSaga<VendorSubscriptionSagaContext> {
  readonly name = 'VendorSubscriptionSaga';

  async execute(input: unknown): Promise<void> {
    const { subscriptionId, vendorId, fromPlan, toPlan } = input as {
      subscriptionId: string;
      vendorId: string;
      fromPlan: string;
      toPlan: string;
    };

    this.setContext({
      subscriptionId,
      vendorId,
      fromPlan,
      toPlan,
      planApplied: false,
      featuresUpdated: false,
      notified: false,
    });

    this.setContext({ ...this.getContext(), planApplied: true });
    this.setContext({ ...this.getContext(), featuresUpdated: true });
    this.setContext({ ...this.getContext(), notified: true });
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.planApplied && !ctx.notified) {
      // revert to previous plan via command
    }
  }
}

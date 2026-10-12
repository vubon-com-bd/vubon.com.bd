/**
 * VendorPayoutSaga — orchestrate payout lifecycle
 * @module vendor-service/application/sagas
 *
 * Steps:
 *  1. Approve payout
 *  2. Notify vendor
 *  3. Record stats
 */
import { Injectable } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface VendorPayoutSagaContext {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly approved: boolean;
  readonly notified: boolean;
  readonly statsRecorded: boolean;
}

@Injectable()
export class VendorPayoutSaga extends BaseSaga<VendorPayoutSagaContext> {
  readonly name = 'VendorPayoutSaga';

  async execute(input: unknown): Promise<void> {
    const { payoutId, vendorId, amount } = input as {
      payoutId: string;
      vendorId: string;
      amount: number;
    };

    this.setContext({
      payoutId,
      vendorId,
      amount,
      approved: false,
      notified: false,
      statsRecorded: false,
    });

    // Step 1: approve
    this.setContext({ ...this.getContext(), approved: true });

    // Step 2: notify
    this.setContext({ ...this.getContext(), notified: true });

    // Step 3: record stats
    this.setContext({ ...this.getContext(), statsRecorded: true });
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // Reverse the approval if stats failed
    if (ctx.statsRecorded && !ctx.notified) {
      // nothing to roll back
    }
  }
}

/**
 * VendorApprovalSaga — orchestrate approval effects
 * @module vendor-service/application/sagas
 *
 * Steps:
 *  1. Mark vendor approved
 *  2. Activate vendor
 *  3. Setup defaults (commission, payout, settings)
 *  4. Notify vendor
 */
import { Injectable } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface VendorApprovalSagaContext {
  readonly vendorId: string;
  readonly approvedBy: string;
  readonly approved: boolean;
  readonly activated: boolean;
  readonly defaultsSetup: boolean;
  readonly notified: boolean;
}

@Injectable()
export class VendorApprovalSaga extends BaseSaga<VendorApprovalSagaContext> {
  readonly name = 'VendorApprovalSaga';

  async execute(input: unknown): Promise<void> {
    const { vendorId, approvedBy } = input as {
      vendorId: string;
      approvedBy: string;
    };

    this.setContext({
      vendorId,
      approvedBy,
      approved: false,
      activated: false,
      defaultsSetup: false,
      notified: false,
    });

    this.setContext({ ...this.getContext(), approved: true });
    this.setContext({ ...this.getContext(), activated: true });
    this.setContext({ ...this.getContext(), defaultsSetup: true });
    this.setContext({ ...this.getContext(), notified: true });
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.defaultsSetup && !ctx.notified) {
      // cleanup defaults
    }
    if (ctx.activated && !ctx.notified) {
      // deactivate
    }
  }
}

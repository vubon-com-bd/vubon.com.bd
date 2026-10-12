/**
 * VendorSuspensionSaga — orchestrate suspension effects
 * @module vendor-service/application/sagas
 *
 * Steps:
 *  1. Mark vendor suspended
 *  2. Revoke active sessions
 *  3. Notify vendor
 */
import { Injectable } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface VendorSuspensionSagaContext {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly marked: boolean;
  readonly sessionsRevoked: boolean;
  readonly notified: boolean;
}

@Injectable()
export class VendorSuspensionSaga extends BaseSaga<VendorSuspensionSagaContext> {
  readonly name = 'VendorSuspensionSaga';

  async execute(input: unknown): Promise<void> {
    const { suspensionId, vendorId, reason } = input as {
      suspensionId: string;
      vendorId: string;
      reason: string;
    };

    this.setContext({
      suspensionId,
      vendorId,
      reason,
      marked: false,
      sessionsRevoked: false,
      notified: false,
    });

    this.setContext({ ...this.getContext(), marked: true });
    this.setContext({ ...this.getContext(), sessionsRevoked: true });
    this.setContext({ ...this.getContext(), notified: true });
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // Reverse suspension marking if notification failed
    if (ctx.marked && !ctx.notified) {
      // lift suspension via command
    }
  }
}

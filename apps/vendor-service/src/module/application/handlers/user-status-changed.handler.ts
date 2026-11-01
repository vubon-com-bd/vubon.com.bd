/**
 * UserStatusChangedHandler — auto-suspend vendor on user suspension/deletion
 * @module vendor-service/application/handlers
 *
 * Listens to identity-service's 'identity.user.status_changed'.
 * If user becomes suspended/deleted/inactive → suspend their vendor (if exists).
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../services/interfaces/vendor.service.interface.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../services/interfaces/vendor-suspension.service.interface.js';

interface UserStatusChangedPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

@Injectable()
export class UserStatusChangedHandler {
  private readonly logger = new Logger(UserStatusChangedHandler.name);

  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly vendorService: IVendorService,
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly suspensionService: IVendorSuspensionService,
  ) {}

  async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as UserStatusChangedPayload;
    this.logger.log(
      `📥 user.status_changed → userId=${payload.userId} ${payload.fromStatus} → ${payload.toStatus}`,
    );

    // Only act on suspension/deletion
    if (!['suspended', 'deleted', 'inactive'].includes(payload.toStatus)) {
      return;
    }

    try {
      // Lookup vendor by userId (throws if not found)
      const vendor = await this.vendorService.getMyVendor(payload.userId);

      // Suspend vendor
      await this.suspensionService.suspend(
        {
          vendorId: vendor.id,
          reason: 'policy_violation',
          description: `Auto-suspended: user status changed to ${payload.toStatus}` +
            (payload.reason ? ` (${payload.reason})` : ''),
          actorId: 'system',
        },
        'system',
      );

      this.logger.log(
        `✅ Vendor ${vendor.id} auto-suspended due to user ${payload.toStatus}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Vendor not found is expected (user might not be a vendor)
      if (msg.toLowerCase().includes('notfound') || msg.toLowerCase().includes('not found')) {
        this.logger.log(`No vendor for userId=${payload.userId} — skip`);
      } else {
        this.logger.error(
          `Failed to auto-suspend vendor for user ${payload.userId}: ${msg}`,
        );
      }
    }
  }
}

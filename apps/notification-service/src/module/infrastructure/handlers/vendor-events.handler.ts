/**
 * VendorEventsHandler — cross-service consumer for vendor events
 * @module notification-service/infrastructure/handlers
 *
 * vendor.registered → welcome vendor email
 * vendor.approved   → "Vendor account approved"
 * vendor.suspended  → "Vendor account suspended"
 * vendor.rejected   → "Vendor application rejected"
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from '@vubon/shared-constants/platform/notification';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../application/services/interfaces/notification.service.interface.js';

interface VendorEventPayload {
  readonly vendorId?: string;
  readonly userId?: string;
  readonly ownerId?: string;
  readonly name?: string;
  readonly reason?: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

type VendorKind = 'registered' | 'approved' | 'suspended' | 'rejected';

@Injectable()
export class VendorEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const kinds: readonly VendorKind[] = ['registered', 'approved', 'suspended', 'rejected'];
    for (const kind of kinds) {
      this.eventBus.registerHandler(`vendor.${kind}`, async (event) => {
        await this.onVendorEvent(event, kind);
      });
    }
    this.logger.log(`🔗 VendorEventsHandler subscribed to vendor.registered/approved/suspended/rejected`);
  }

  private async onVendorEvent(event: unknown, kind: VendorKind): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as VendorEventPayload;
    const userId = p.userId ?? p.ownerId;

    if (!userId) {
      this.logger.warn(`vendor.${kind} — missing userId/ownerId, skipping`);
      return;
    }

    const tpl = this.template(kind, p);
    this.logger.log(`📬 vendor.${kind} → notify user ${userId}`);

    try {
      await this.notifications.send(
        {
          userId,
          type: tpl.type,
          category: NOTIFICATION_CATEGORY.USER,
          channels: tpl.channels,
          priority: tpl.priority,
          title: tpl.title,
          body: tpl.body,
          reference: p.vendorId ? { type: 'vendor', id: p.vendorId } : undefined,
          data: { vendorId: p.vendorId, kind },
        },
        'system:vendor-events-handler',
      );
      this.logger.log(`✅ vendor.${kind} notification sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ vendor.${kind} notification failed: ${msg}`);
    }
  }

  private template(kind: VendorKind, p: VendorEventPayload) {
    const name = p.name ?? 'there';
    switch (kind) {
      case 'registered':
        return {
          type: NOTIFICATION_TYPE.WELCOME,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.NORMAL,
          title: `Welcome to Vubon Seller Hub, ${name}`,
          body: 'Your vendor account has been created. We will review your documents shortly.',
        };
      case 'approved':
        return {
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Vendor account approved',
          body: 'Congratulations! Your seller account is now active. Start listing products today.',
        };
      case 'suspended':
        return {
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH] as const,
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          title: 'Vendor account suspended',
          body: `Your seller account has been suspended${p.reason ? `: ${p.reason}` : ''}. Please contact support.`,
        };
      case 'rejected':
        return {
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Vendor application rejected',
          body: `Your vendor application was not approved${p.reason ? `: ${p.reason}` : ''}. Please review and resubmit.`,
        };
    }
  }
}

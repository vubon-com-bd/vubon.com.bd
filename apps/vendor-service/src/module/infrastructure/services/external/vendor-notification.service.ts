/**
 * VendorNotificationService — multi-channel notification dispatcher
 * @module vendor-service/infrastructure/services/external
 *
 * Self-contained: uses queue for async dispatch, no kernel external dep.
 */
import { Injectable, Logger } from '@nestjs/common';
import { NotificationQueue } from '../../queues/notification.queue.js';

export const VENDOR_NOTIFICATION_SERVICE = Symbol('VENDOR_NOTIFICATION_SERVICE');

export interface VendorNotificationPayload {
  readonly vendorId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly channel?: 'email' | 'sms' | 'push' | 'in-app';
}

export interface IVendorNotificationService {
  notifyVendor(payload: VendorNotificationPayload): Promise<boolean>;
  notifyAdmin(payload: VendorNotificationPayload): Promise<boolean>;
}

@Injectable()
export class VendorNotificationService implements IVendorNotificationService {
  private readonly logger = new Logger(VendorNotificationService.name);

  constructor(private readonly notificationQueue: NotificationQueue) {}

  async notifyVendor(payload: VendorNotificationPayload): Promise<boolean> {
    try {
      await this.notificationQueue.enqueueNotify({
        vendorId: payload.vendorId,
        template: payload.template,
        data: payload.data,
        channel: payload.channel ?? 'email',
      });
      this.logger.log(
        `Queued vendor notification: ${payload.template} → ${payload.vendorId}`,
      );
      return true;
    } catch (err) {
      this.logger.warn(
        `Notify vendor failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return false;
    }
  }

  async notifyAdmin(payload: VendorNotificationPayload): Promise<boolean> {
    try {
      await this.notificationQueue.enqueueNotify({
        vendorId: payload.vendorId,
        template: `admin:${payload.template}`,
        data: payload.data,
        channel: 'email',
      });
      this.logger.log(`Queued admin notification: ${payload.template}`);
      return true;
    } catch {
      return false;
    }
  }
}

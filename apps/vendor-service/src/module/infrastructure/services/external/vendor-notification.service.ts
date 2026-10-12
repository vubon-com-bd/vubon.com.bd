/**
 * VendorNotificationService — send notifications (email/SMS/push)
 * @module vendor-service/infrastructure/services/external
 *
 * Delegates to shared-kernel email/sms/push services in production.
 * In this implementation, it queues notifications (logs them for now).
 */
import { Injectable, Logger } from '@nestjs/common';

export type NotificationChannel = 'email' | 'sms' | 'push';
export type NotificationEvent =
  | 'vendor.registered'
  | 'vendor.approved'
  | 'vendor.rejected'
  | 'vendor.suspended'
  | 'vendor.suspension_lifted'
  | 'vendor.document_verified'
  | 'vendor.document_rejected'
  | 'vendor.payout_approved'
  | 'vendor.payout_paid'
  | 'vendor.payout_failed'
  | 'vendor.team_invite'
  | 'vendor.verification_approved'
  | 'vendor.verification_rejected'
  | 'vendor.subscription_renewed'
  | 'vendor.subscription_past_due';

export interface NotificationPayload {
  readonly event: NotificationEvent;
  readonly vendorId: string;
  readonly channels?: readonly NotificationChannel[];
  readonly to: { email?: string; phone?: string; userId?: string };
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class VendorNotificationService {
  private readonly logger = new Logger(VendorNotificationService.name);

  async send(payload: NotificationPayload): Promise<void> {
    const channels = payload.channels ?? ['email'];
    this.logger.log(
      `[${payload.event}] vendor=${payload.vendorId} channels=${channels.join(',')}`,
    );
    // Real implementation: call shared-kernel EmailService/SmsService/PushService
    // or enqueue to notification queue
  }

  async sendBatch(payloads: readonly NotificationPayload[]): Promise<void> {
    for (const p of payloads) {
      await this.send(p);
    }
  }

  async notifyApproved(vendorId: string, to: { email: string }): Promise<void> {
    await this.send({
      event: 'vendor.approved',
      vendorId,
      to,
      channels: ['email'],
    });
  }

  async notifyRejected(vendorId: string, to: { email: string }, reason: string): Promise<void> {
    await this.send({
      event: 'vendor.rejected',
      vendorId,
      to,
      channels: ['email'],
      data: { reason },
    });
  }

  async notifySuspended(vendorId: string, to: { email: string }, reason: string, durationDays: number): Promise<void> {
    await this.send({
      event: 'vendor.suspended',
      vendorId,
      to,
      channels: ['email', 'sms'],
      data: { reason, durationDays },
    });
  }

  async notifyPayoutPaid(vendorId: string, to: { email: string }, amount: number, currency: string): Promise<void> {
    await this.send({
      event: 'vendor.payout_paid',
      vendorId,
      to,
      channels: ['email'],
      data: { amount, currency },
    });
  }

  async notifyTeamInvite(vendorId: string, to: { email: string }, role: string, token: string): Promise<void> {
    await this.send({
      event: 'vendor.team_invite',
      vendorId,
      to,
      channels: ['email'],
      data: { role, token },
    });
  }
}

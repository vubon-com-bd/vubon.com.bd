/**
 * SessionCreatedHandler — new login alert
 * @module notification-service/application/events/external
 *
 * SessionCreatedPayload-এ email/phone নেই → user.client দিয়ে fetch
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { renderSecurityAlertEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';
import { renderSessionCreatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const SESSION_CREATED_EVENT = 'identity.session.created';

@Injectable()
export class SessionCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(SessionCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SESSION_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${SESSION_CREATED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    const userId = payload?.userId ?? event.aggregateId;

    // 🔑 FIX: session.created payload-এ email নেই → user.client দিয়ে fetch
    let email: string | undefined = payload?.email;
    let phone: string | undefined = payload?.phone;
    let displayName: string = 'User';

    if (!email) {
      try {
        const user = await this.userClient.getById(userId);
        if (user) {
          email = (user as { email?: string }).email;
          displayName = (user as { name?: string }).name
            ?? email?.split('@')[0]
            ?? 'User';
        }
        this.logger.log(
          `🔎 Fetched user from identity → email=${email ?? 'N/A'}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`User lookup failed for ${userId}: ${msg}`);
      }
    }

    // Build channels — email থাকলে email push
    const channels: string[] = [NOTIFICATION_CHANNEL.IN_APP];
    if (email) channels.push(NOTIFICATION_CHANNEL.EMAIL);
    if (phone) channels.push(NOTIFICATION_CHANNEL.SMS);

    this.logger.log(
      `📨 Login notification channels: [${channels.join(',')}] for user ${userId}`,
    );

    try {
      
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderSessionCreatedEmail({
      name: (payload.name as string) ?? 'ব্যবহারকারী',
      device: (payload.device as string) ?? undefined,
      ipAddress: (payload.ipAddress as string) ?? undefined,
      loginAt: (payload.loginAt as string) ?? new Date().toISOString(),
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.SECURITY,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? '🔐 নতুন লগইন সনাক্ত' : '🔐 New Login Detected',
        body: html || isBn
          ? `আপনার অ্যাকাউন্টে নতুন লগইন: ডিভাইস: ${payload?.userAgent ?? 'অজানা'}, IP: ${payload?.ipAddress ?? 'অজানা'}. এটি আপনি না হলে পাসওয়ার্ড পরিবর্তন করুন।`
          : `New login to your account: Device: ${payload?.userAgent ?? 'Unknown'}, IP: ${payload?.ipAddress ?? 'Unknown'}. If not you, change password immediately.`,
        html: renderSecurityAlertEmail({
          name: displayName,
          email: email ?? '',
          device: payload?.userAgent ?? 'Unknown Device',
          ip: payload?.ipAddress ?? 'Unknown IP',
          time: new Date().toISOString(),
          locale: isBn ? 'bn' : 'en',
        }),
        data: {
          html,
          eventType: SESSION_CREATED_EVENT,
          ...payload,
        },
        email,
        phone,
        idempotencyKey: `sess-created-${event.id}`,
      });
      this.logger.log(
        `✅ New login notification sent (channels: ${channels.join(',')})`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`SessionCreatedHandler failed: ${msg}`);
    }
  }
}

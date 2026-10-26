/**
 * RecipientResolverService
 * @module notification-service/domain/services
 *
 * Resolves raw user/recipient inputs into NotificationRecipientVO[]।
 * Deduplicates by (userId + channel + destination)।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';

import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';

export interface RawRecipient {
  readonly userId: string;
  readonly channel: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
  readonly webhookUrl?: string;
}

export interface ResolveResult {
  readonly resolved: readonly NotificationRecipientVO[];
  readonly skipped: readonly { readonly userId: string; readonly reason: string }[];
}

const MAX_RECIPIENTS = 10_000;

export class RecipientResolverService {
  static resolve(raw: readonly RawRecipient[]): ResolveResult {
    if (raw.length === 0) {
      throw new BusinessRuleError(
        'No recipients provided',
        'NO_RECIPIENTS',
      );
    }
    if (raw.length > MAX_RECIPIENTS) {
      throw new BusinessRuleError(
        `Too many recipients (${raw.length}), max ${MAX_RECIPIENTS}`,
        'TOO_MANY_RECIPIENTS',
        { count: raw.length },
      );
    }

    const seen = new Set<string>();
    const resolved: NotificationRecipientVO[] = [];
    const skipped: { userId: string; reason: string }[] = [];

    for (const r of raw) {
      try {
        const recipient = this.build(r);
        const key = `${recipient.userId.value}:${recipient.channel.value}:${recipient.destination}`;
        if (seen.has(key)) {
          skipped.push({ userId: r.userId, reason: 'duplicate' });
          continue;
        }
        seen.add(key);
        resolved.push(recipient);
      } catch (e) {
        const reason = e instanceof Error ? e.message : 'invalid';
        skipped.push({ userId: r.userId, reason });
      }
    }

    if (resolved.length === 0) {
      throw new ValidationError(
        'No valid recipients after resolution',
        'recipients',
      );
    }

    return { resolved, skipped };
  }

  private static build(r: RawRecipient): NotificationRecipientVO {
    const userId = UserIdVO.create(r.userId);
    const channel = NotificationChannelVO.create(r.channel);

    let email: EmailAddressVO | undefined;
    let phone: PhoneNumberVO | undefined;
    let deviceToken: DeviceTokenVO | undefined;
    let webhookUrl: WebhookUrlVO | undefined;

    if (r.channel === NOTIFICATION_CHANNEL.EMAIL) {
      if (!r.email) throw new ValidationError('email required', 'email');
      email = EmailAddressVO.create(r.email);
    }
    if (r.channel === NOTIFICATION_CHANNEL.SMS || r.channel === NOTIFICATION_CHANNEL.WHATSAPP) {
      if (!r.phone) throw new ValidationError('phone required', 'phone');
      phone = PhoneNumberVO.create(r.phone);
    }
    if (r.channel === NOTIFICATION_CHANNEL.PUSH) {
      if (!r.deviceToken) throw new ValidationError('deviceToken required', 'deviceToken');
      deviceToken = DeviceTokenVO.create(r.deviceToken);
    }
    if (r.channel === NOTIFICATION_CHANNEL.WEBHOOK) {
      if (!r.webhookUrl) throw new ValidationError('webhookUrl required', 'webhookUrl');
      webhookUrl = WebhookUrlVO.create(r.webhookUrl);
    }

    return NotificationRecipientVO.create({
      userId,
      channel,
      email,
      phone,
      deviceToken,
      webhookUrl,
    });
  }
}

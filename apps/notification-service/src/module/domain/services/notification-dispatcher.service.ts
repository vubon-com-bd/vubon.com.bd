/**
 * NotificationDispatcherService — decide which provider handles a notification
 * @module notification-service/domain/services
 *
 * Business rules:
 *  - email channel  → email provider (smtp | sendgrid | ses | mailgun | postmark | resend)
 *  - sms channel    → sms provider (BD → sslwireless | banglalink | robi; intl → twilio | vonage)
 *  - push channel   → push provider (android → fcm; ios/macos → apns; web → web_push)
 *  - in_app         → no external provider (internal delivery)
 *  - webhook        → external HTTP endpoint (no provider abstraction)
 *  - whatsapp       → whatsapp-capable provider (twilio)
 */
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform/notification';
import { NOTIFICATION_CONFIG } from '@vubon/shared-config/platform/notification';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';
import { PushPlatformVO } from '../value-objects/primitives/push-platform.vo.js';
import { PhoneNumberVO } from '../value-objects/primitives/phone-number.vo.js';
import { EmailProviderVO } from '../value-objects/primitives/email-provider.vo.js';
import { SmsProviderVO } from '../value-objects/primitives/sms-provider.vo.js';
import { PushProviderVO } from '../value-objects/primitives/push-provider.vo.js';

export interface DispatchInput {
  readonly channel: NotificationChannelVO;
  /** Optional preferred provider (from user config / payload). */
  readonly preferredProvider?: string;
  /** Phone number — used to pick BD vs intl SMS provider. */
  readonly phone?: PhoneNumberVO;
  /** Push platform — used to pick APNs vs FCM. */
  readonly pushPlatform?: PushPlatformVO;
  /** Optional: enabled feature flags from env config. */
  readonly enabled?: {
    readonly email?: boolean;
    readonly sms?: boolean;
    readonly push?: boolean;
    readonly inApp?: boolean;
    readonly webhook?: boolean;
  };
}

export interface DispatchResult {
  readonly channel: string;
  readonly providerName: string | null;
  readonly reason: string;
  readonly requiresExternalCall: boolean;
}

export class NotificationDispatcherService {
  static select(input: DispatchInput): DispatchResult {
    const enabled = input.enabled ?? {
      email: NOTIFICATION_CONFIG.emailEnabled,
      sms: NOTIFICATION_CONFIG.smsEnabled,
      push: NOTIFICATION_CONFIG.pushEnabled,
      inApp: NOTIFICATION_CONFIG.inAppEnabled,
      webhook: NOTIFICATION_CONFIG.webhookEnabled,
    };

    if (input.channel.isEmail()) return this.selectEmail(input, enabled.email ?? true);
    if (input.channel.isSms()) return this.selectSms(input, enabled.sms ?? true);
    if (input.channel.isPush()) return this.selectPush(input, enabled.push ?? true);
    if (input.channel.isInApp()) return this.selectInApp(enabled.inApp ?? true);
    if (input.channel.isWebhook()) return this.selectWebhook(enabled.webhook ?? false);
    if (input.channel.isWhatsapp()) return this.selectWhatsapp(input, enabled.sms ?? true);

    throw new BusinessRuleError(
      `No dispatcher registered for channel "${input.channel.value}"`,
      'NO_DISPATCHER_FOR_CHANNEL',
      { channel: input.channel.value },
    );
  }

  private static selectEmail(input: DispatchInput, enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'Email channel is disabled in configuration',
        'EMAIL_CHANNEL_DISABLED',
      );
    }
    const provider = input.preferredProvider
      ? EmailProviderVO.reconstitute(input.preferredProvider)
      : EmailProviderVO.sendgrid();
    return {
      channel: NOTIFICATION_CHANNEL.EMAIL,
      providerName: provider.value,
      reason: input.preferredProvider ? 'preferred_provider' : 'default_email_provider',
      requiresExternalCall: true,
    };
  }

  private static selectSms(input: DispatchInput, enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'SMS channel is disabled in configuration',
        'SMS_CHANNEL_DISABLED',
      );
    }
    if (input.preferredProvider) {
      const provider = SmsProviderVO.reconstitute(input.preferredProvider);
      return {
        channel: NOTIFICATION_CHANNEL.SMS,
        providerName: provider.value,
        reason: 'preferred_provider',
        requiresExternalCall: true,
      };
    }
    if (input.phone?.isBangladeshi()) {
      return {
        channel: NOTIFICATION_CHANNEL.SMS,
        providerName: SmsProviderVO.sslwireless().value,
        reason: 'bd_local_phone',
        requiresExternalCall: true,
      };
    }
    return {
      channel: NOTIFICATION_CHANNEL.SMS,
      providerName: SmsProviderVO.twilio().value,
      reason: 'international_phone',
      requiresExternalCall: true,
    };
  }

  private static selectPush(input: DispatchInput, enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'Push channel is disabled in configuration',
        'PUSH_CHANNEL_DISABLED',
      );
    }
    if (input.preferredProvider) {
      const provider = PushProviderVO.reconstitute(input.preferredProvider);
      return {
        channel: NOTIFICATION_CHANNEL.PUSH,
        providerName: provider.value,
        reason: 'preferred_provider',
        requiresExternalCall: true,
      };
    }
    if (input.pushPlatform?.usesApns()) {
      return {
        channel: NOTIFICATION_CHANNEL.PUSH,
        providerName: PushProviderVO.apns().value,
        reason: 'ios_or_macos_platform',
        requiresExternalCall: true,
      };
    }
    return {
      channel: NOTIFICATION_CHANNEL.PUSH,
      providerName: PushProviderVO.fcm().value,
      reason: 'android_or_default_platform',
      requiresExternalCall: true,
    };
  }

  private static selectInApp(enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'In-app channel is disabled in configuration',
        'IN_APP_CHANNEL_DISABLED',
      );
    }
    return {
      channel: NOTIFICATION_CHANNEL.IN_APP,
      providerName: null,
      reason: 'in_app_internal_delivery',
      requiresExternalCall: false,
    };
  }

  private static selectWebhook(enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'Webhook channel is disabled in configuration',
        'WEBHOOK_CHANNEL_DISABLED',
      );
    }
    return {
      channel: NOTIFICATION_CHANNEL.WEBHOOK,
      providerName: null,
      reason: 'webhook_external_endpoint',
      requiresExternalCall: true,
    };
  }

  private static selectWhatsapp(input: DispatchInput, enabled: boolean): DispatchResult {
    if (!enabled) {
      throw new BusinessRuleError(
        'WhatsApp channel requires SMS provider enabled',
        'WHATSAPP_CHANNEL_DISABLED',
      );
    }
    return {
      channel: NOTIFICATION_CHANNEL.WHATSAPP,
      providerName: SmsProviderVO.twilio().value,
      reason: 'whatsapp_via_twilio',
      requiresExternalCall: true,
    };
  }
}

/**
 * Provider Webhook (inbound) Request DTOs
 * @module notification-service/application/dtos/requests/provider-webhook
 */

// ═══ SendGrid (email events) ═══
export interface SendGridEventDTO {
  readonly email: string;
  readonly timestamp: number;
  readonly event: 'processed' | 'delivered' | 'open' | 'click' | 'bounce' | 'dropped' | 'spamreport' | 'unsubscribe';
  readonly sg_event_id: string;
  readonly sg_message_id: string;
  readonly category?: readonly string[];
  readonly reason?: string;
  readonly url?: string;
  readonly useragent?: string;
  readonly ip?: string;
  readonly [key: string]: unknown;
}

export interface SendGridWebhookRequestDTO {
  readonly events: readonly SendGridEventDTO[];
  readonly signature?: string;
  readonly timestamp?: string;
}

// ═══ Twilio (SMS events) ═══
export interface TwilioStatusCallbackDTO {
  readonly MessageSid: string;
  readonly MessageStatus: 'queued' | 'sent' | 'delivered' | 'undelivered' | 'failed';
  readonly To: string;
  readonly From: string;
  readonly ErrorCode?: string;
  readonly ErrorMessage?: string;
}

export interface TwilioWebhookRequestDTO extends TwilioStatusCallbackDTO {
  readonly AccountSid: string;
  readonly signature?: string;
}

// ═══ AWS SES (email events) ═══
export interface SesEventDTO {
  readonly eventType: 'Delivery' | 'Bounce' | 'Complaint' | 'Open' | 'Click';
  readonly mail: {
    readonly messageId: string;
    readonly source: string;
    readonly destination: readonly string[];
    readonly timestamp: string;
  };
  readonly delivery?: {
    readonly timestamp: string;
    readonly recipients: readonly string[];
  };
  readonly bounce?: {
    readonly bounceType: string;
    readonly bounceSubType: string;
    readonly bouncedRecipients: readonly {
      readonly emailAddress: string;
      readonly status: string;
    }[];
  };
  readonly complaint?: {
    readonly complainedRecipients: readonly {
      readonly emailAddress: string;
    }[];
  };
}

export interface SesWebhookRequestDTO {
  readonly Message: string; // JSON-encoded SesEventDTO
  readonly Type: string;
  readonly MessageId: string;
}

// ═══ FCM (push events) — typically via pub/sub or direct callback ═══
export interface FcmDeliveryReceiptDTO {
  readonly messageId: string;
  readonly token: string;
  readonly success: boolean;
  readonly error?: string;
  readonly errorCode?: string;
}

// ═══ Unified Provider-Webhook Request ═══
export type ProviderWebhookProvider = 'sendgrid' | 'twilio' | 'ses' | 'mailgun' | 'fcm' | 'apns';

export interface ProviderWebhookRequestDTO {
  readonly provider: ProviderWebhookProvider;
  readonly body: Readonly<Record<string, unknown>>;
  readonly headers: Readonly<Record<string, string>>;
  readonly signature?: string;
  readonly rawBody?: string;
}

export interface ProviderWebhookProcessResultDTO {
  readonly accepted: boolean;
  readonly provider: ProviderWebhookProvider;
  readonly processedEvents: number;
  readonly updatedNotifications: readonly string[];
  readonly errors?: readonly string[];
}

/**
 * Channel-specific provider interfaces
 * @module notification-service/infrastructure/providers/base
 */
import type { IProvider, ProviderSendResult } from './provider.types.js';

// ═══ Email ═══
export interface EmailSendPayload {
  readonly to: readonly string[];
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly from?: string;
  readonly replyTo?: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly attachments?: readonly {
    readonly filename: string;
    readonly content?: string;
    readonly contentType?: string;
    readonly url?: string;
  }[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly tags?: Readonly<Record<string, string>>;
}

export interface IEmailProvider extends IProvider {
  send(payload: EmailSendPayload): Promise<ProviderSendResult>;
}

// ═══ SMS ═══
export interface SmsSendPayload {
  readonly to: string;
  readonly message: string;
  readonly senderId?: string;
  readonly type?: 'transactional' | 'promotional' | 'otp';
}

export interface ISmsProvider extends IProvider {
  send(payload: SmsSendPayload): Promise<ProviderSendResult>;
}

// ═══ Push ═══
export interface PushSendPayload {
  readonly token: string;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly silent?: boolean;
  readonly ttl?: number;
  readonly platform?: 'android' | 'ios' | 'web';
}

export interface IPushProvider extends IProvider {
  send(payload: PushSendPayload): Promise<ProviderSendResult>;
}

// ═══ In-App ═══
export interface InAppDeliverPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface IInAppProvider extends IProvider {
  deliver(payload: InAppDeliverPayload): Promise<ProviderSendResult>;
}

// ═══ Webhook ═══
export interface WebhookDeliverPayload {
  readonly url: string;
  readonly method: string;
  readonly body: string;
  readonly headers?: Readonly<Record<string, string>>;
  readonly secret?: string;
  readonly timeoutMs?: number;
}

export interface IWebhookProvider extends IProvider {
  deliver(payload: WebhookDeliverPayload): Promise<ProviderSendResult>;
}

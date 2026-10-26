/**
 * Provider Interfaces
 * @module notification-service/infrastructure/providers/base
 *
 * Channel-specific contracts। Each channel has typed send/verify methods।
 */
import type {
  ProviderResult,
  ProviderHealth,
  ProviderMetadata,
  ProviderChannel,
} from './provider.types.js';

/**
 * Base provider contract — all providers implement this।
 */
export interface IProvider {
  readonly metadata: ProviderMetadata;
  isEnabled(): boolean;
  isAvailable(): Promise<boolean>;
  health(): Promise<ProviderHealth>;
}

// ═══════════════ Email ═══════════════
export interface EmailProviderInput {
  readonly to: string | readonly string[];
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly from?: string;
  readonly replyTo?: string;
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly attachments?: readonly {
    readonly filename: string;
    readonly content?: string;
    readonly url?: string;
    readonly contentType?: string;
  }[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly templateId?: string;
  readonly templateData?: Readonly<Record<string, unknown>>;
}

export interface IEmailProvider extends IProvider {
  send(input: EmailProviderInput): Promise<ProviderResult>;
  verifyWebhook?(payload: unknown, signature: string): Promise<boolean>;
}

// ═══════════════ SMS ═══════════════
export interface SmsProviderInput {
  readonly to: string | readonly string[];
  readonly message: string;
  readonly from?: string;
  readonly type?: 'transactional' | 'promotional';
}

export interface ISmsProvider extends IProvider {
  send(input: SmsProviderInput): Promise<ProviderResult>;
}

// ═══════════════ Push ═══════════════
export interface PushProviderInput {
  readonly token: string | readonly string[];
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly silent?: boolean;
  readonly ttl?: number;
}

export interface IPushProvider extends IProvider {
  send(input: PushProviderInput): Promise<ProviderResult>;
}

// ═══════════════ Webhook ═══════════════
export interface WebhookProviderInput {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly payload: Readonly<Record<string, unknown>>;
  readonly headers?: Readonly<Record<string, string>>;
  readonly secret?: string;
  readonly timeoutMs?: number;
}

export interface IWebhookProvider extends IProvider {
  send(input: WebhookProviderInput): Promise<ProviderResult>;
  sign(payload: string, secret: string): string;
}

// ═══════════════ In-App ═══════════════
export interface InAppProviderInput {
  readonly userId: string;
  readonly notificationId: string;
  readonly title: string;
  readonly body: string;
  readonly type?: string;
  readonly position?: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
    readonly action?: string;
  }[];
  readonly displayDurationSeconds?: number;
}

export interface IInAppProvider extends IProvider {
  send(input: InAppProviderInput): Promise<ProviderResult>;
}

// ═══════════════ Resolver ═══════════════
export type AnyProvider =
  | IEmailProvider
  | ISmsProvider
  | IPushProvider
  | IWebhookProvider
  | IInAppProvider;

export interface IProviderResolver {
  resolve(channel: ProviderChannel, name?: string): AnyProvider;
  resolveAll(channel: ProviderChannel): readonly AnyProvider[];
  availableNames(channel: ProviderChannel): readonly string[];
}

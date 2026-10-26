/**
 * Push Provider Types
 * @module notification-service/infrastructure/providers/push
 */
export type PushProviderName = 'fcm' | 'apns' | 'web-push' | 'onesignal' | 'expo';

export interface PushProviderConfig {
  readonly name: PushProviderName;
  readonly enabled: boolean;
  readonly priority: number;
}

export interface ApnsPayload {
  readonly aps: {
    readonly alert?: { readonly title: string; readonly body: string };
    readonly badge?: number;
    readonly sound?: string;
    readonly 'content-available'?: number;
    readonly 'mutable-content'?: number;
  };
  readonly [customKey: string]: unknown;
}

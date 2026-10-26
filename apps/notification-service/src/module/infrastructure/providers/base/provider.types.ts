/**
 * Provider Shared Types
 * @module notification-service/infrastructure/providers/base
 *
 * Used across all channel providers (email/sms/push/webhook/in-app)।
 */
export type ProviderChannel = 'email' | 'sms' | 'push' | 'webhook' | 'in-app';

export type ProviderHealthState = 'healthy' | 'degraded' | 'unavailable';

export interface ProviderResult {
  readonly success: boolean;
  readonly providerMessageId?: string;
  readonly status?: string;
  readonly error?: string;
  readonly errorCode?: string;
  readonly retryable?: boolean;
  readonly durationMs?: number;
  readonly rawResponse?: unknown;
}

export interface ProviderHealth {
  readonly state: ProviderHealthState;
  readonly providerName: string;
  readonly checkedAt: string;
  readonly latencyMs?: number;
  readonly error?: string;
}

export interface ProviderRateLimitState {
  readonly limit: number;
  readonly remaining: number;
  readonly resetAtMs: number;
}

export interface ProviderMetadata {
  readonly name: string;
  readonly channel: ProviderChannel;
  readonly version: string;
  readonly priority: number;
}

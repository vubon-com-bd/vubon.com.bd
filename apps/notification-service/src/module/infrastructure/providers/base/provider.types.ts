/**
 * Provider layer — shared types
 * @module notification-service/infrastructure/providers/base
 */

export type ProviderChannel = 'email' | 'sms' | 'push' | 'in_app' | 'webhook';

export interface ProviderSendResult {
  readonly success: boolean;
  readonly providerMessageId?: string;
  readonly error?: string;
  readonly errorCode?: string;
  readonly retryable?: boolean;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface ProviderHealthStatus {
  readonly healthy: boolean;
  readonly enabled: boolean;
  readonly reason?: string;
}

export interface ProviderInfo {
  readonly name: string;
  readonly channel: ProviderChannel;
  readonly enabled: boolean;
}

export interface ProviderRateLimits {
  readonly perSecond: number;
  readonly perDay: number;
}

/**
 * Every provider adapter implements this.
 * Concrete channels extend with their payload types.
 */
export interface IProvider {
  readonly name: string;
  readonly channel: ProviderChannel;
  isEnabled(): boolean;
  health(): Promise<ProviderHealthStatus>;
  info(): ProviderInfo;
  rateLimits(): ProviderRateLimits;
}

/**
 * Error hierarchy for provider failures.
 */
export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly code?: string,
    public readonly retryable: boolean = false,
    public readonly raw?: unknown,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export class ProviderDisabledError extends ProviderError {
  constructor(provider: string) {
    super(`Provider "${provider}" is disabled`, provider, 'PROVIDER_DISABLED', false);
    this.name = 'ProviderDisabledError';
  }
}

export class ProviderNetworkError extends ProviderError {
  constructor(provider: string, message: string, raw?: unknown) {
    super(`Provider "${provider}" network error: ${message}`, provider, 'NETWORK_ERROR', true, raw);
    this.name = 'ProviderNetworkError';
  }
}

export class ProviderRateLimitError extends ProviderError {
  constructor(provider: string, retryAfterMs?: number) {
    super(
      `Provider "${provider}" rate limited${retryAfterMs ? ` (retry after ${retryAfterMs}ms)` : ''}`,
      provider,
      'RATE_LIMITED',
      true,
    );
    this.name = 'ProviderRateLimitError';
  }
}

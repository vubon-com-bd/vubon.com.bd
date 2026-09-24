export class ProviderError extends Error {
  constructor(
    public readonly providerName: string,
    message: string,
    public readonly cause?: unknown,
  ) {
    super(`[${providerName}] ${message}`);
    this.name = 'ProviderError';
  }
}

export class ProviderTimeoutError extends ProviderError {
  constructor(providerName: string, timeoutMs: number) {
    super(providerName, `Timeout after ${timeoutMs}ms`);
    this.name = 'ProviderTimeoutError';
  }
}

export class ProviderRateLimitError extends ProviderError {
  constructor(providerName: string, retryAfterMs?: number) {
    super(providerName, `Rate limited${retryAfterMs ? ` (retry in ${retryAfterMs}ms)` : ''}`);
    this.name = 'ProviderRateLimitError';
  }
}

export class ProviderUnavailableError extends ProviderError {
  constructor(providerName: string, reason: string) {
    super(providerName, `Unavailable: ${reason}`);
    this.name = 'ProviderUnavailableError';
  }
}

/**
 * Retry Client
 * রিট্রাই ক্লায়েন্ট
 */
export interface RetryConfig {
  maxAttempts: number;
  delay: number;
  backoff: 'linear' | 'exponential';
  statusCodes: number[];
  retryableErrors: string[];
}

export interface RetryOptions {
  attempts?: number;
  delay?: number;
  backoff?: 'linear' | 'exponential';
  onRetry?: (attempt: number, error: Error) => void;
}

export class RetryClient {
  private config: RetryConfig;

  constructor(config: RetryConfig) {
    this.config = config;
  }

  async execute<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T> {
    const maxAttempts = options?.attempts || this.config.maxAttempts;
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        attempt++;

        // Check if error is retryable
        if (!this.isRetryable(error as Error)) {
          throw error;
        }

        // Check if we've reached max attempts
        if (attempt >= maxAttempts) {
          throw error;
        }

        // Calculate delay
        const delay = this.getDelay(attempt, options);

        // Call onRetry callback
        if (options?.onRetry) {
          options.onRetry(attempt, error as Error);
        }

        // Wait before retry
        await this.sleep(delay);
      }
    }

    throw lastError || new Error('Retry failed');
  }

  private isRetryable(error: Error): boolean {
    // Check if error message matches retryable errors
    if (this.config.retryableErrors.length > 0) {
      return this.config.retryableErrors.some((pattern) => error.message.includes(pattern));
    }

    // Check if error has status code
    const statusCode =
      (error as { status?: number; statusCode?: number }).status ||
      (error as { status?: number; statusCode?: number }).statusCode;
    if (statusCode && this.config.statusCodes.includes(statusCode)) {
      return true;
    }

    // Network errors are retryable
    if (
      error.message.includes('NetworkError') ||
      error.message.includes('timeout') ||
      error.message.includes('ECONNREFUSED')
    ) {
      return true;
    }

    return false;
  }

  private getDelay(attempt: number, options?: RetryOptions): number {
    const baseDelay = options?.delay || this.config.delay;

    if (options?.backoff === 'exponential' || this.config.backoff === 'exponential') {
      return baseDelay * Math.pow(2, attempt - 1);
    }

    return baseDelay;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const createRetryClient = (options?: Partial<RetryConfig>): RetryClient => {
  return new RetryClient({
    maxAttempts: options?.maxAttempts || 3,
    delay: options?.delay || 1000,
    backoff: options?.backoff || 'exponential',
    statusCodes: options?.statusCodes || [500, 502, 503, 504, 429],
    retryableErrors: options?.retryableErrors || [],
  });
};

// Utility function to retry with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  const client = createRetryClient({
    maxAttempts,
    delay: initialDelay,
    backoff: 'exponential',
  });

  return client.execute(fn);
};

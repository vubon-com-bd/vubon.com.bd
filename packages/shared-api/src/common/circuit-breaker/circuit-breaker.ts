import { ApiError } from '../errors/api-error';
import type { CircuitBreakerConfig, CircuitState, CircuitStats } from './circuit-breaker.types';

export const DEFAULT_CIRCUIT_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 5,
  successThreshold: 2,
  openMs: 30_000,
};

export class CircuitOpenError extends ApiError {
  constructor() {
    super('Circuit breaker is open', { code: 'CIRCUIT_OPEN', status: 503 });
    this.name = 'CircuitOpenError';
  }
}

/** Simple per-key circuit breaker. */
export class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures = 0;
  private successes = 0;
  private openedAt: number | null = null;

  constructor(private readonly config: CircuitBreakerConfig = DEFAULT_CIRCUIT_CONFIG) {}

  get stats(): CircuitStats {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      openedAt: this.openedAt,
    };
  }

  canPass(): boolean {
    if (this.state === 'closed') return true;
    if (this.state === 'open') {
      if (this.openedAt !== null && Date.now() - this.openedAt >= this.config.openMs) {
        this.state = 'half-open';
        this.successes = 0;
        return true;
      }
      return false;
    }
    return true; // half-open
  }

  onSuccess(): void {
    this.failures = 0;
    if (this.state === 'half-open') {
      this.successes += 1;
      if (this.successes >= this.config.successThreshold) {
        this.state = 'closed';
        this.successes = 0;
      }
    }
  }

  onFailure(): void {
    this.failures += 1;
    if (this.state === 'half-open' || this.failures >= this.config.failureThreshold) {
      this.state = 'open';
      this.openedAt = Date.now();
    }
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.canPass()) throw new CircuitOpenError();
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
}

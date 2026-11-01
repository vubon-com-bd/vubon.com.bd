export type CircuitState = 'closed' | 'open' | 'half-open';

export interface CircuitBreakerConfig {
  readonly failureThreshold: number;
  readonly successThreshold: number;
  readonly openMs: number;
}

export interface CircuitStats {
  readonly state: CircuitState;
  readonly failures: number;
  readonly successes: number;
  readonly openedAt: number | null;
}

/**
 * Health check types.
 * NOTE: These are TRANSPORT shapes (API layer).
 * If shared-types has a HealthStatus type, prefer importing from there.
 */
export type HealthStatus = 'ok' | 'degraded' | 'down';

export interface HealthResponse {
  readonly status: HealthStatus;
  readonly uptimeMs?: number;
  readonly version?: string;
  readonly checks?: readonly {
    readonly name: string;
    readonly status: HealthStatus;
    readonly message?: string;
  }[];
}

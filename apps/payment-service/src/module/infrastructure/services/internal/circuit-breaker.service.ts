/**
 * CircuitBreakerService — protect gateway calls from cascading failures
 * @module payment-service/infrastructure/services/internal
 *
 * Simple 3-state breaker: CLOSED → OPEN → HALF_OPEN.
 * Per-key isolation so one bad gateway doesn't affect others.
 */
import { Injectable, Logger } from '@nestjs/common';

export const CIRCUIT_BREAKER_SERVICE = Symbol('CIRCUIT_BREAKER_SERVICE');

type State = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface StatefulEntry {
  state: State;
  failures: number;
  lastFailureAt: number;
  openedUntil: number;
}

const FAILURE_THRESHOLD = 5;
const OPEN_DURATION_MS = 30_000;
const HALF_OPEN_PROBE_LIMIT = 1;

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private readonly registry = new Map<string, StatefulEntry>();

  private getEntry(key: string): StatefulEntry {
    let entry = this.registry.get(key);
    if (!entry) {
      entry = { state: 'CLOSED', failures: 0, lastFailureAt: 0, openedUntil: 0 };
      this.registry.set(key, entry);
    }
    return entry;
  }

  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const entry = this.getEntry(key);

    if (entry.state === 'OPEN') {
      if (Date.now() >= entry.openedUntil) {
        entry.state = 'HALF_OPEN';
        this.logger.log(`[${key}] circuit → HALF_OPEN`);
      } else {
        throw new Error(`Circuit open for "${key}" — try again later`);
      }
    }

    try {
      const result = await fn();
      if (entry.state !== 'CLOSED') {
        this.logger.log(`[${key}] circuit → CLOSED (recovered)`);
      }
      entry.state = 'CLOSED';
      entry.failures = 0;
      return result;
    } catch (err) {
      entry.failures += 1;
      entry.lastFailureAt = Date.now();

      if (entry.state === 'HALF_OPEN' || entry.failures >= FAILURE_THRESHOLD) {
        entry.state = 'OPEN';
        entry.openedUntil = Date.now() + OPEN_DURATION_MS;
        this.logger.warn(
          `[${key}] circuit → OPEN (failures=${entry.failures}) for ${OPEN_DURATION_MS}ms`,
        );
      }
      throw err;
    }
  }

  getState(key: string): State {
    const entry = this.getEntry(key);
    if (entry.state === 'OPEN' && Date.now() >= entry.openedUntil) {
      return 'HALF_OPEN';
    }
    return entry.state;
  }

  reset(key: string): void {
    this.registry.delete(key);
    this.logger.log(`[${key}] circuit reset`);
  }

  HALF_OPEN_PROBE_LIMIT = HALF_OPEN_PROBE_LIMIT;
}

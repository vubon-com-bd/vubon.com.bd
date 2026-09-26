import { Injectable, Logger } from '@nestjs/common';
import { GATEWAY_CONFIG } from '../../config/gateway.config';

type State = 'closed' | 'open' | 'half-open';

interface CircuitEntry {
  state: State;
  failures: number;
  openedAt: number;
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private readonly circuits = new Map<string, CircuitEntry>();

  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const entry = this.circuits.get(key) ?? { state: 'closed', failures: 0, openedAt: 0 };

    if (entry.state === 'open') {
      const elapsed = Date.now() - entry.openedAt;
      if (elapsed < GATEWAY_CONFIG.circuitBreakerResetMs) {
        throw new Error(`Circuit breaker open for ${key}`);
      }
      entry.state = 'half-open';
      this.circuits.set(key, entry);
    }

    try {
      const result = await fn();
      this.circuits.set(key, { state: 'closed', failures: 0, openedAt: 0 });
      return result;
    } catch (error) {
      entry.failures += 1;
      if (entry.failures >= GATEWAY_CONFIG.circuitBreakerThreshold) {
        entry.state = 'open';
        entry.openedAt = Date.now();
        this.logger.warn(`Circuit breaker opened for ${key}`);
      }
      this.circuits.set(key, entry);
      throw error;
    }
  }

  reset(key: string): void {
    this.circuits.delete(key);
  }
}

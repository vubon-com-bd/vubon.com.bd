/**
 * Metrics Service
 * @module shared-kernel/infrastructure/observability
 */
import { Injectable } from '@nestjs/common';
import { MONITORING_CONFIG } from '@vubon/shared-config/common';

@Injectable()
export class MetricsService {
  private readonly counters = new Map<string, number>();
  private readonly gauges = new Map<string, number>();
  private readonly timers = new Map<string, number[]>();

  increment(name: string, delta = 1): void {
    if (!MONITORING_CONFIG.metricsEnabled) return;
    this.counters.set(name, (this.counters.get(name) ?? 0) + delta);
  }

  gauge(name: string, value: number): void {
    if (!MONITORING_CONFIG.metricsEnabled) return;
    this.gauges.set(name, value);
  }

  observe(name: string, valueMs: number): void {
    if (!MONITORING_CONFIG.metricsEnabled) return;
    const list = this.timers.get(name) ?? [];
    list.push(valueMs);
    this.timers.set(name, list);
  }

  snapshot(): Readonly<Record<string, unknown>> {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      timers: Object.fromEntries(
        Array.from(this.timers.entries()).map(([key, values]) => [
          key,
          {
            count: values.length,
            avg: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
          },
        ])
      ),
    };
  }
}

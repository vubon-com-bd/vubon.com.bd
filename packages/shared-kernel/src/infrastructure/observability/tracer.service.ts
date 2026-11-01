/**
 * Tracer Service
 * @module shared-kernel/infrastructure/observability
 */
import { Injectable } from '@nestjs/common';
import { TRACING_CONFIG } from '@vubon/shared-config/common';
import { randomBytes } from '@vubon/shared-utils/infrastructure';

export interface SpanContext {
  readonly traceId: string;
  readonly spanId: string;
  readonly parentSpanId?: string;
  readonly startedAt: number;
  readonly tags: Readonly<Record<string, string | number | boolean>>;
}

@Injectable()
export class TracerService {
  startSpan(name: string, parentSpanId?: string): SpanContext {
    const bytes = randomBytes(16);
    const traceId = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

    return {
      traceId,
      spanId: traceId.slice(0, 16),
      parentSpanId,
      startedAt: Date.now(),
      tags: { name, service: TRACING_CONFIG.serviceName },
    };
  }

  endSpan(span: SpanContext): number {
    return Date.now() - span.startedAt;
  }

  get enabled(): boolean {
    return TRACING_CONFIG.enabled;
  }
}

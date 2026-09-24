import { Injectable, Logger } from '@nestjs/common';
import { EVENT_CONFIG } from '../../config/event.config';

export interface RawEvent {
  readonly name: string;
  readonly source: string;
  readonly timestamp: Date;
  readonly payload: Record<string, unknown>;
  readonly userId?: string;
  readonly sessionId?: string;
}

export interface ProcessedEvent extends RawEvent {
  readonly enriched: {
    readonly receivedAt: string;
    readonly payloadSize: number;
    readonly payloadKeys: readonly string[];
    readonly isRecent: boolean;
  };
}

@Injectable()
export class EventProcessorService {
  private readonly logger = new Logger(EventProcessorService.name);

  /**
   * Enrich a raw event with derived metadata.
   * Also validates size and dedupe window.
   */
  process(raw: RawEvent): ProcessedEvent {
    const payloadSize = JSON.stringify(raw.payload).length;
    if (payloadSize > EVENT_CONFIG.maxPayloadBytes) {
      throw new Error(`Event payload exceeds ${EVENT_CONFIG.maxPayloadBytes} bytes`);
    }

    const payloadKeys = Object.keys(raw.payload);
    if (payloadKeys.length > EVENT_CONFIG.maxPayloadKeys) {
      throw new Error(`Too many payload keys (max ${EVENT_CONFIG.maxPayloadKeys})`);
    }

    const isRecent =
      Date.now() - raw.timestamp.getTime() < EVENT_CONFIG.dedupeWindowMs;

    this.logger.debug(`Processed event: ${raw.name} (${raw.source})`);

    return {
      ...raw,
      enriched: {
        receivedAt: new Date().toISOString(),
        payloadSize,
        payloadKeys,
        isRecent,
      },
    };
  }

  /**
   * Dedupe a batch of events by composite key.
   */
  dedupe(events: readonly RawEvent[]): readonly RawEvent[] {
    const seen = new Set<string>();
    const out: RawEvent[] = [];
    for (const e of events) {
      const key = `${e.name}:${e.source}:${e.userId ?? 'anon'}:${e.timestamp.getTime()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(e);
    }
    return out;
  }
}

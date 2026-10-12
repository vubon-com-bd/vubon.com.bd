/**
 * Event Ingestion Service
 * @module analytics-service/domain/services
 *
 * Analytics event ingestion-এর core business logic।
 * Business Rule:
 * - Duplicate event (same id) → reject
 * - Invalid event → mark failed
 * - Bulk ingestion supported
 * - Rate limiting per source (soft check)
 */
import { EventEntity } from '../entities/event.entity.js';
import { EventIdVO } from '../value-objects/primitives/event-id.vo.js';
import { EventVO } from '../value-objects/composites/event.vo.js';
import { EventValidationService } from './event-validation.service.js';
import { EventEnrichmentService } from './event-enrichment.service.js';

export interface IngestionResult {
  readonly accepted: boolean;
  readonly eventId: string;
  readonly reason?: string;
  readonly entity?: EventEntity;
}

export interface IngestionContext {
  readonly now: string;
  readonly existingEventId?: string;
  readonly maxEventsPerSecond?: number;
  readonly recentEventCount?: number;
}

export class EventIngestionService {
  constructor(
    private readonly validator: EventValidationService,
    private readonly enricher: EventEnrichmentService
  ) {}

  /**
   * Single event ingest
   */
  ingest(event: EventVO, context: IngestionContext): IngestionResult {
    // 1. Deduplication
    if (context.existingEventId === event.id.value) {
      return {
        accepted: false,
        eventId: event.id.value,
        reason: 'Duplicate event',
      };
    }

    // 2. Rate limiting
    if (
      context.maxEventsPerSecond !== undefined &&
      context.recentEventCount !== undefined &&
      context.recentEventCount >= context.maxEventsPerSecond
    ) {
      return {
        accepted: false,
        eventId: event.id.value,
        reason: 'Rate limit exceeded',
      };
    }

    // 3. Validation
    const validation = this.validator.validate(event);
    if (!validation.valid) {
      return {
        accepted: false,
        eventId: event.id.value,
        reason: `Validation failed: ${validation.errors.join(', ')}`,
      };
    }

    // 4. Enrichment
    const enriched = this.enricher.enrich(event);

    // 5. Create entity
    const entity = EventEntity.receive({
      event: enriched,
      now: context.now,
    });

    return {
      accepted: true,
      eventId: event.id.value,
      entity,
    };
  }

  /**
   * Bulk ingest with partial success
   */
  ingestBatch(
    events: readonly EventVO[],
    context: Omit<IngestionContext, 'existingEventId' | 'recentEventCount'>
  ): readonly IngestionResult[] {
    const seenIds = new Set<string>();
    const results: IngestionResult[] = [];

    for (const event of events) {
      // Local dedup within batch
      if (seenIds.has(event.id.value)) {
        results.push({
          accepted: false,
          eventId: event.id.value,
          reason: 'Duplicate within batch',
        });
        continue;
      }
      seenIds.add(event.id.value);

      results.push(this.ingest(event, context));
    }

    return results;
  }

  /**
   * Check if event should be accepted (dry-run)
   */
  canIngest(event: EventVO, context: IngestionContext): boolean {
    return this.ingest(event, context).accepted;
  }
}

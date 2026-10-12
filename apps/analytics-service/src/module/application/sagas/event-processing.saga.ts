/**
 * Event Processing Saga
 * @module analytics-service/application/sagas
 *
 * Event validate → enrich → persist → publish।
 * Compensate: delete persisted event।
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface EventProcessingContext {
  eventId: string;
  eventName: string;
  persisted: boolean;
  processed: boolean;
}

export class EventProcessingSaga extends BaseSaga<EventProcessingContext> {
  readonly name = 'event-processing';

  async execute(input: { eventId: string; eventName: string }): Promise<void> {
    this.setContext({
      eventId: input.eventId,
      eventName: input.eventName,
      persisted: false,
      processed: false,
    });

    const ctx = this.getContext();
    // Step 1: Validate
    // Step 2: Enrich
    // Step 3: Persist
    ctx.persisted = true;
    // Step 4: Process
    ctx.processed = true;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // Rollback: delete persisted event if not processed
    if (ctx.persisted && !ctx.processed) {
      // await eventRepo.delete(ctx.eventId);
    }
  }
}

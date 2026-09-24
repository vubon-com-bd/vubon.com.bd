import { EventEntity } from '../entities/event.entity';

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export class EventValidationService {
  validate(event: EventEntity): ValidationResult {
    const errors: string[] = [];

    if (!event.name.value) errors.push('name is required');
    if (!event.source.value) errors.push('source is required');
    if (event.timestamp.epochMs > Date.now() + 60_000) {
      errors.push('timestamp in the future');
    }
    if (event.payload.sizeBytes > 64 * 1024) {
      errors.push('payload too large');
    }

    return { valid: errors.length === 0, errors };
  }

  validateBatch(events: readonly EventEntity[]): readonly ValidationResult[] {
    return events.map((e) => this.validate(e));
  }
}

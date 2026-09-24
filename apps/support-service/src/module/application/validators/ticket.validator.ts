import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketValidator {
  validate(input: unknown): unknown {
    if (!input || typeof input !== 'object') {
      throw new Error('Ticket input must be an object');
    }
    const data = input as Record<string, unknown>;
    if (typeof data.subject !== 'string' || data.subject.trim().length < 3) {
      throw new Error('Ticket subject must be at least 3 characters');
    }
    if (typeof data.description !== 'string' || data.description.trim().length === 0) {
      throw new Error('Ticket description is required');
    }
    return input;
  }
}

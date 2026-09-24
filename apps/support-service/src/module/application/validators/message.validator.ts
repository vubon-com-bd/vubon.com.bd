import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageValidator {
  validate(input: unknown): unknown {
    if (!input || typeof input !== 'object') {
      throw new Error('Message input must be an object');
    }
    const data = input as Record<string, unknown>;
    if (typeof data.content !== 'string' || data.content.trim().length === 0) {
      throw new Error('Message content is required');
    }
    if (typeof data.content === 'string' && data.content.length > 10000) {
      throw new Error('Message content exceeds 10000 characters');
    }
    return input;
  }
}

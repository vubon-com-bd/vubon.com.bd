import { Injectable } from '@nestjs/common';
import type { SendMessageRequestDto } from '../dtos/requests/message.request.dto';

@Injectable()
export class MessageValidator {
  validate(input: SendMessageRequestDto): void {
    if (!input.content || input.content.trim().length === 0) {
      throw new Error('Message content is required');
    }
    if (input.content.length > 10000) {
      throw new Error('Message content must not exceed 10000 characters');
    }
  }
}

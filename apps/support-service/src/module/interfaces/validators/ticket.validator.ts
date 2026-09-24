import { Injectable } from '@nestjs/common';
import type { CreateTicketRequestDto } from '../dtos/requests/ticket.request.dto';

@Injectable()
export class TicketValidator {
  validateCreate(input: CreateTicketRequestDto): void {
    if (!input.subject || input.subject.trim().length < 3) {
      throw new Error('Ticket subject must be at least 3 characters');
    }
    if (!input.description || input.description.trim().length === 0) {
      throw new Error('Ticket description is required');
    }
    if (input.subject.length > 200) {
      throw new Error('Ticket subject must not exceed 200 characters');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { TicketNumberVO } from '../../../domain/value-objects/primitives/ticket-number.vo';

@Injectable()
export class TicketNumberGeneratorService {
  generate(prefix = 'TKT'): TicketNumberVO {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = randomBytes(3).toString('hex').toUpperCase();
    return TicketNumberVO.create(`${prefix}-${timestamp}-${random}`);
  }
}

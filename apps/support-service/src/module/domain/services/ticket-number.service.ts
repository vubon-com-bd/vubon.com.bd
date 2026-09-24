import { randomBytes } from 'node:crypto';

export class TicketNumberService {
  generate(prefix = 'TKT'): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = randomBytes(3).toString('hex').toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }
}

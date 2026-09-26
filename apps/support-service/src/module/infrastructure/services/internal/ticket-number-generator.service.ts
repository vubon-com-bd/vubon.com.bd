/**
 * TicketNumberGeneratorService — generates TKT-XXXXXX
 * @module support-service/infrastructure/services/internal
 *
 * Rule: pure adapter, no business logic
 */
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { TicketNumberVO } from '../../../domain/value-objects/primitives/ticket-number.vo';

@Injectable()
export class TicketNumberGeneratorService {
  generateFromSequence(sequence: number): TicketNumberVO {
    return TicketNumberVO.fromSequence(sequence);
  }

  generateRandom(): TicketNumberVO {
    const random = randomBytes(3).toString('hex');
    const numeric = Number.parseInt(random, 16) % 999999;
    return TicketNumberVO.fromSequence(numeric || 1);
  }
}

/**
 * TicketSatisfactionIdVO — Satisfaction survey record identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'tsat_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class TicketSatisfactionIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketSatisfactionIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TicketSatisfactionId must be a string', 'ticketSatisfactionId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `TicketSatisfactionId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'ticketSatisfactionId',
      );
    }
    return new TicketSatisfactionIdVO(trimmed);
  }

  static generate(): TicketSatisfactionIdVO {
    const suffix = Date.now().toString(36);
    return TicketSatisfactionIdVO.create(`${PREFIX}${suffix}`);
  }
}

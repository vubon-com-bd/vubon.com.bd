/**
 * TicketEscalationIdVO — Escalation record identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'tesc_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class TicketEscalationIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketEscalationIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TicketEscalationId must be a string', 'ticketEscalationId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `TicketEscalationId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'ticketEscalationId',
      );
    }
    return new TicketEscalationIdVO(trimmed);
  }

  static generate(): TicketEscalationIdVO {
    const suffix = Date.now().toString(36);
    return TicketEscalationIdVO.create(`${PREFIX}${suffix}`);
  }
}

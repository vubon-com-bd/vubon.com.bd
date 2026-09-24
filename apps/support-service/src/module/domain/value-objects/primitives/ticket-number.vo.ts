import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const TICKET_NUMBER_PATTERN = /^TKT-\d{6,}$/;

export class TicketNumberVO extends BaseCodeVO {
  static create(value: string): TicketNumberVO {
    BaseCodeVO.validateNonEmpty(value, 'TicketNumber');
    if (!TICKET_NUMBER_PATTERN.test(value)) {
      throw new Error(`Invalid ticket number format: ${value}`);
    }
    return new TicketNumberVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

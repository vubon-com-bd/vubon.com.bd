import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { TICKET_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(TICKET_TYPE));

export class TicketTypeVO extends BaseTypeVO<string> {
  static create(value: string): TicketTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid ticket type: ${value}`);
    }
    return new TicketTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

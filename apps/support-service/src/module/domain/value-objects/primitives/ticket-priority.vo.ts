import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { TICKET_PRIORITY } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(TICKET_PRIORITY));

export class TicketPriorityVO extends BaseTypeVO<string> {
  static create(value: string): TicketPriorityVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid ticket priority: ${value}`);
    }
    return new TicketPriorityVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

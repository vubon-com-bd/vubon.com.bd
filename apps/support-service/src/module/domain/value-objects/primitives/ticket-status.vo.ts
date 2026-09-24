import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(TICKET_STATUS));

export class TicketStatusVO extends BaseStatusVO<string> {
  static create(value: string): TicketStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid ticket status: ${value}`);
    }
    return new TicketStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

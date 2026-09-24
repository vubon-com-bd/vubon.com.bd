import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TicketEscalationIdVO extends BaseIdVO {
  static create(value: string): TicketEscalationIdVO {
    return new TicketEscalationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

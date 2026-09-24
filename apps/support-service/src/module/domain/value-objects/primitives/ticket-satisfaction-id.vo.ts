import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TicketSatisfactionIdVO extends BaseIdVO {
  static create(value: string): TicketSatisfactionIdVO {
    return new TicketSatisfactionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

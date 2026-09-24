import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class TicketDescriptionVO extends BaseCodeVO {
  static create(value: string): TicketDescriptionVO {
    BaseCodeVO.validateNonEmpty(value, 'TicketDescription');
    const trimmed = value.trim();
    if (trimmed.length > 5000) {
      throw new Error('TicketDescription exceeds 5000 characters');
    }
    return new TicketDescriptionVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}

import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>(['L1', 'L2', 'L3', 'L4']);

export class TicketEscalationLevelVO extends BaseTypeVO<string> {
  static create(value: string): TicketEscalationLevelVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid escalation level: ${value}`);
    }
    return new TicketEscalationLevelVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

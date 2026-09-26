/**
 * TicketEscalationLevelVO — Escalation severity level (1-4)
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 * Business: Level 1 = team lead, Level 4 = management
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TicketEscalationLevelValue = '1' | '2' | '3' | '4';

const LEVEL_SET: ReadonlySet<string> = new Set(['1', '2', '3', '4']);
const LEVEL_LABELS: Readonly<Record<string, string>> = {
  '1': 'team_lead',
  '2': 'supervisor',
  '3': 'manager',
  '4': 'executive',
};

export class TicketEscalationLevelVO extends BaseTypeVO<TicketEscalationLevelValue> {
  private constructor(value: TicketEscalationLevelValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return LEVEL_SET;
  }

  static create(raw: string | number): TicketEscalationLevelVO {
    const normalized = String(raw).trim();
    if (!LEVEL_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid escalation level: ${raw} (allowed: 1-4)`,
        'ticketEscalationLevel',
      );
    }
    return new TicketEscalationLevelVO(normalized as TicketEscalationLevelValue);
  }

  static first(): TicketEscalationLevelVO {
    return new TicketEscalationLevelVO('1');
  }

  static highest(): TicketEscalationLevelVO {
    return new TicketEscalationLevelVO('4');
  }

  get numeric(): number {
    return Number.parseInt(this.value, 10);
  }

  get label(): string {
    return LEVEL_LABELS[this.value] ?? 'unknown';
  }

  isHighest(): boolean {
    return this.value === '4';
  }

  isFirst(): boolean {
    return this.value === '1';
  }

  escalate(): TicketEscalationLevelVO {
    if (this.isHighest()) return this;
    return new TicketEscalationLevelVO(String(this.numeric + 1) as TicketEscalationLevelValue);
  }

  deescalate(): TicketEscalationLevelVO {
    if (this.isFirst()) return this;
    return new TicketEscalationLevelVO(String(this.numeric - 1) as TicketEscalationLevelValue);
  }
}

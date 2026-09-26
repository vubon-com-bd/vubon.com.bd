/**
 * AgentTypeVO — Support agent role type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 * Values from SUPPORT_AGENT_TYPE: junior, senior, lead, supervisor, manager, specialist
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_AGENT_TYPE } from '@vubon/shared-constants/support';

export type AgentTypeValue =
  (typeof SUPPORT_AGENT_TYPE)[keyof typeof SUPPORT_AGENT_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_AGENT_TYPE),
);

const SUPERVISORY: ReadonlySet<string> = new Set<string>([
  SUPPORT_AGENT_TYPE.LEAD,
  SUPPORT_AGENT_TYPE.SUPERVISOR,
  SUPPORT_AGENT_TYPE.MANAGER,
]);

const SENIOR_LEVEL: ReadonlySet<string> = new Set<string>([
  SUPPORT_AGENT_TYPE.SENIOR,
  SUPPORT_AGENT_TYPE.SPECIALIST,
]);

export class AgentTypeVO extends BaseTypeVO<AgentTypeValue> {
  private constructor(value: AgentTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): AgentTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid agent type: ${raw}`,
        'agentType',
      );
    }
    return new AgentTypeVO(normalized as AgentTypeValue);
  }

  isSupervisory(): boolean {
    return SUPERVISORY.has(this.value);
  }

  isSenior(): boolean {
    return SENIOR_LEVEL.has(this.value);
  }

  canHandleEscalations(): boolean {
    return this.isSupervisory() || this.isSenior();
  }
}

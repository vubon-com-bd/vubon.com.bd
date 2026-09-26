/**
 * AgentStatusVO — Support agent availability status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 * Values from SUPPORT_AGENT_STATUS: online, offline, away, busy, break, in_meeting
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_AGENT_STATUS } from '@vubon/shared-constants/support';

export type AgentStatusValue =
  (typeof SUPPORT_AGENT_STATUS)[keyof typeof SUPPORT_AGENT_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_AGENT_STATUS),
);

const AVAILABLE: ReadonlySet<string> = new Set<string>([
  SUPPORT_AGENT_STATUS.ONLINE,
  SUPPORT_AGENT_STATUS.AWAY,
]);

const BUSY: ReadonlySet<string> = new Set<string>([
  SUPPORT_AGENT_STATUS.BUSY,
  SUPPORT_AGENT_STATUS.BREAK,
  SUPPORT_AGENT_STATUS.IN_MEETING,
]);

export class AgentStatusVO extends BaseStatusVO<AgentStatusValue> {
  private constructor(value: AgentStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): AgentStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid agent status: ${raw}`,
        'agentStatus',
      );
    }
    return new AgentStatusVO(normalized as AgentStatusValue);
  }

  static online(): AgentStatusVO {
    return new AgentStatusVO(SUPPORT_AGENT_STATUS.ONLINE);
  }

  static offline(): AgentStatusVO {
    return new AgentStatusVO(SUPPORT_AGENT_STATUS.OFFLINE);
  }

  isOnline(): boolean {
    return this.value === SUPPORT_AGENT_STATUS.ONLINE;
  }

  isOffline(): boolean {
    return this.value === SUPPORT_AGENT_STATUS.OFFLINE;
  }

  isAvailable(): boolean {
    return AVAILABLE.has(this.value);
  }

  isBusy(): boolean {
    return BUSY.has(this.value);
  }

  canAcceptNewTicket(): boolean {
    return this.value === SUPPORT_AGENT_STATUS.ONLINE;
  }
}

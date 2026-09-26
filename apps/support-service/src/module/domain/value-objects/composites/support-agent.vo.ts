/**
 * SupportAgentVO — Support agent composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AgentIdVO } from '../primitives/agent-id.vo';
import { AgentStatusVO } from '../primitives/agent-status.vo';
import { AgentTypeVO } from '../primitives/agent-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { TeamIdVO } from '../primitives/team-id.vo';

export interface SupportAgentVOProps {
  readonly id: AgentIdVO;
  readonly userId: UserIdVO;
  readonly status: AgentStatusVO;
  readonly type: AgentTypeVO;
  readonly teamId?: TeamIdVO;
  readonly maxConcurrentTickets?: number;
  readonly currentLoad?: number;
}

export class SupportAgentVO extends BaseVO<Readonly<SupportAgentVOProps>> {
  private constructor(props: SupportAgentVOProps) {
    super(
      Object.freeze({
        ...props,
        maxConcurrentTickets: props.maxConcurrentTickets ?? 5,
        currentLoad: props.currentLoad ?? 0,
      }),
    );
  }

  static create(props: SupportAgentVOProps): SupportAgentVO {
    if (!props.id || !props.userId) {
      throw new ValidationError(
        'SupportAgentVO requires id and userId',
        'supportAgent',
      );
    }
    return new SupportAgentVO(props);
  }

  get id(): AgentIdVO {
    return this.value.id;
  }

  get userId(): UserIdVO {
    return this.value.userId;
  }

  get isAvailable(): boolean {
    return this.value.status.isAvailable();
  }

  get isSupervisory(): boolean {
    return this.value.type.isSupervisory();
  }

  get currentLoad(): number {
    return this.value.currentLoad ?? 0;
  }

  get maxConcurrentTickets(): number {
    return this.value.maxConcurrentTickets ?? 5;
  }

  get hasCapacity(): boolean {
    return this.currentLoad < this.maxConcurrentTickets;
  }

  get canTakeTicket(): boolean {
    return this.isAvailable && this.hasCapacity;
  }

  get utilizationPercent(): number {
    return (this.currentLoad / this.maxConcurrentTickets) * 100;
  }
}

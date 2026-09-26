/**
 * SupportTeamEntity — Support team aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<TeamIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import {
  TeamCreatedEvent,
  TeamMemberAddedEvent,
} from '../events/team.events';

export interface CreateSupportTeamInput {
  readonly id: TeamIdVO;
  readonly name: TeamNameVO;
  readonly type: TeamTypeVO;
  readonly leadAgentId?: AgentIdVO;
  readonly now: string;
}

export interface SupportTeamSnapshot {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly isActive: boolean;
  readonly leadAgentId?: string;
  readonly memberIds: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

const MAX_MEMBERS = 100;

export class SupportTeamEntity extends AggregateRoot<TeamIdVO> {
  private _name: TeamNameVO;
  private readonly _type: TeamTypeVO;
  private _isActive: boolean;
  private _leadAgentId?: AgentIdVO;
  private _memberIds: readonly AgentIdVO[];

  private constructor(
    id: TeamIdVO,
    name: TeamNameVO,
    type: TeamTypeVO,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    leadAgentId?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._type = type;
    this._isActive = isActive;
    this._leadAgentId = leadAgentId;
    this._memberIds = Object.freeze([]);
  }

  static create(input: CreateSupportTeamInput): SupportTeamEntity {
    if (!input.id || !input.name) {
      throw new ValidationError(
        'SupportTeam requires id and name',
        'supportTeam',
      );
    }
    const now = input.now;
    const team = new SupportTeamEntity(
      input.id,
      input.name,
      input.type,
      true,
      now,
      now,
      input.leadAgentId,
    );
    if (input.leadAgentId) {
      team._memberIds = Object.freeze([input.leadAgentId]);
    }
    team.addDomainEvent(
      new TeamCreatedEvent(
        input.id,
        input.name,
        input.type.value,
        Date.parse(now),
      ),
    );
    return team;
  }

  static rehydrate(snapshot: SupportTeamSnapshot): SupportTeamEntity {
    const team = new SupportTeamEntity(
      TeamIdVO.create(snapshot.id),
      TeamNameVO.create(snapshot.name),
      TeamTypeVO.create(snapshot.type),
      snapshot.isActive,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.leadAgentId ? AgentIdVO.create(snapshot.leadAgentId) : undefined,
    );
    team._memberIds = Object.freeze(snapshot.memberIds.map((id) => AgentIdVO.create(id)));
    return team;
  }

  get name(): TeamNameVO {
    return this._name;
  }

  get type(): TeamTypeVO {
    return this._type;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get leadAgentId(): AgentIdVO | undefined {
    return this._leadAgentId;
  }

  get memberCount(): number {
    return this._memberIds.length;
  }

  get memberIds(): readonly AgentIdVO[] {
    return this._memberIds;
  }

  get isSpecialized(): boolean {
    return this._type.isSpecialized();
  }

  get hasLead(): boolean {
    return this._leadAgentId !== undefined;
  }

  rename(name: TeamNameVO, now: string): void {
    this._name = name;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  setLead(agentId: AgentIdVO, now: string): void {
    if (!this.isMember(agentId)) {
      throw new BusinessRuleError(
        'Lead must be a team member',
        'supportTeam.lead.must_be_member',
      );
    }
    this._leadAgentId = agentId;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  addMember(agentId: AgentIdVO, now: string): void {
    if (!this._isActive) {
      throw new BusinessRuleError('Team is inactive', 'supportTeam.inactive');
    }
    if (this.isMember(agentId)) {
      throw new BusinessRuleError(
        'Agent already in team',
        'supportTeam.member.duplicate',
      );
    }
    if (this._memberIds.length >= MAX_MEMBERS) {
      throw new BusinessRuleError(
        `Team supports max ${MAX_MEMBERS} members`,
        'supportTeam.members.limit',
      );
    }
    this._memberIds = Object.freeze([...this._memberIds, agentId]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new TeamMemberAddedEvent(this.id, agentId, Date.parse(now), this.version + 1),
    );
  }

  removeMember(agentId: AgentIdVO, now: string): void {
    if (!this.isMember(agentId)) return;
    if (this._leadAgentId?.equals(agentId)) {
      throw new BusinessRuleError(
        'Cannot remove the team lead',
        'supportTeam.remove.lead',
      );
    }
    this._memberIds = Object.freeze(this._memberIds.filter((m) => !m.equals(agentId)));
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  isMember(agentId: AgentIdVO): boolean {
    return this._memberIds.some((m) => m.equals(agentId));
  }

  deactivate(now: string): void {
    if (!this._isActive) return;
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): SupportTeamSnapshot {
    return {
      id: this.id.value,
      name: this._name.value,
      type: this._type.value,
      isActive: this._isActive,
      leadAgentId: this._leadAgentId?.value,
      memberIds: this._memberIds.map((m) => m.value),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

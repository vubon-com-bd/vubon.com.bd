import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TeamMemberIdVO } from '../value-objects/primitives/team-member-id.vo';
import { TeamRoleVO } from '../value-objects/primitives/team-role.vo';
import { TeamPermissionVO } from '../value-objects/primitives/team-permission.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  TeamMemberAddedEvent,
  TeamMemberRemovedEvent,
} from '../events/vendor-team.events';

export interface VendorTeamMemberEntityProps {
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly role: TeamRoleVO;
  readonly permissions: ReadonlyArray<TeamPermissionVO>;
  readonly invitedAt: Date;
  readonly joinedAt: Date | null;
}

export class VendorTeamEntity extends AggregateRoot<TeamMemberIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _userId: UserIdVO;
  private readonly _role: TeamRoleVO;
  private readonly _permissions: ReadonlyArray<TeamPermissionVO>;
  private readonly _invitedAt: Date;
  private readonly _joinedAt: Date | null;

  private constructor(
    id: TeamMemberIdVO,
    props: VendorTeamMemberEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._userId = props.userId;
    this._role = props.role;
    this._permissions = Object.freeze([...props.permissions]);
    this._invitedAt = props.invitedAt;
    this._joinedAt = props.joinedAt;
  }

  static create(props: VendorTeamMemberEntityProps): VendorTeamEntity {
    const now = new Date().toISOString();
    const id = TeamMemberIdVO.create(crypto.randomUUID());
    const entity = new VendorTeamEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new TeamMemberAddedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.userId.value,
        props.role.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: TeamMemberIdVO,
    props: VendorTeamMemberEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorTeamEntity {
    return new VendorTeamEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  remove(): VendorTeamEntity {
    const now = new Date();
    const updated = new VendorTeamEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now.toISOString(),
      now.toISOString(),
    );
    updated.addDomainEvent(
      new TeamMemberRemovedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        this._userId.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get userId(): UserIdVO { return this._userId; }
  get role(): TeamRoleVO { return this._role; }
  get permissions(): ReadonlyArray<TeamPermissionVO> { return this._permissions; }
  get invitedAt(): Date { return this._invitedAt; }
  get joinedAt(): Date | null { return this._joinedAt; }

  private _toProps(): VendorTeamMemberEntityProps {
    return {
      vendorId: this._vendorId,
      userId: this._userId,
      role: this._role,
      permissions: this._permissions,
      invitedAt: this._invitedAt,
      joinedAt: this._joinedAt,
    };
  }
}

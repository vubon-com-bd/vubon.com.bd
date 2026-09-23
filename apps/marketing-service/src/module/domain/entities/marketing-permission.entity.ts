import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MarketingPermissionVO } from '../value-objects/composites/marketing-permission.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface MarketingPermissionEntityProps {
  readonly userId: UserIdVO;
  readonly permission: MarketingPermissionVO;
}

export class MarketingPermissionEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _permission: MarketingPermissionVO;

  private constructor(
    id: string,
    props: MarketingPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._permission = props.permission;
  }

  static create(props: MarketingPermissionEntityProps): MarketingPermissionEntity {
    const now = new Date().toISOString();
    return new MarketingPermissionEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: MarketingPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MarketingPermissionEntity {
    return new MarketingPermissionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get permission(): MarketingPermissionVO { return this._permission; }
}

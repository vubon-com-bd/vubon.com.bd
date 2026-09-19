import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserPreferencesEntityProps {
  readonly userId: UserIdVO;
  readonly marketingEmails: boolean;
  readonly productUpdates: boolean;
  readonly orderUpdates: boolean;
  readonly securityAlerts: boolean;
  readonly newsletter: boolean;
}

export class UserPreferencesEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _marketingEmails: boolean;
  private readonly _productUpdates: boolean;
  private readonly _orderUpdates: boolean;
  private readonly _securityAlerts: boolean;
  private readonly _newsletter: boolean;

  private constructor(
    id: UserIdVO,
    props: UserPreferencesEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._marketingEmails = props.marketingEmails;
    this._productUpdates = props.productUpdates;
    this._orderUpdates = props.orderUpdates;
    this._securityAlerts = props.securityAlerts;
    this._newsletter = props.newsletter;
  }

  static create(props: UserPreferencesEntityProps): UserPreferencesEntity {
    const now = new Date().toISOString();
    return new UserPreferencesEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserPreferencesEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserPreferencesEntity {
    return new UserPreferencesEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  toggleMarketing(enabled: boolean): UserPreferencesEntity {
    return new UserPreferencesEntity(
      this.id,
      { ...this._toProps(), marketingEmails: enabled },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get marketingEmails(): boolean { return this._marketingEmails; }
  get productUpdates(): boolean { return this._productUpdates; }
  get orderUpdates(): boolean { return this._orderUpdates; }
  get securityAlerts(): boolean { return this._securityAlerts; }
  get newsletter(): boolean { return this._newsletter; }

  private _toProps(): UserPreferencesEntityProps {
    return {
      userId: this._userId,
      marketingEmails: this._marketingEmails,
      productUpdates: this._productUpdates,
      orderUpdates: this._orderUpdates,
      securityAlerts: this._securityAlerts,
      newsletter: this._newsletter,
    };
  }
}

import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PreferenceMatrixEntityProps {
  readonly userId: UserIdVO;
  readonly emailOptIn: boolean;
  readonly smsOptIn: boolean;
  readonly pushOptIn: boolean;
  readonly inAppOptIn: boolean;
  readonly webhookOptIn: boolean;
}

export class PreferenceMatrixEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _emailOptIn: boolean;
  private readonly _smsOptIn: boolean;
  private readonly _pushOptIn: boolean;
  private readonly _inAppOptIn: boolean;
  private readonly _webhookOptIn: boolean;

  private constructor(
    id: UserIdVO,
    props: PreferenceMatrixEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._emailOptIn = props.emailOptIn;
    this._smsOptIn = props.smsOptIn;
    this._pushOptIn = props.pushOptIn;
    this._inAppOptIn = props.inAppOptIn;
    this._webhookOptIn = props.webhookOptIn;
  }

  static create(props: PreferenceMatrixEntityProps): PreferenceMatrixEntity {
    const now = new Date().toISOString();
    return new PreferenceMatrixEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: PreferenceMatrixEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PreferenceMatrixEntity {
    return new PreferenceMatrixEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isOptedIn(channel: string): boolean {
    switch (channel) {
      case 'email': return this._emailOptIn;
      case 'sms': return this._smsOptIn;
      case 'push': return this._pushOptIn;
      case 'in_app': return this._inAppOptIn;
      case 'webhook': return this._webhookOptIn;
      default: return false;
    }
  }

  get userId(): UserIdVO { return this._userId; }
  get emailOptIn(): boolean { return this._emailOptIn; }
  get smsOptIn(): boolean { return this._smsOptIn; }
  get pushOptIn(): boolean { return this._pushOptIn; }
  get inAppOptIn(): boolean { return this._inAppOptIn; }
  get webhookOptIn(): boolean { return this._webhookOptIn; }
}

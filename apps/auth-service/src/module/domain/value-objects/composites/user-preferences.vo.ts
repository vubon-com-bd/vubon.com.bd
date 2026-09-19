import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserPreferencesProps {
  readonly userId: UserIdVO;
  readonly marketingEmails: boolean;
  readonly productUpdates: boolean;
  readonly orderUpdates: boolean;
  readonly securityAlerts: boolean;
  readonly newsletter: boolean;
}

export class UserPreferencesVO extends BaseVO<UserPreferencesProps> {
  private constructor(props: UserPreferencesProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserPreferencesProps): UserPreferencesVO {
    return new UserPreferencesVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get marketingEmails(): boolean { return this.value.marketingEmails; }
  get productUpdates(): boolean { return this.value.productUpdates; }
  get orderUpdates(): boolean { return this.value.orderUpdates; }
  get securityAlerts(): boolean { return this.value.securityAlerts; }
  get newsletter(): boolean { return this.value.newsletter; }
}

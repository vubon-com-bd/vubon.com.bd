import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface Auth2FaProps {
  readonly userId: UserIdVO;
  readonly isEnabled: boolean;
  readonly method: 'totp' | 'sms' | 'email' | 'backup_code';
  readonly backupCodesRemaining: number;
  readonly enabledAt: Date | null;
}

export class Auth2FaVO extends BaseVO<Auth2FaProps> {
  private constructor(props: Auth2FaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: Auth2FaProps): Auth2FaVO {
    return new Auth2FaVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get isEnabled(): boolean { return this.value.isEnabled; }
  get method(): Auth2FaProps['method'] { return this.value.method; }
  get backupCodesRemaining(): number { return this.value.backupCodesRemaining; }
  get enabledAt(): Date | null { return this.value.enabledAt; }
}

/**
 * Auth2FaVO — Snapshot of a user's 2FA configuration
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { MfaTypeVO } from '../primitives/mfa-type.vo';

export interface Auth2FaVOProps {
  readonly userId: UserIdVO;
  readonly primaryMethod: MfaTypeVO;
  readonly backupMethods: readonly MfaTypeVO[];
  readonly enabledAt?: number;
}

export class Auth2FaVO extends BaseVO<Auth2FaVOProps> {
  private constructor(props: Auth2FaVOProps) {
    super(props);
  }

  static of(props: Auth2FaVOProps): Auth2FaVO {
    if (props.backupMethods.some((m) => m.equals(props.primaryMethod))) {
      throw new Error('Backup methods must differ from primary');
    }
    return new Auth2FaVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get primaryMethod(): MfaTypeVO { return this.value.primaryMethod; }

  isEnabled(): boolean { return this.value.enabledAt !== undefined; }
  hasBackup(): boolean { return this.value.backupMethods.length > 0; }
}

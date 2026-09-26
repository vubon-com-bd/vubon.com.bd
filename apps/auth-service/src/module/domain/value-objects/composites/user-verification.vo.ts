/**
 * UserVerificationVO — Snapshot of a user's verification state
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { VerificationTypeVO } from '../primitives/verification-type.vo';
import { VerificationStatusVO } from '../primitives/verification-status.vo';

export interface UserVerificationVOProps {
  readonly userId: UserIdVO;
  readonly type: VerificationTypeVO;
  readonly status: VerificationStatusVO;
  readonly requestedAt: number;
  readonly completedAt?: number;
}

export class UserVerificationVO extends BaseVO<UserVerificationVOProps> {
  private constructor(props: UserVerificationVOProps) {
    super(props);
  }

  static of(props: UserVerificationVOProps): UserVerificationVO {
    if (props.completedAt && props.completedAt < props.requestedAt) {
      throw new Error('completedAt cannot precede requestedAt');
    }
    return new UserVerificationVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get type(): VerificationTypeVO { return this.value.type; }
  get status(): VerificationStatusVO { return this.value.status; }

  isComplete(): boolean {
    return this.value.status.isActive();
  }

  requiresDocument(): boolean {
    return this.value.type.requiresDocument();
  }
}

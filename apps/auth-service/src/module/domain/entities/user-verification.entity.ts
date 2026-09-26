/**
 * UserVerificationEntity — A single verification request
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { VerificationCodeVO } from '../value-objects/primitives/verification-code.vo';
import { VerificationTypeVO } from '../value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo';

export interface UserVerificationEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly type: VerificationTypeVO;
  readonly code: VerificationCodeVO;
  readonly status: VerificationStatusVO;
  readonly expiresAt: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserVerificationEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _type: VerificationTypeVO;
  private _code: VerificationCodeVO;
  private _status: VerificationStatusVO;
  private _expiresAt: number;

  private constructor(props: UserVerificationEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._type = props.type;
    this._code = props.code;
    this._status = props.status;
    this._expiresAt = props.expiresAt;
  }

  static create(props: UserVerificationEntityProps): UserVerificationEntity {
    return new UserVerificationEntity(props);
  }

  get type(): VerificationTypeVO { return this._type; }
  get status(): VerificationStatusVO { return this._status; }
  get expiresAt(): number { return this._expiresAt; }

  isExpired(now: number): boolean { return now >= this._expiresAt; }

  verify(input: VerificationCodeVO, now: number): void {
    if (this.isExpired(now)) {
      this._status = VerificationStatusVO.of('expired');
      throw new Error('Verification expired');
    }
    if (!this._code.equalsConstantTime(input)) {
      throw new Error('Verification code mismatch');
    }
    this._status = VerificationStatusVO.of('verified');
  }

  reject(): void { this._status = VerificationStatusVO.of('rejected'); }
}

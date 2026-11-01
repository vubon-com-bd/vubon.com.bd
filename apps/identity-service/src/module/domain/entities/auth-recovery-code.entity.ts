/**
 * AuthRecoveryCodeEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { RecoveryCodeValueVO } from '../value-objects/primitives/recovery-code-value.vo.js';
import { RecoveryCodeStatusVO } from '../value-objects/primitives/recovery-code-status.vo.js';

export interface AuthRecoveryCodeEntityProps {
  readonly authId: AuthIdVO;
  readonly code: RecoveryCodeValueVO;
  status: RecoveryCodeStatusVO;
  usedAt?: string;
  usedFromIp?: string;
  generatedAt: string;
  expiresAt?: string;
}

export class AuthRecoveryCodeEntity extends BaseEntity<string> {
  private props: AuthRecoveryCodeEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: AuthRecoveryCodeEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get authId(): AuthIdVO { return this.props.authId; }
  get code(): RecoveryCodeValueVO { return this.props.code; }
  get status(): RecoveryCodeStatusVO { return this.props.status; }
  get usedAt(): string | undefined { return this.props.usedAt; }
  get usedFromIp(): string | undefined { return this.props.usedFromIp; }
  get generatedAt(): string { return this.props.generatedAt; }
  get expiresAt(): string | undefined { return this.props.expiresAt; }

  isActive(): boolean { return this.props.status.isActive(); }
  isUsed(): boolean { return this.props.status.isUsed(); }
  isExpired(nowMs: number = Date.now()): boolean {
    if (!this.props.expiresAt) return false;
    return nowMs >= Date.parse(this.props.expiresAt);
  }
  canBeUsed(nowMs: number = Date.now()): boolean {
    return this.isActive() && !this.isExpired(nowMs);
  }

  markUsed(usedFromIp: string | undefined, now: string = new Date().toISOString()): void {
    if (!this.canBeUsed()) {
      throw new Error('Recovery code cannot be used');
    }
    this.props = {
      ...this.props,
      status: RecoveryCodeStatusVO.used(),
      usedAt: now,
      usedFromIp,
    };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  revoke(now: string = new Date().toISOString()): void {
    if (this.props.status.isRevoked()) return;
    this.props = { ...this.props, status: RecoveryCodeStatusVO.revoked() };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    authId: AuthIdVO;
    code: RecoveryCodeValueVO;
    expiresAt?: string;
    now: string;
  }): AuthRecoveryCodeEntity {
    return new AuthRecoveryCodeEntity(params.id, params.now, params.now, {
      authId: params.authId,
      code: params.code,
      status: RecoveryCodeStatusVO.active(),
      generatedAt: params.now,
      expiresAt: params.expiresAt,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: AuthRecoveryCodeEntityProps;
  }): AuthRecoveryCodeEntity {
    return new AuthRecoveryCodeEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}

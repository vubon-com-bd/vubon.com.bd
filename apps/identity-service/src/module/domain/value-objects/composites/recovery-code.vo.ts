/**
 * RecoveryCodeVO — Composite
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { RecoveryCodeValueVO } from '../primitives/recovery-code-value.vo.js';
import { RecoveryCodeStatusVO } from '../primitives/recovery-code-status.vo.js';

export interface RecoveryCodeVOProps {
  readonly id: string;
  readonly authId: AuthIdVO;
  readonly code: RecoveryCodeValueVO;
  readonly status: RecoveryCodeStatusVO;
  readonly usedAt?: string;
  readonly usedFromIp?: string;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RecoveryCodeVO extends BaseVO<RecoveryCodeVOProps> {
  private constructor(props: RecoveryCodeVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: RecoveryCodeVOProps): RecoveryCodeVO {
    return new RecoveryCodeVO(props);
  }

  static reconstitute(props: RecoveryCodeVOProps): RecoveryCodeVO {
    return new RecoveryCodeVO(props);
  }

  get id(): string { return this.value.id; }
  get authId(): AuthIdVO { return this.value.authId; }
  get code(): RecoveryCodeValueVO { return this.value.code; }
  get status(): RecoveryCodeStatusVO { return this.value.status; }
  get usedAt(): string | undefined { return this.value.usedAt; }
  get usedFromIp(): string | undefined { return this.value.usedFromIp; }
  get generatedAt(): string { return this.value.generatedAt; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.value.status.isActive(); }
  isUsed(): boolean { return this.value.status.isUsed(); }
  isExpired(nowMs: number = Date.now()): boolean {
    if (!this.value.expiresAt) return false;
    return nowMs >= Date.parse(this.value.expiresAt);
  }
  canBeUsed(nowMs: number = Date.now()): boolean {
    return this.isActive() && !this.isExpired(nowMs);
  }
}

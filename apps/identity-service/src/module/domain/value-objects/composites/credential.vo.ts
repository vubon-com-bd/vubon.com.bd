/**
 * CredentialVO — Password + history metadata
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { PasswordHashVO } from '../primitives/password-hash.vo.js';

export interface CredentialVOProps {
  readonly authId: AuthIdVO;
  readonly passwordHash: PasswordHashVO;
  readonly passwordChangedAt: string;
  readonly passwordExpiresAt?: string;
  readonly mustChangePassword: boolean;
  readonly previousHashes?: readonly PasswordHashVO[];
}

export class CredentialVO extends BaseVO<CredentialVOProps> {
  private constructor(props: CredentialVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CredentialVOProps): CredentialVO {
    const vo = new CredentialVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CredentialVOProps): CredentialVO {
    return new CredentialVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.previousHashes && v.previousHashes.length > 5) {
      throw new ValidationError(
        'previousHashes cannot exceed history count (5)',
        'previousHashes',
      );
    }
  }

  get authId(): AuthIdVO { return this.value.authId; }
  get passwordHash(): PasswordHashVO { return this.value.passwordHash; }
  get passwordChangedAt(): string { return this.value.passwordChangedAt; }
  get passwordExpiresAt(): string | undefined { return this.value.passwordExpiresAt; }
  get mustChangePassword(): boolean { return this.value.mustChangePassword; }
  get previousHashes(): readonly PasswordHashVO[] { return this.value.previousHashes ?? []; }

  isExpired(nowMs: number = Date.now()): boolean {
    if (!this.value.passwordExpiresAt) return false;
    return nowMs >= Date.parse(this.value.passwordExpiresAt);
  }

  matchesHistory(plainOrHash: string): boolean {
    return this.previousHashes.some((h) => h.value === plainOrHash);
  }
}

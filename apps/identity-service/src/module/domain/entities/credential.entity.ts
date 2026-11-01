/**
 * CredentialEntity — BaseEntity (child of Auth aggregate)
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { PasswordHashVO } from '../value-objects/primitives/password-hash.vo.js';

export interface CredentialEntityProps {
  readonly authId: AuthIdVO;
  readonly passwordHash: PasswordHashVO;
  readonly passwordChangedAt: string;
  readonly passwordExpiresAt?: string;
  readonly mustChangePassword: boolean;
  readonly previousHashes: readonly PasswordHashVO[];
}

export class CredentialEntity extends BaseEntity<string> {
  private _passwordHash: PasswordHashVO;
  private _passwordChangedAt: string;
  private _passwordExpiresAt?: string;
  private _mustChangePassword: boolean;
  private _previousHashes: PasswordHashVO[];

  private readonly _authId: AuthIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CredentialEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._passwordHash = props.passwordHash;
    this._passwordChangedAt = props.passwordChangedAt;
    this._passwordExpiresAt = props.passwordExpiresAt;
    this._mustChangePassword = props.mustChangePassword;
    this._previousHashes = [...props.previousHashes];
  }

  get authId(): AuthIdVO { return this._authId; }
  get passwordHash(): PasswordHashVO { return this._passwordHash; }
  get passwordChangedAt(): string { return this._passwordChangedAt; }
  get passwordExpiresAt(): string | undefined { return this._passwordExpiresAt; }
  get mustChangePassword(): boolean { return this._mustChangePassword; }
  get previousHashes(): readonly PasswordHashVO[] { return [...this._previousHashes]; }

  isExpired(nowMs: number = Date.now()): boolean {
    if (!this._passwordExpiresAt) return false;
    return nowMs >= Date.parse(this._passwordExpiresAt);
  }

  wasUsedBefore(candidateHash: string, historyCount = 5): boolean {
    if (this._passwordHash.value === candidateHash) return true;
    return this._previousHashes.slice(0, historyCount).some((h) => h.value === candidateHash);
  }

  changePassword(
    newHash: PasswordHashVO,
    expiresAt: string | undefined,
    historyCount: number,
    now: string = new Date().toISOString(),
  ): void {
    if (this.wasUsedBefore(newHash.value, historyCount)) {
      throw new BusinessRuleError(
        'Password was used before',
        'PASSWORD_REUSED',
        { authId: this._authId.value },
      );
    }
    this._previousHashes.unshift(this._passwordHash);
    if (this._previousHashes.length > historyCount) {
      this._previousHashes = this._previousHashes.slice(0, historyCount);
    }
    this._passwordHash = newHash;
    this._passwordChangedAt = now;
    this._passwordExpiresAt = expiresAt;
    this._mustChangePassword = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  flagMustChange(): void {
    this._mustChangePassword = true;
  }

  static create(params: {
    id: string;
    authId: AuthIdVO;
    passwordHash: PasswordHashVO;
    passwordExpiresAt?: string;
    mustChangePassword?: boolean;
    now: string;
  }): CredentialEntity {
    return new CredentialEntity(params.id, params.now, params.now, {
      authId: params.authId,
      passwordHash: params.passwordHash,
      passwordChangedAt: params.now,
      passwordExpiresAt: params.passwordExpiresAt,
      mustChangePassword: params.mustChangePassword ?? false,
      previousHashes: [],
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CredentialEntityProps;
  }): CredentialEntity {
    return new CredentialEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}

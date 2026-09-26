/**
 * Auth2FaEntity — 2FA configuration wrapper
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';

export interface Auth2FaEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly primaryMethod: MfaTypeVO;
  readonly backupMethods: readonly MfaTypeVO[];
  readonly enabledAt?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class Auth2FaEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _primaryMethod: MfaTypeVO;
  private _backupMethods: MfaTypeVO[];
  private _enabledAt?: number;

  private constructor(props: Auth2FaEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._primaryMethod = props.primaryMethod;
    this._backupMethods = [...props.backupMethods];
    this._enabledAt = props.enabledAt;
  }

  static create(props: Auth2FaEntityProps): Auth2FaEntity {
    return new Auth2FaEntity(props);
  }

  get primaryMethod(): MfaTypeVO { return this._primaryMethod; }
  get backupMethods(): readonly MfaTypeVO[] { return [...this._backupMethods]; }

  isEnabled(): boolean { return this._enabledAt !== undefined; }
  hasBackup(): boolean { return this._backupMethods.length > 0; }

  enable(at: number): void { this._enabledAt = at; }

  disable(): void {
    this._enabledAt = undefined;
    this._backupMethods = [];
  }

  setPrimary(method: MfaTypeVO): void {
    if (this._backupMethods.some((m) => m.equals(method))) {
      throw new Error('Primary must not be a backup method');
    }
    this._primaryMethod = method;
  }
}

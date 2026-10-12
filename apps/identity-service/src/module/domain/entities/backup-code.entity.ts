/**
 * BackupCodeEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { BackupCodeVO } from '../value-objects/primitives/backup-code.vo.js';

export interface BackupCodeEntityProps {
  readonly authId: AuthIdVO;
  readonly code: BackupCodeVO;
  readonly used: boolean;
  readonly usedAt?: string;
}

export class BackupCodeEntity extends BaseEntity<string> {
  private _used: boolean;
  private _usedAt?: string;

  private readonly _authId: AuthIdVO;
  private readonly _code: BackupCodeVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BackupCodeEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._code = props.code;
    this._used = props.used;
    this._usedAt = props.usedAt;
  }

  get authId(): AuthIdVO { return this._authId; }
  get code(): BackupCodeVO { return this._code; }
  get used(): boolean { return this._used; }
  get usedAt(): string | undefined { return this._usedAt; }

  markUsed(now: string = new Date().toISOString()): void {
    if (this._used) return;
    this._used = true;
    this._usedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    authId: AuthIdVO;
    code: BackupCodeVO;
    now: string;
  }): BackupCodeEntity {
    return new BackupCodeEntity(params.id, params.now, params.now, {
      authId: params.authId,
      code: params.code,
      used: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: BackupCodeEntityProps;
  }): BackupCodeEntity {
    return new BackupCodeEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}

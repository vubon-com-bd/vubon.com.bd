/**
 * BackupCodeSetVO — Collection of MFA backup codes
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { BackupCodeVO } from '../primitives/backup-code.vo.js';

export interface BackupCodeEntry {
  readonly code: BackupCodeVO;
  readonly used: boolean;
  readonly usedAt?: string;
}

export interface BackupCodeSetVOProps {
  readonly authId: AuthIdVO;
  readonly codes: readonly BackupCodeEntry[];
  readonly createdAt: string;
}

export class BackupCodeSetVO extends BaseVO<BackupCodeSetVOProps> {
  private constructor(props: BackupCodeSetVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: BackupCodeSetVOProps): BackupCodeSetVO {
    const vo = new BackupCodeSetVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BackupCodeSetVOProps): BackupCodeSetVO {
    return new BackupCodeSetVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.codes.length === 0) {
      throw new ValidationError('BackupCodeSet cannot be empty', 'codes');
    }
    if (v.codes.length > 20) {
      throw new ValidationError('BackupCodeSet cannot exceed 20 codes', 'codes');
    }
    // Duplicate check
    const set = new Set(v.codes.map((c) => c.code.value));
    if (set.size !== v.codes.length) {
      throw new ValidationError('BackupCodeSet contains duplicate codes', 'codes');
    }
  }

  get authId(): AuthIdVO { return this.value.authId; }
  get codes(): readonly BackupCodeEntry[] { return this.value.codes; }
  get createdAt(): string { return this.value.createdAt; }

  get unusedCount(): number {
    return this.value.codes.filter((c) => !c.used).length;
  }
  get usedCount(): number {
    return this.value.codes.filter((c) => c.used).length;
  }
  get isExhausted(): boolean {
    return this.unusedCount === 0;
  }
}

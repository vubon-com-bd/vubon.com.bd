/**
 * BackupCode Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BackupCodeVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 16;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BackupCodeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('BackupCode cannot be empty', 'backupCode');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s/g, '');
    if (normalized.length < BackupCodeVO.MIN_LENGTH || normalized.length > BackupCodeVO.MAX_LENGTH) {
      throw new ValidationError(
        `BackupCode must be ${BackupCodeVO.MIN_LENGTH}-${BackupCodeVO.MAX_LENGTH} chars`,
        'backupCode',
      );
    }
    if (!/^[A-Z0-9]+$/.test(normalized)) {
      throw new ValidationError('BackupCode must be alphanumeric', 'backupCode');
    }
    return new BackupCodeVO(normalized);
  }

  static reconstitute(raw: string): BackupCodeVO {
    return new BackupCodeVO(raw);
  }

  matches(other: string): boolean {
    return this.value === other.trim().toUpperCase().replace(/\s/g, '');
  }
}

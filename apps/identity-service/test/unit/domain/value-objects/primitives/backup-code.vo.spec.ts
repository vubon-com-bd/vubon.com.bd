/**
 * BackupCodeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_BACKUP_CODE } from '@fixtures/index';

describe('BackupCodeVO', () => {
  it('should create valid alphanumeric code', () => {
    const vo = BackupCodeVO.create(TEST_BACKUP_CODE);
    expect(vo.value).toBe(TEST_BACKUP_CODE.toUpperCase());
  });

  it('should normalize case + remove spaces', () => {
    expect(BackupCodeVO.create(' abcd 1234 ').value).toBe('ABCD1234');
  });

  it('should throw on too short', () => {
    expect(() => BackupCodeVO.create('ABC')).toThrow(ValidationError);
  });

  it('should throw on too long', () => {
    expect(() => BackupCodeVO.create('A'.repeat(20))).toThrow(ValidationError);
  });

  it('should throw on non-alphanumeric', () => {
    expect(() => BackupCodeVO.create('ABCD-1234')).toThrow(ValidationError);
  });

  it('matches() should compare normalized', () => {
    const vo = BackupCodeVO.create(TEST_BACKUP_CODE);
    expect(vo.matches(TEST_BACKUP_CODE.toLowerCase())).toBe(true);
    expect(vo.matches('different')).toBe(false);
  });

  it('should reconstitute without validation', () => {
    expect(BackupCodeVO.reconstitute('x').value).toBe('x');
  });
});

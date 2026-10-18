/**
 * BackupCodeEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { BackupCodeEntity } from '@domain/entities/backup-code.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import {
  TEST_IDS,
  TEST_DATES,
  TEST_BACKUP_CODE,
  makeBackupCodeEntity,
  unusedBackupCode,
  usedBackupCode,
  createNewBackupCode,
} from '@fixtures/index';

describe('BackupCodeEntity', () => {
  describe('create()', () => {
    it('should create unused', () => {
      const c = createNewBackupCode(TEST_BACKUP_CODE);
      expect(c.used).toBe(false);
      expect(c.usedAt).toBeUndefined();
    });
  });

  describe('markUsed()', () => {
    it('should set used + usedAt', () => {
      const c = unusedBackupCode();
      c.markUsed();
      expect(c.used).toBe(true);
      expect(c.usedAt).toBeDefined();
    });

    it('should be idempotent', () => {
      const c = usedBackupCode();
      const before = c.usedAt;
      c.markUsed(TEST_DATES.IN_ONE_HOUR);
      expect(c.usedAt).toBe(before);
    });
  });

  describe('getters', () => {
    it('should expose all props', () => {
      const c = makeBackupCodeEntity('XYZ9876ABC');
      expect(c.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(c.code.value).toBe('XYZ9876ABC');
    });
  });
});

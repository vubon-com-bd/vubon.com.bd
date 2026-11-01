/**
 * BackupCodeSetVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { BackupCodeSetVO } from '@domain/value-objects/composites/backup-code-set.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeEntry = (code: string, used = false) => ({
  code: BackupCodeVO.create(code),
  used,
  usedAt: used ? TEST_DATES.NOW : undefined,
});

describe('BackupCodeSetVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = BackupCodeSetVO.create({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        codes: [makeEntry('ABCD1234EF'), makeEntry('WXYZ9876WX')],
        createdAt: TEST_DATES.NOW,
      });
      expect(vo.codes.length).toBe(2);
    });

    it('should throw on empty', () => {
      expect(() =>
        BackupCodeSetVO.create({
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          codes: [],
          createdAt: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('should throw on duplicates', () => {
      expect(() =>
        BackupCodeSetVO.create({
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          codes: [makeEntry('ABCD1234EF'), makeEntry('ABCD1234EF')],
          createdAt: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('should freeze', () => {
      const vo = BackupCodeSetVO.create({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        codes: [makeEntry('ABCD1234EF')],
        createdAt: TEST_DATES.NOW,
      });
      expect(Object.isFrozen(vo)).toBe(true);
    });
  });

  describe('counts', () => {
    it('unusedCount', () => {
      const vo = BackupCodeSetVO.create({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        codes: [makeEntry('ABCD1234EF', false), makeEntry('WXYZ9876WX', true)],
        createdAt: TEST_DATES.NOW,
      });
      expect(vo.unusedCount).toBe(1);
      expect(vo.usedCount).toBe(1);
    });

    it('isExhausted', () => {
      const vo = BackupCodeSetVO.create({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        codes: [makeEntry('ABCD1234EF', true)],
        createdAt: TEST_DATES.NOW,
      });
      expect(vo.isExhausted).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = BackupCodeSetVO.reconstitute({
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        codes: [],
        createdAt: TEST_DATES.NOW,
      });
      expect(vo.codes.length).toBe(0);
    });
  });
});

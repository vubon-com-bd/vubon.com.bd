/**
 * SessionIdVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '../../../../fixtures/index.js';

describe('SessionIdVO — extended', () => {
  it('create() valid', () => {
    expect(SessionIdVO.create(TEST_IDS.SESSION_ID).value).toBe(TEST_IDS.SESSION_ID);
  });

  it('trims whitespace', () => {
    expect(SessionIdVO.create('  abcdefgh  ').value).toBe('abcdefgh');
  });

  it('throws too short', () => {
    expect(() => SessionIdVO.create('short')).toThrow(ValidationError);
  });

  it('throws too long', () => {
    expect(() => SessionIdVO.create('x'.repeat(129))).toThrow(ValidationError);
  });

  it('throws non-string', () => {
    expect(() => SessionIdVO.create(123 as never)).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    expect(SessionIdVO.reconstitute('any').value).toBe('any');
  });
});

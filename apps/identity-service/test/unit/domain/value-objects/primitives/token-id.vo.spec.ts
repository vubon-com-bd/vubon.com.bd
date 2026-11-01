/**
 * TokenIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('TokenIdVO', () => {
  it('should create valid', () => {
    expect(TokenIdVO.create(TEST_IDS.TOKEN_ID).value).toBe(TEST_IDS.TOKEN_ID);
  });

  it('should throw on empty', () => {
    expect(() => TokenIdVO.create('')).toThrow(ValidationError);
  });

  it('should throw on invalid UUID', () => {
    expect(() => TokenIdVO.create('nope')).toThrow(/valid UUID/);
  });

  it('should reconstitute without validation', () => {
    expect(TokenIdVO.reconstitute('x').value).toBe('x');
  });
});

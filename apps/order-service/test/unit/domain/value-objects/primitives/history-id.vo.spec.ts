import { describe, it, expect } from '@jest/globals';
import { HistoryIdVO } from '@domain/primitives/history-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('HistoryIdVO', () => {
  it('creates from valid UUID', () => {
    expect(HistoryIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => HistoryIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => HistoryIdVO.create('abc')).toThrow(ValidationError);
  });
});

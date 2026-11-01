import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('DigestIdVO', () => {
  it('creates valid', () => {
    expect(DigestIdVO.create(IDS.digestId).value).toBe(IDS.digestId);
  });
  it('rejects empty', () => {
    expect(() => DigestIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects bad format', () => {
    expect(() => DigestIdVO.create('bad')).toThrow(ValidationError);
  });
});

import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { InvalidDigestTypeError } from '@domain/errors/digest.errors.js';

describe('DigestTypeVO', () => {
  it.each(['summary', 'detailed', 'categorized', 'priority_based'])('accepts "%s"', (t) => {
    expect(DigestTypeVO.create(t).value).toBe(t);
  });

  it('rejects invalid', () => {
    expect(() => DigestTypeVO.create('whatever')).toThrow(InvalidDigestTypeError);
  });

  it('isDetailed for detailed', () => {
    expect(DigestTypeVO.create('detailed').isDetailed()).toBe(true);
    expect(DigestTypeVO.create('summary').isDetailed()).toBe(false);
  });

  it('groupsByCategory for categorized', () => {
    expect(DigestTypeVO.create('categorized').groupsByCategory()).toBe(true);
    expect(DigestTypeVO.create('summary').groupsByCategory()).toBe(false);
  });
});

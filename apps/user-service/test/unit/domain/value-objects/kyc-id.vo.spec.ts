import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';

describe('KycIdVO', () => {
  it('should create valid id', () => {
    expect(KycIdVO.create('k-1').value).toBe('k-1');
  });
  it('should throw on empty', () => {
    expect(() => KycIdVO.create('')).toThrow();
  });
  it('should throw on non-string', () => {
    expect(() => KycIdVO.create(123 as never)).toThrow();
  });
});

import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const make = (overrides: Partial<Parameters<typeof DeliveryErrorVO.create>[0]> = {}) => ({
  reason: 'timeout' as const,
  message: 'request timed out',
  retryable: true,
  ...overrides,
});

describe('DeliveryErrorVO', () => {
  it('accepts valid error', () => {
    const vo = DeliveryErrorVO.create(make());
    expect(vo.reason).toBe('timeout');
    expect(vo.retryable).toBe(true);
  });

  it('accepts providerCode', () => {
    const vo = DeliveryErrorVO.create(make({ providerCode: 'ERR_503' }));
    expect(vo.providerCode).toBe('ERR_503');
  });

  it('rejects invalid reason', () => {
    expect(() =>
      DeliveryErrorVO.create(make({ reason: 'weird' as any })),
    ).toThrow(ValidationError);
  });

  it('rejects empty message', () => {
    expect(() => DeliveryErrorVO.create(make({ message: '' }))).toThrow(ValidationError);
  });

  it('rejects too-long message (>500)', () => {
    expect(() =>
      DeliveryErrorVO.create(make({ message: 'a'.repeat(501) })),
    ).toThrow(ValidationError);
  });

  it('reconstitute skips validation', () => {
    expect(DeliveryErrorVO.reconstitute(make()).reason).toBe('timeout');
  });
});

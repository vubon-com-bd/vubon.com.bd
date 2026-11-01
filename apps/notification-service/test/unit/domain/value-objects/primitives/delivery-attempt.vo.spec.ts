import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { InvalidDeliveryAttemptError } from '@domain/errors/delivery.errors.js';

const make = (overrides: Partial<Parameters<typeof DeliveryAttemptVO.create>[0]> = {}) => ({
  attemptNumber: 1,
  attemptedAt: '2025-01-15T10:00:00Z',
  succeeded: true,
  ...overrides,
});

describe('DeliveryAttemptVO', () => {
  it('accepts valid attempt', () => {
    const vo = DeliveryAttemptVO.create(make());
    expect(vo.attemptNumber).toBe(1);
    expect(vo.succeeded).toBe(true);
  });

  it('accepts failure with message', () => {
    const vo = DeliveryAttemptVO.create(
      make({ succeeded: false, errorMessage: 'timeout' }),
    );
    expect(vo.errorMessage).toBe('timeout');
  });

  it('rejects attemptNumber < 1', () => {
    expect(() => DeliveryAttemptVO.create(make({ attemptNumber: 0 }))).toThrow(InvalidDeliveryAttemptError);
  });

  it('rejects attemptNumber > 20', () => {
    expect(() => DeliveryAttemptVO.create(make({ attemptNumber: 21 }))).toThrow(InvalidDeliveryAttemptError);
  });

  it('rejects non-integer attemptNumber', () => {
    expect(() => DeliveryAttemptVO.create(make({ attemptNumber: 1.5 }))).toThrow(InvalidDeliveryAttemptError);
  });

  it('rejects empty attemptedAt', () => {
    expect(() => DeliveryAttemptVO.create(make({ attemptedAt: '' }))).toThrow(InvalidDeliveryAttemptError);
  });

  it('rejects succeeded with errorMessage', () => {
    expect(() =>
      DeliveryAttemptVO.create(make({ succeeded: true, errorMessage: 'oops' })),
    ).toThrow(InvalidDeliveryAttemptError);
  });

  it('accepts providerMessageId', () => {
    const vo = DeliveryAttemptVO.create(make({ providerMessageId: 'msg-1' }));
    expect(vo.providerMessageId).toBe('msg-1');
  });

  it('reconstitute skips validation', () => {
    const vo = DeliveryAttemptVO.reconstitute(make());
    expect(vo.succeeded).toBe(true);
  });
});

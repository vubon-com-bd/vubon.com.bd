import { RefundStatusVO } from '../../../../../src/module/domain/value-objects/primitives/refund-status.vo.js';
import { InvalidRefundStatusError } from '../../../../../src/module/domain/errors/refund.errors.js';

describe('RefundStatusVO', () => {
  it('creates valid', () => {
    expect(RefundStatusVO.create('pending').value).toBe('pending');
    expect(RefundStatusVO.create('succeeded').value).toBe('succeeded');
  });
  it('rejects invalid', () => {
    expect(() => RefundStatusVO.create('bogus')).toThrow(InvalidRefundStatusError);
  });
  it('isFinal for succeeded/failed/cancelled', () => {
    expect(RefundStatusVO.succeeded().isFinal()).toBe(true);
    expect(RefundStatusVO.failed().isFinal()).toBe(true);
    expect(RefundStatusVO.cancelled().isFinal()).toBe(true);
    expect(RefundStatusVO.pending().isFinal()).toBe(false);
  });
  it('isSuccess', () => {
    expect(RefundStatusVO.succeeded().isSuccess()).toBe(true);
    expect(RefundStatusVO.pending().isSuccess()).toBe(false);
  });
  it('canTransitionTo — pending → processing/succeeded/failed/cancelled', () => {
    const pending = RefundStatusVO.pending();
    expect(pending.canTransitionTo('processing')).toBe(true);
    expect(pending.canTransitionTo('succeeded')).toBe(true);
    expect(pending.canTransitionTo('failed')).toBe(true);
    expect(pending.canTransitionTo('cancelled')).toBe(true);
  });
  it('canTransitionTo — succeeded terminal', () => {
    expect(RefundStatusVO.succeeded().canTransitionTo('pending')).toBe(false);
  });
});

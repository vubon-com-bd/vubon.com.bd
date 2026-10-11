import { describe, it, expect } from '@jest/globals';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';

describe('DeliveryFailureReasonVO', () => {
  it('create + reconstitute', () => {
    expect(DeliveryFailureReasonVO.create('invalid_address').value).toBe('invalid_address');
    expect(() => DeliveryFailureReasonVO.create('bad')).toThrow();
    expect(DeliveryFailureReasonVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DeliveryFailureReasonVO.invalidAddress().value).toBe('invalid_address');
    expect(DeliveryFailureReasonVO.invalidPhone().value).toBe('invalid_phone');
    expect(DeliveryFailureReasonVO.invalidToken().value).toBe('invalid_token');
    expect(DeliveryFailureReasonVO.rateLimited().value).toBe('rate_limited');
    expect(DeliveryFailureReasonVO.quotaExceeded().value).toBe('quota_exceeded');
    expect(DeliveryFailureReasonVO.gatewayError().value).toBe('gateway_error');
    expect(DeliveryFailureReasonVO.networkError().value).toBe('network_error');
    expect(DeliveryFailureReasonVO.timeout().value).toBe('timeout');
    expect(DeliveryFailureReasonVO.unsubscribed().value).toBe('unsubscribed');
    expect(DeliveryFailureReasonVO.blocked().value).toBe('blocked');
    expect(DeliveryFailureReasonVO.unknown().value).toBe('unknown');
  });
  it('isRetryable', () => {
    expect(DeliveryFailureReasonVO.rateLimited().isRetryable()).toBe(true);
    expect(DeliveryFailureReasonVO.gatewayError().isRetryable()).toBe(true);
    expect(DeliveryFailureReasonVO.timeout().isRetryable()).toBe(true);
    expect(DeliveryFailureReasonVO.invalidAddress().isRetryable()).toBe(false);
  });
  it('isPermanent', () => {
    expect(DeliveryFailureReasonVO.invalidAddress().isPermanent()).toBe(true);
    expect(DeliveryFailureReasonVO.invalidToken().isPermanent()).toBe(true);
    expect(DeliveryFailureReasonVO.blocked().isPermanent()).toBe(true);
    expect(DeliveryFailureReasonVO.timeout().isPermanent()).toBe(false);
  });
});

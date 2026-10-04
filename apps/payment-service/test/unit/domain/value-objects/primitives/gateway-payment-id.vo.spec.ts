import { GatewayPaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('GatewayPaymentIdVO', () => {
  it('creates valid', () => {
    expect(GatewayPaymentIdVO.create('gw_abc123').value).toBe('gw_abc123');
  });
  it('trims', () => {
    expect(GatewayPaymentIdVO.create('  gw_abc  ').value).toBe('gw_abc');
  });
  it('rejects empty', () => {
    expect(() => GatewayPaymentIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects too long (>255)', () => {
    expect(() => GatewayPaymentIdVO.create('a'.repeat(256))).toThrow(ValidationError);
  });
});

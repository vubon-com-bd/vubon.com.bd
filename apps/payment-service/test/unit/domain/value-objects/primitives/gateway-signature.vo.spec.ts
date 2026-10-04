import { GatewaySignatureVO } from '../../../../../src/module/domain/value-objects/primitives/gateway-signature.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('GatewaySignatureVO', () => {
  it('creates valid', () => {
    expect(GatewaySignatureVO.create('sig_abc123').value).toBe('sig_abc123');
  });
  it('rejects empty', () => {
    expect(() => GatewaySignatureVO.create('')).toThrow(ValidationError);
  });
  it('rejects too long (>500)', () => {
    expect(() => GatewaySignatureVO.create('a'.repeat(501))).toThrow(ValidationError);
  });
});

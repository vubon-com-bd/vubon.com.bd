/**
 * IpAddressVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IP } from '@fixtures/index';

describe('IpAddressVO', () => {
  it('should create valid IPv4', () => {
    const vo = IpAddressVO.create(TEST_IP);
    expect(vo.value).toBe(TEST_IP);
    expect(vo.isIpv4).toBe(true);
    expect(vo.isIpv6).toBe(false);
  });

  it('should create valid IPv6', () => {
    const v6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    const vo = IpAddressVO.create(v6);
    expect(vo.isIpv6).toBe(true);
  });

  it('should throw on invalid', () => {
    expect(() => IpAddressVO.create('not-an-ip')).toThrow(ValidationError);
  });

  it('should throw on empty', () => {
    expect(() => IpAddressVO.create('')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(IpAddressVO.reconstitute('x').value).toBe('x');
  });
});

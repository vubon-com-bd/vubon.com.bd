import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { InvalidDeviceTokenError } from '@domain/errors/device.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('DeviceTokenVO', () => {
  it('accepts valid token', () => {
    expect(DeviceTokenVO.create(IDS.deviceToken).value).toBe(IDS.deviceToken);
  });

  it('trims whitespace', () => {
    const token = `  ${IDS.deviceToken}  `;
    expect(DeviceTokenVO.create(token).value).toBe(IDS.deviceToken);
  });

  it('rejects too short (<32)', () => {
    expect(() => DeviceTokenVO.create('short')).toThrow(InvalidDeviceTokenError);
  });

  it('rejects too long (>500)', () => {
    expect(() => DeviceTokenVO.create('a'.repeat(501))).toThrow(InvalidDeviceTokenError);
  });

  it('rejects invalid chars', () => {
    expect(() => DeviceTokenVO.create('a'.repeat(30) + '!@#$')).toThrow(InvalidDeviceTokenError);
  });

  it('accepts underscore, hyphen, colon, dot', () => {
    const token = 'a'.repeat(28) + '_-:.';
    expect(DeviceTokenVO.create(token).value).toBe(token);
  });

  it('rejects non-string', () => {
    expect(() => DeviceTokenVO.create(123 as any)).toThrow(InvalidDeviceTokenError);
  });

  describe('masked', () => {
    it('masks long token (>12)', () => {
      const masked = DeviceTokenVO.create(IDS.deviceToken).masked;
      expect(masked).toContain('...');
      expect(masked.length).toBeLessThan(IDS.deviceToken.length);
    });

    it('returns whole if exactly 12 chars (via reconstitute)', () => {
      // Use reconstitute to bypass MIN_LENGTH — tests the masked getter behavior
      const twelve = 'a'.repeat(12);
      expect(DeviceTokenVO.reconstitute(twelve).masked).toBe(twelve);
    });

    it('masks 13+ chars', () => {
      const thirteen = 'a'.repeat(13);
      const masked = DeviceTokenVO.reconstitute(thirteen).masked;
      expect(masked).toContain('...');
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(DeviceTokenVO.reconstitute('x').value).toBe('x');
    });
  });
});

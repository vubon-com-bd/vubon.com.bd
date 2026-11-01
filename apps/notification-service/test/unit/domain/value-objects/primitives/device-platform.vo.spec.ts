import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { InvalidDevicePlatformError } from '@domain/errors/device.errors.js';

describe('DevicePlatformVO', () => {
  it.each(['android', 'ios', 'web', 'windows', 'macos'])('accepts "%s"', (p) => {
    expect(DevicePlatformVO.create(p).value).toBe(p);
  });

  it('rejects invalid', () => {
    expect(() => DevicePlatformVO.create('beos')).toThrow(InvalidDevicePlatformError);
  });

  it('isMobile for android/ios', () => {
    expect(DevicePlatformVO.create('android').isMobile()).toBe(true);
    expect(DevicePlatformVO.create('ios').isMobile()).toBe(true);
    expect(DevicePlatformVO.create('web').isMobile()).toBe(false);
  });

  it('isWeb for web', () => {
    expect(DevicePlatformVO.create('web').isWeb()).toBe(true);
    expect(DevicePlatformVO.create('android').isWeb()).toBe(false);
  });
});

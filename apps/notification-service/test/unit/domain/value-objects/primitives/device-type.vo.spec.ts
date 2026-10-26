import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { InvalidDeviceTypeError } from '@domain/errors/device.errors.js';

describe('DeviceTypeVO', () => {
  it.each(['android', 'ios', 'web', 'windows', 'macos', 'linux', 'tablet', 'wearable'])('accepts "%s"', (t) => {
    expect(DeviceTypeVO.create(t).value).toBe(t);
  });

  it('rejects invalid', () => {
    expect(() => DeviceTypeVO.create('tv')).toThrow(InvalidDeviceTypeError);
  });

  it('isMobile for android/ios', () => {
    expect(DeviceTypeVO.create('android').isMobile()).toBe(true);
    expect(DeviceTypeVO.create('ios').isMobile()).toBe(true);
    expect(DeviceTypeVO.create('web').isMobile()).toBe(false);
  });

  it('isDesktop for windows/macos/linux', () => {
    expect(DeviceTypeVO.create('windows').isDesktop()).toBe(true);
    expect(DeviceTypeVO.create('macos').isDesktop()).toBe(true);
    expect(DeviceTypeVO.create('linux').isDesktop()).toBe(true);
    expect(DeviceTypeVO.create('android').isDesktop()).toBe(false);
  });

  it('supportsPush for mobile + web', () => {
    expect(DeviceTypeVO.create('android').supportsPush()).toBe(true);
    expect(DeviceTypeVO.create('ios').supportsPush()).toBe(true);
    expect(DeviceTypeVO.create('web').supportsPush()).toBe(true);
    expect(DeviceTypeVO.create('wearable').supportsPush()).toBe(false);
  });
});

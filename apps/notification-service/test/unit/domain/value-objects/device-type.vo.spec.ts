import { describe, it, expect } from '@jest/globals';
import { DeviceTypeVO } from '../../../../src/module/domain/value-objects/primitives/device-type.vo.js';

describe('DeviceTypeVO', () => {
  it('create + reconstitute', () => {
    expect(DeviceTypeVO.create('android').value).toBe('android');
    expect(() => DeviceTypeVO.create('bad')).toThrow();
    expect(DeviceTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DeviceTypeVO.android().value).toBe('android');
    expect(DeviceTypeVO.ios().value).toBe('ios');
    expect(DeviceTypeVO.web().value).toBe('web');
    expect(DeviceTypeVO.windows().value).toBe('windows');
    expect(DeviceTypeVO.macos().value).toBe('macos');
    expect(DeviceTypeVO.linux().value).toBe('linux');
    expect(DeviceTypeVO.tablet().value).toBe('tablet');
    expect(DeviceTypeVO.wearable().value).toBe('wearable');
  });
  it('predicates', () => {
    expect(DeviceTypeVO.android().isMobile()).toBe(true);
    expect(DeviceTypeVO.ios().isMobile()).toBe(true);
    expect(DeviceTypeVO.tablet().isMobile()).toBe(true);
    expect(DeviceTypeVO.wearable().isMobile()).toBe(true);
    expect(DeviceTypeVO.windows().isDesktop()).toBe(true);
    expect(DeviceTypeVO.macos().isDesktop()).toBe(true);
    expect(DeviceTypeVO.linux().isDesktop()).toBe(true);
    expect(DeviceTypeVO.web().isWeb()).toBe(true);
  });
});

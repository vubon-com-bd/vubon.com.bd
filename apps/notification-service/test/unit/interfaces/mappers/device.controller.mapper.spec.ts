import { describe, it, expect } from '@jest/globals';
import { DeviceControllerMapper } from '../../../../src/module/interfaces/mappers/device.controller.mapper.js';

describe('DeviceControllerMapper', () => {
  it('toRegisterAppDto', () => {
    const dto = DeviceControllerMapper.toRegisterAppDto({
      userId: 'u', type: 'android', token: 'abcdefghijklmnop1234',
      platform: 'android', appVersion: '1.0', osVersion: '14', deviceName: 'Phone',
    } as never);
    expect(dto.type).toBe('android');
  });

  it('toUpdateAppDto', () => {
    const dto = DeviceControllerMapper.toUpdateAppDto('d-1', {
      token: 'abcdefghijklmnop1234', appVersion: '2.0',
    } as never);
    expect(dto.deviceId).toBe('d-1');
  });

  it('toRefreshAppDto', () => {
    const dto = DeviceControllerMapper.toRefreshAppDto('d-1', {
      newToken: 'abcdefghijklmnop1234',
    } as never);
    expect(dto.newToken).toBe('abcdefghijklmnop1234');
  });

  it('toRemoveAppDto', () => {
    const dto = DeviceControllerMapper.toRemoveAppDto('d-1', { reason: 'x' } as never);
    expect(dto.reason).toBe('x');
  });

  it('toBlockAppDto', () => {
    const dto = DeviceControllerMapper.toBlockAppDto('d-1', { reason: 'abuse' } as never);
    expect(dto.reason).toBe('abuse');
  });

  it('toListAppDto with userId', () => {
    const o = DeviceControllerMapper.toListAppDto({ userId: 'u' } as never, 'fallback');
    expect(o.userId).toBe('u');
  });

  it('toListAppDto fallback userId', () => {
    const o = DeviceControllerMapper.toListAppDto({} as never, 'fallback');
    expect(o.userId).toBe('fallback');
  });

  it('toListAppDto defaults', () => {
    const o = DeviceControllerMapper.toListAppDto({} as never);
    expect(o.page).toBe(1);
    expect(o.limit).toBe(20);
  });
});

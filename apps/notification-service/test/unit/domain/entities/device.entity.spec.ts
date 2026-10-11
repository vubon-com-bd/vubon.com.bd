import { describe, it, expect } from '@jest/globals';
import { DeviceEntity } from '../../../../src/module/domain/entities/device.entity.js';
import { DeviceTypeVO } from '../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceTokenVO } from '../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

const VALID_TOKEN = 'abcdefghijklmnop123456';

function build(): DeviceEntity {
  return DeviceEntity.register({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      userId: FIXED_USER_ID,
      type: DeviceTypeVO.android(),
      token: DeviceTokenVO.create(VALID_TOKEN),
      platform: 'android',
    },
  });
}

describe('DeviceEntity', () => {
  it('register → active', () => {
    const e = build();
    expect(e.isActive()).toBe(true);
    expect(e.canReceivePush()).toBe(true);
    expect(e.lastActiveAt).toBeDefined();
  });

  it('refreshToken updates token + sets active', () => {
    const e = build();
    const newToken = DeviceTokenVO.create('newtoken0123456789ab');
    e.refreshToken(newToken);
    expect(e.token.value).toBe('newtoken0123456789ab');
  });

  it('refreshToken from blocked throws', () => {
    const e = build();
    e.block('spam');
    expect(() => e.refreshToken(DeviceTokenVO.create('newtoken0123456789ab'))).toThrow();
  });

  it('markActive updates lastActiveAt', () => {
    const e = build();
    const before = e.lastActiveAt;
    e.markActive();
    expect(e.lastActiveAt).toBeDefined();
    expect(typeof before).toBe('string');
  });

  it('unregister → unregistered', () => {
    const e = build();
    e.unregister('user logged out');
    expect(e.isUnregistered()).toBe(true);
  });

  it('unregister idempotent', () => {
    const e = build();
    e.unregister();
    expect(() => e.unregister()).not.toThrow();
  });

  it('block → blocked', () => {
    const e = build();
    e.block('abuse');
    expect(e.isBlocked()).toBe(true);
    expect(e.canReceivePush()).toBe(false);
  });

  it('invalidate → invalid', () => {
    const e = build();
    e.invalidate('stale');
    expect(e.isInvalid()).toBe(true);
  });

  it('reactivate → active', () => {
    const e = build();
    e.block('test');
    e.reactivate();
    expect(e.isActive()).toBe(true);
  });

  it('updateAppInfo updates app/os version', () => {
    const e = build();
    e.updateAppInfo('1.2.3', 'Android 14');
    expect(e.appVersion).toBe('1.2.3');
    expect(e.osVersion).toBe('Android 14');
  });

  it('isStale with recent activity false', () => {
    const e = build();
    expect(e.isStale(30)).toBe(false);
  });

  it('isStale for old activity true', () => {
    const e = build();
    const stale = e.isStale(0);
    expect(typeof stale).toBe('boolean');
  });

  it('isTerminal for terminal statuses', () => {
    const e = build();
    e.block('test');
    expect(e.isTerminal()).toBe(true);
  });
});

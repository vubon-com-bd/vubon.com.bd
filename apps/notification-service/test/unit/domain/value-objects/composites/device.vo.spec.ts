import { describe, it, expect } from '@jest/globals';
import { DeviceVO } from '../../../../../src/module/domain/value-objects/composites/device.vo.js';
import { DeviceIdVO } from '../../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '../../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../../../../../src/module/domain/value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: DeviceIdVO.create(makeUuid()),
    userId: FIXED_USER_ID,
    type: DeviceTypeVO.android(),
    status: DeviceStatusVO.active(),
    token: DeviceTokenVO.create('abcdefghijklmnop1234'),
    registeredAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('DeviceVO', () => {
  it('create valid', () => {
    const vo = DeviceVO.create(buildProps());
    expect(vo.canReceivePush()).toBe(true);
  });
  it('rejects empty userId', () => {
    expect(() => DeviceVO.create(buildProps({ userId: '' }))).toThrow();
  });
  it('canReceivePush false when blocked', () => {
    const vo = DeviceVO.reconstitute(buildProps({ status: DeviceStatusVO.blocked() }));
    expect(vo.canReceivePush()).toBe(false);
  });
  it('isStale for old activity', () => {
    const old = new Date(Date.now() - 90 * 86_400_000).toISOString();
    const vo = DeviceVO.reconstitute(buildProps({ lastActiveAt: old }));
    expect(vo.isStale(30)).toBe(true);
  });
  it('isStale false for recent', () => {
    const vo = DeviceVO.reconstitute(buildProps({ lastActiveAt: new Date().toISOString() }));
    expect(vo.isStale(30)).toBe(false);
  });
  it('reconstitute', () => {
    const vo = DeviceVO.reconstitute(buildProps());
    expect(vo.userId).toBe(FIXED_USER_ID);
  });
});

import { CanRegisterDeviceSpecification } from '@domain/specifications/can-register-device.specification.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const WEEK_AGO = new Date(Date.now() - 7 * 86_400_000).toISOString();

const make = (o: any = {}) =>
  DeviceVO.create({
    id: DeviceIdVO.create(IDS.deviceId),
    userId: UserIdVO.create(IDS.userId),
    type: DeviceTypeVO.create('android'),
    status: DeviceStatusVO.active(),
    token: DeviceTokenVO.create(IDS.deviceToken),
    platform: DevicePlatformVO.create('android'),
    lastActiveAt: NOW,
    registeredAt: WEEK_AGO,
    ...o,
  });

describe('CanRegisterDeviceSpecification', () => {
  const spec = CanRegisterDeviceSpecification.strict();

  it('satisfied for new device under limit', () => {
    expect(
      spec.isSatisfiedBy({
        candidate: make(),
        ctx: { existingDeviceCount: 5, existingTokens: [] },
      }),
    ).toBe(true);
  });

  it('not satisfied when at device limit', () => {
    expect(
      spec.isSatisfiedBy({
        candidate: make(),
        ctx: { existingDeviceCount: 10, existingTokens: [] },
      }),
    ).toBe(false);
  });

  it('not satisfied when token already registered', () => {
    expect(
      spec.isSatisfiedBy({
        candidate: make(),
        ctx: {
          existingDeviceCount: 5,
          existingTokens: [DeviceTokenVO.create(IDS.deviceToken)],
        },
      }),
    ).toBe(false);
  });
});

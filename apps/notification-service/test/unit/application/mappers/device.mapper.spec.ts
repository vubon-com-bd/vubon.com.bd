import { DeviceMapper } from '@application/mappers/device.mapper.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build(opts: { withName?: boolean; withApp?: boolean } = {}) {
  const vo = DeviceVO.create({
    id: DeviceIdVO.create(IDS.deviceId),
    userId: UserIdVO.create(IDS.userId),
    type: DeviceTypeVO.create('android'),
    status: DeviceStatusVO.active(),
    token: DeviceTokenVO.create(IDS.deviceToken),
    platform: DevicePlatformVO.create('android'),
    appVersion: opts.withApp ? '1.0.0' : undefined,
    osVersion: opts.withApp ? '14.0' : undefined,
    deviceName: opts.withName ? 'Phone' : undefined,
    lastActiveAt: DATES.now,
    registeredAt: DATES.now,
  });
  return DeviceEntity.create({
    id: DeviceIdVO.create(IDS.deviceId),
    vo,
    now: DATES.now,
  });
}

describe('DeviceMapper', () => {
  it('toResponse without optionals', () => {
    const r = DeviceMapper.toResponse(build());
    expect(r.id).toBe(IDS.deviceId);
    expect(r.appVersion).toBeUndefined();
    expect(r.deviceName).toBeUndefined();
  });

  it('toResponse with optionals', () => {
    const r = DeviceMapper.toResponse(build({ withName: true, withApp: true }));
    expect(r.deviceName).toBe('Phone');
    expect(r.appVersion).toBe('1.0.0');
    expect(r.osVersion).toBe('14.0');
  });

  it('toSummary', () => {
    const r = DeviceMapper.toSummary(build({ withName: true }));
    expect(r.id).toBe(IDS.deviceId);
    expect(r.deviceName).toBe('Phone');
  });

  it('toListResponse', () => {
    const r = DeviceMapper.toListResponse([build()], 1);
    expect(r.total).toBe(1);
  });
});

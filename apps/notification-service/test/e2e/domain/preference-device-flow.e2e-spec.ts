/**
 * Preference + Device E2E
 * @module notification-service/test/e2e/domain
 */
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

import { PreferenceCheckerService } from '@domain/services/preference-checker.service.js';
import { QuietHoursService } from '@domain/services/quiet-hours.service.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const WEEK_AGO = new Date(Date.now() - 7 * 86_400_000).toISOString();

describe('Preference + Device — E2E', () => {
  it('register device → opt-out → check permission denied', () => {
    // 1. Register device
    const device = DeviceEntity.create({
      id: DeviceIdVO.create(IDS.deviceId),
      vo: DeviceVO.create({
        id: DeviceIdVO.create(IDS.deviceId),
        userId: UserIdVO.create(IDS.userId),
        type: DeviceTypeVO.create('android'),
        status: DeviceStatusVO.active(),
        token: DeviceTokenVO.create(IDS.deviceToken),
        platform: DevicePlatformVO.create('android'),
        lastActiveAt: NOW,
        registeredAt: WEEK_AGO,
      }),
      now: NOW,
    });
    expect(device.isActive()).toBe(true);
    expect(device.canReceive()).toBe(true);

    // 2. Setup preference with push disabled
    const preference = PreferenceEntity.reconstitute({
      id: IDS.preferenceId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: PreferenceVO.create({
          id: PreferenceIdVO.create(IDS.preferenceId),
          userId: UserIdVO.create(IDS.userId),
          type: PreferenceTypeVO.create('channel_specific'),
          options: [
            PreferenceOptionVO.create({ channel: 'email', enabled: true }),
            PreferenceOptionVO.create({ channel: 'push', enabled: false }),
          ],
          quietHoursEnabled: false,
          timezone: 'UTC',
          locale: 'en',
          locked: false,
        }),
      },
    });

    // 3. Check permission
    const permission = PreferenceCheckerService.check({
      preference: preference.vo,
      type: NotificationTypeVO.promotional(),
      category: NotificationCategoryVO.create('promotion'),
      channel: 'push',
    });
    expect(permission.allowed).toBe(false);
  });

  it('quiet hours — check at specific time', () => {
    const preference = PreferenceVO.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: true })],
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });

    const check = QuietHoursService.check({
      config: {
        enabled: true,
        start: 22,
        end: 8,
        timezone: 'UTC',
      },
      now: '2025-01-15T23:00:00Z',
    });
    expect(check.inQuietHours).toBe(true);

    // But transactional bypasses
    const permission = PreferenceCheckerService.check({
      preference,
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.create('order'),
      channel: 'email',
      localHour: 23,
    });
    expect(permission.allowed).toBe(true);
    expect(permission.reason).toBe('quiet-hours-bypass-critical');
  });

  it('block device → cannot receive', () => {
    const device = DeviceEntity.reconstitute({
      id: IDS.deviceId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: DeviceVO.create({
          id: DeviceIdVO.create(IDS.deviceId),
          userId: UserIdVO.create(IDS.userId),
          type: DeviceTypeVO.create('android'),
          status: DeviceStatusVO.active(),
          token: DeviceTokenVO.create(IDS.deviceToken),
          platform: DevicePlatformVO.create('android'),
          lastActiveAt: NOW,
          registeredAt: WEEK_AGO,
        }),
      },
    });
    device.block('suspicious', NOW);
    expect(device.isBlocked()).toBe(true);
    expect(device.canReceive()).toBe(false);
  });
});

import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW_MS = Date.now();
const NOW = new Date(NOW_MS).toISOString();
const WEEK_AGO = new Date(NOW_MS - 7 * 86_400_000).toISOString();

const makeVO = (overrides: any = {}) =>
  DeviceVO.create({
    id: DeviceIdVO.create(IDS.deviceId),
    userId: UserIdVO.create(IDS.userId),
    type: DeviceTypeVO.create('android'),
    status: DeviceStatusVO.active(),
    token: DeviceTokenVO.create(IDS.deviceToken),
    platform: DevicePlatformVO.create('android'),
    lastActiveAt: NOW,
    registeredAt: WEEK_AGO,
    ...overrides,
  });

describe('DeviceEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates active device + event', () => {
      const entity = DeviceEntity.create({
        id: DeviceIdVO.create(IDS.deviceId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isActive()).toBe(true);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-active status', () => {
      expect(() =>
        DeviceEntity.create({
          id: DeviceIdVO.create(IDS.deviceId),
          vo: makeVO({ status: DeviceStatusVO.inactive() }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.deviceId);
    });

    it('blocked state requires blockedAt', () => {
      expect(() =>
        DeviceEntity.reconstitute({
          id: IDS.deviceId,
          createdAt: NOW,
          updatedAt: NOW,
          props: { vo: makeVO({ status: DeviceStatusVO.blocked() }) },
        }),
      ).toThrow(ValidationError);
    });

    it('blocked with blockedAt OK', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: DeviceStatusVO.blocked() }),
          blockedAt: NOW,
        },
      });
      expect(entity.isBlocked()).toBe(true);
    });
  });

  describe('activate()', () => {
    it('inactive → active', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: DeviceStatusVO.inactive() }) },
      });
      entity.activate(NOW);
      expect(entity.isActive()).toBe(true);
    });
  });

  describe('deactivate()', () => {
    it('active → inactive', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.deactivate(NOW);
      expect(entity.vo.status.isInactive()).toBe(true);
    });
  });

  describe('refreshToken()', () => {
    it('updates token + lastActive', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      const newToken = DeviceTokenVO.create(IDS.deviceToken2);
      entity.refreshToken(newToken, NOW);
      expect(entity.token.value).toBe(IDS.deviceToken2);
    });

    it('rejects on terminal device', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: DeviceStatusVO.unregistered() }),
          unregisteredAt: NOW,
        },
      });
      expect(() => entity.refreshToken(DeviceTokenVO.create(IDS.deviceToken2), NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('block()', () => {
    it('sets blocked status + reason', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.block('suspicious activity', NOW);
      expect(entity.isBlocked()).toBe(true);
      expect(entity.blockedReason).toBe('suspicious activity');
    });
  });

  describe('unregister()', () => {
    it('sets unregistered status', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.unregister('user request', NOW);
      expect(entity.vo.status.isUnregistered()).toBe(true);
      expect(entity.unregisteredReason).toBe('user request');
    });

    it('no-op when already unregistered', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: DeviceStatusVO.unregistered() }),
          unregisteredAt: NOW,
        },
      });
      const eventsBefore = entity.domainEvents.length;
      entity.unregister(undefined, NOW);
      expect(entity.domainEvents.length).toBe(eventsBefore);
    });
  });

  describe('touchActivity()', () => {
    it('updates lastActive', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.touchActivity(NOW);
      expect(entity.vo.lastActiveAt).toBe(NOW);
    });
  });

  describe('predicates', () => {
    it('isStale delegates to VO', () => {
      // lastActive must be >= registeredAt (invariant)
      // registeredAt must be before lastActive — use 200 days ago
      const oldActive = new Date(NOW_MS - 100 * 86_400_000).toISOString();
      const olderRegistered = new Date(NOW_MS - 200 * 86_400_000).toISOString();
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            lastActiveAt: oldActive,
            registeredAt: olderRegistered,
          }),
        },
      });
      expect(entity.isStale()).toBe(true);
    });

    it('canReceive for active', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.canReceive()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.deviceId);
      expect(entity.deviceId.value).toBe(IDS.deviceId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.token).toBeDefined();
      expect(entity.blockedReason).toBeUndefined();
      expect(entity.blockedAt).toBeUndefined();
      expect(entity.unregisteredAt).toBeUndefined();
      expect(entity.unregisteredReason).toBeUndefined();
    });
  });
});

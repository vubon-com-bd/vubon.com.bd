import { DeviceTokenEntity } from '@domain/entities/device-token.entity.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

describe('DeviceTokenEntity (child)', () => {
  describe('create()', () => {
    it('creates active token', () => {
      const entity = DeviceTokenEntity.create({
        id: 'dt-1',
        deviceId: DeviceIdVO.create(IDS.deviceId),
        token: DeviceTokenVO.create(IDS.deviceToken),
        platform: DevicePlatformVO.create('android'),
        now: NOW,
      });
      expect(entity.active).toBe(true);
      expect(entity.revokedAt).toBeUndefined();
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = DeviceTokenEntity.reconstitute({
        id: 'dt-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          deviceId: DeviceIdVO.create(IDS.deviceId),
          token: DeviceTokenVO.create(IDS.deviceToken),
          platform: DevicePlatformVO.create('android'),
          active: false,
          revokedAt: NOW,
        },
      });
      expect(entity.active).toBe(false);
      expect(entity.revokedAt).toBe(NOW);
    });
  });

  describe('revoke()', () => {
    it('sets active=false + revokedAt', () => {
      const entity = DeviceTokenEntity.create({
        id: 'dt-1',
        deviceId: DeviceIdVO.create(IDS.deviceId),
        token: DeviceTokenVO.create(IDS.deviceToken),
        platform: DevicePlatformVO.create('android'),
        now: NOW,
      });
      entity.revoke(NOW);
      expect(entity.active).toBe(false);
      expect(entity.revokedAt).toBe(NOW);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = DeviceTokenEntity.create({
        id: 'dt-1',
        deviceId: DeviceIdVO.create(IDS.deviceId),
        token: DeviceTokenVO.create(IDS.deviceToken),
        platform: DevicePlatformVO.create('android'),
        now: NOW,
      });
      expect(entity.deviceId.value).toBe(IDS.deviceId);
      expect(entity.token.value).toBe(IDS.deviceToken);
      expect(entity.platform.value).toBe('android');
    });
  });
});

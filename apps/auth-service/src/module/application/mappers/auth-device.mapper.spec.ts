/**
 * AuthDeviceMapper — Unit Tests
 * @module auth-service/application/mappers
 */
import { AuthDeviceMapper } from './auth-device.mapper';
import { AuthDeviceEntity } from '../../domain/entities/auth-device.entity';
import { DeviceFingerprintVO } from '../../domain/value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../domain/value-objects/primitives/device-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildDevice = (overrides: Partial<Parameters<typeof AuthDeviceEntity.create>[0]> = {}) =>
  AuthDeviceEntity.create({
    id: 'dev-1',
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('trusted'),
    name: 'iPhone 15',
    firstSeenAt: NOW_MS,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthDeviceMapper', () => {
  const mapper = new AuthDeviceMapper();

  describe('map()', () => {
    it('should map all basic fields', () => {
      const dto = mapper.map(buildDevice());
      expect(dto.id).toBe('dev-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.name).toBe('iPhone 15');
      expect(dto.type).toBe('mobile');
      expect(dto.status).toBe('trusted');
    });

    it('should include masked fingerprint', () => {
      const dto = mapper.map(buildDevice());
      expect(dto.fingerprintMasked).toContain('…');
      expect(dto.fingerprintMasked).not.toBe('a'.repeat(64));
    });

    it('should set isTrusted=true for trusted', () => {
      expect(mapper.map(buildDevice()).isTrusted).toBe(true);
    });

    it('should set isTrusted=false for untrusted', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('untrusted') });
      expect(mapper.map(d).isTrusted).toBe(false);
    });

    it('should convert timestamps to ISO strings', () => {
      const dto = mapper.map(buildDevice());
      expect(dto.firstSeenAt).toBe(NOW);
      expect(dto.lastSeenAt).toBe(new Date(NOW_MS).toISOString());
    });
  });
});

/**
 * GetAuthDeviceHandler — Unit Tests
 */
import { GetAuthDeviceHandler } from './get-auth-device.handler';
import { GetAuthDeviceQuery } from './get-auth-device.query';
import { AuthDeviceEntity } from '../../../domain/entities/auth-device.entity';
import { DeviceFingerprintVO } from '../../../domain/value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../domain/value-objects/primitives/device-status.vo';
import { DeviceNotFoundError } from '../../../domain/errors/device.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildDevice = () =>
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
  });

const mockRepo = () => ({ findById: jest.fn() });

describe('GetAuthDeviceHandler', () => {
  let handler: GetAuthDeviceHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetAuthDeviceHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthDeviceQuery');
  });

  it('should throw when device not found', async () => {
    repo.findById.mockResolvedValue(null);
    const query = new GetAuthDeviceQuery('missing');

    await expect(handler.execute(query)).rejects.toThrow(DeviceNotFoundError);
  });

  it('should return mapped DTO', async () => {
    repo.findById.mockResolvedValue(buildDevice());
    const query = new GetAuthDeviceQuery('dev-1');

    const result = await handler.execute(query);

    expect(result.id).toBe('dev-1');
    expect(result.name).toBe('iPhone 15');
    expect(result.isTrusted).toBe(true);
    expect(result.fingerprintMasked).toContain('…');
  });
});

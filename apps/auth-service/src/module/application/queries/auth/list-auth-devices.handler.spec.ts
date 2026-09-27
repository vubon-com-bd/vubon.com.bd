/**
 * ListAuthDevicesHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { ListAuthDevicesHandler } from './list-auth-devices.handler.js';
import { ListAuthDevicesQuery } from './list-auth-devices.query.js';
import { AuthDeviceEntity } from '../../../domain/entities/auth-device.entity.js';
import { DeviceFingerprintVO } from '../../../domain/value-objects/primitives/device-fingerprint.vo.js';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../../../domain/value-objects/primitives/device-status.vo.js';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildDevice = (id: string) =>
  AuthDeviceEntity.create({
    id,
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('trusted'),
    name: `Device-${id}`,
    firstSeenAt: NOW_MS,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUser: jest.fn() as jest.Mock });

describe('ListAuthDevicesHandler', () => {
  let handler: ListAuthDevicesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthDevicesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthDevicesQuery');
  });

  it('should return list of device DTOs', async () => {
    repo.findByUser.mockResolvedValue([buildDevice('d1'), buildDevice('d2')]);
    const query = new ListAuthDevicesQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe('d1');
  });
});

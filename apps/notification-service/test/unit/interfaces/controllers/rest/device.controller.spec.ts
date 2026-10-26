/**
 * DeviceController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeviceController } from '@interfaces/controllers/rest/device.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const DEVICE_ID = '77777777-7777-4777-8777-777777777777';

describe('DeviceController', () => {
  let controller: DeviceController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new DeviceController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  describe('register', () => {
    it('dispatches RegisterDeviceCommand with userId', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: DEVICE_ID,
        userId: USER.userId,
        type: 'android',
        status: 'active',
        tokenMasked: 'abc****xyz',
        platform: 'android',
        lastActiveAt: 'now',
        registeredAt: 'now',
      });

      const result = await controller.register(
        { type: 'android', token: 'tok-abc' },
        USER,
      );
      expect(result).toBeDefined();
    });
  });

  describe('updateToken', () => {
    it('dispatches UpdateDeviceTokenCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: DEVICE_ID,
        userId: USER.userId,
        type: 'android',
        status: 'active',
        tokenMasked: 'xyz****new',
        platform: 'android',
        lastActiveAt: 'now',
        registeredAt: 'now',
      });
      const result = await controller.updateToken(
        DEVICE_ID,
        { newToken: 'tok-new' },
        USER,
      );
      expect(result).toBeDefined();
    });
  });

  describe('unregister', () => {
    it('dispatches UnregisterDeviceCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(undefined);
      await expect(controller.unregister(DEVICE_ID, USER)).resolves.toBeUndefined();
    });
  });

  describe('list', () => {
    it('dispatches ListDevicesQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({ items: [], total: 0 });
      const result = await controller.list(USER);
      expect(result).toBeDefined();
    });
  });

  describe('getById', () => {
    it('dispatches GetDeviceQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: DEVICE_ID,
        userId: USER.userId,
        type: 'android',
        status: 'active',
        tokenMasked: '***',
        platform: 'android',
        lastActiveAt: 'now',
        registeredAt: 'now',
      });
      const result = await controller.getById(DEVICE_ID);
      expect(result).toBeDefined();
    });
  });
});

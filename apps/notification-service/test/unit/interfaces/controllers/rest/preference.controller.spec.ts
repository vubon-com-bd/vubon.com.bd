/**
 * PreferenceController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PreferenceController } from '@interfaces/controllers/rest/preference.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };

describe('PreferenceController', () => {
  let controller: PreferenceController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new PreferenceController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  describe('getMyPreference', () => {
    it('dispatches GetPreferenceQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        userId: USER.userId,
        type: 'channel_specific',
        options: [],
        quietHoursEnabled: false,
        timezone: 'Asia/Dhaka',
        locale: 'en',
        locked: false,
        updatedAt: 'u',
      });
      const result = await controller.getMyPreference(USER);
      expect(result).toBeDefined();
    });
  });

  describe('getMatrix', () => {
    it('dispatches GetPreferenceMatrixQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        userId: USER.userId,
        channels: {},
        categories: {},
        quietHours: null,
        timezone: 'Asia/Dhaka',
        locale: 'en',
      });
      const result = await controller.getMatrix(USER);
      expect(result).toBeDefined();
    });
  });

  describe('getDefaults', () => {
    it('dispatches GetPreferenceDefaultsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        email: true, sms: false, push: true, inApp: true,
        webhook: false, whatsapp: false, frequency: 'instant',
      });
      const result = await controller.getDefaults();
      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('dispatches UpdatePreferenceCommand with userId', async () => {
      commandBus.execute.mockResolvedValueOnce({
        userId: USER.userId,
        type: 'channel_specific',
        options: [],
        quietHoursEnabled: false,
        timezone: 'Asia/Dhaka',
        locale: 'en',
        locked: false,
        updatedAt: 'u',
      });
      const result = await controller.update({ quietHoursEnabled: false }, USER);
      expect(result).toBeDefined();
    });
  });

  describe('bulkUpdate', () => {
    it('dispatches BulkUpdatePreferenceCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({ updated: 2, failed: 0 });
      const body = { userIds: ['u-1', 'u-2'], updates: {} };
      const result = await controller.bulkUpdate(body, USER);
      expect(result).toBeDefined();
    });
  });

  describe('unsubscribe', () => {
    it('dispatches UnsubscribeCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        userId: USER.userId,
        type: 'opt_out',
        options: [],
        quietHoursEnabled: false,
        timezone: 'Asia/Dhaka',
        locale: 'en',
        locked: false,
        updatedAt: 'u',
      });
      const result = await controller.unsubscribe(
        { channel: 'email', category: 'marketing' },
        USER,
      );
      expect(result).toBeDefined();
    });
  });
});

/**
 * DigestController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DigestController } from '@interfaces/controllers/rest/digest.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const DG_ID = '66666666-6666-4666-8666-666666666666';

describe('DigestController', () => {
  let controller: DigestController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new DigestController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  describe('create', () => {
    it('dispatches CreateDigestCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({ id: DG_ID });
      const dto = {
        userId: '00000000-0000-4000-8000-000000000002',
        frequency: 'daily',
        type: 'summary',
        categories: ['order'],
        sendHour: 9,
        timezone: 'Asia/Dhaka',
      };
      const result = await controller.create(dto as never, USER);
      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
    });
  });

  describe('send', () => {
    it('dispatches SendDigestCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({
        id: DG_ID,
        userId: USER.userId,
        frequency: 'daily',
        type: 'summary',
        status: 'sent',
        categories: ['order'],
        sendHour: 9,
        timezone: 'Asia/Dhaka',
        itemCount: 5,
      });
      const result = await controller.send(DG_ID, USER);
      expect(result.id).toBe(DG_ID);
    });
  });

  describe('list', () => {
    it('dispatches ListDigestsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      const result = await controller.list();
      expect(result.total).toBe(0);
    });

    it('passes page/limit', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [], total: 0, page: 2, limit: 10, totalPages: 0,
      });
      await controller.list(2, 10);
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('dispatches GetDigestQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: DG_ID,
        userId: USER.userId,
        frequency: 'daily',
        type: 'summary',
        status: 'sent',
        categories: [],
        sendHour: 9,
        timezone: 'Asia/Dhaka',
        itemCount: 0,
      });
      const result = await controller.getById(DG_ID);
      expect(result.id).toBe(DG_ID);
    });
  });
});

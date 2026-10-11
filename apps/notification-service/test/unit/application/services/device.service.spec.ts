import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeviceService } from '../../../../src/module/application/services/impl/device.service.js';
import { DeviceEntity } from '../../../../src/module/domain/entities/device.entity.js';
import { DeviceTypeVO } from '../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceTokenVO } from '../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makeDeviceRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

const VALID_TOKEN = 'abcdefghijklmnop123456';

function build(): DeviceEntity {
  return DeviceEntity.register({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      userId: FIXED_USER_ID,
      type: DeviceTypeVO.android(),
      token: DeviceTokenVO.create(VALID_TOKEN),
      platform: 'android',
    },
  });
}

function makeService() {
  const repo = makeDeviceRepo();
  const events = makeEventBridge();
  const svc = new DeviceService(repo as never, events as never);
  return { svc, repo, events };
}

describe('DeviceService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('register', () => {
    it('registers new device', async () => {
      const r = await ctx.svc.register({
        userId: FIXED_USER_ID,
        type: 'android',
        token: VALID_TOKEN,
        platform: 'android',
        appVersion: '1.0',
        osVersion: '14',
      });
      expect(r.userId).toBe(FIXED_USER_ID);
    });

    it('refreshes existing token', async () => {
      ctx.repo.findByToken.mockResolvedValueOnce(build());
      const r = await ctx.svc.register({
        userId: FIXED_USER_ID, type: 'android', token: VALID_TOKEN,
      });
      expect(r).toBeDefined();
    });

    it('throws when max devices reached', async () => {
      ctx.repo.countByUserId.mockResolvedValueOnce(100);
      await expect(ctx.svc.register({
        userId: FIXED_USER_ID, type: 'android', token: VALID_TOKEN,
      })).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.update({ deviceId: '33333333-3333-3333-3333-333333333333' } as never)).rejects.toThrow();
    });

    it('updates fields', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        deviceId: '33333333-3333-3333-3333-333333333333',
        token: 'newtoken0123456789ab',
        appVersion: '2.0',
        osVersion: '15',
        deviceName: 'Phone',
      } as never);
      expect(r).toBeDefined();
    });
  });

  describe('refreshToken', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.refreshToken({
        deviceId: '33333333-3333-3333-3333-333333333333', newToken: 'newtoken0123456789ab',
      })).rejects.toThrow();
    });

    it('refreshes token', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.refreshToken({
        deviceId: '33333333-3333-3333-3333-333333333333', newToken: 'newtoken0123456789ab',
      });
      expect(r).toBeDefined();
    });
  });

  describe('remove', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.remove({ deviceId: '33333333-3333-3333-3333-333333333333' } as never)).rejects.toThrow();
    });

    it('unregisters', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      await ctx.svc.remove({ deviceId: '33333333-3333-3333-3333-333333333333', reason: 'logout' } as never);
      expect(ctx.repo.save).toHaveBeenCalled();
    });
  });

  describe('block', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.block({ deviceId: '33333333-3333-3333-3333-333333333333', reason: 'abuse' })).rejects.toThrow();
    });

    it('blocks', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.block({ deviceId: '33333333-3333-3333-3333-333333333333', reason: 'abuse' });
      expect(r).toBeDefined();
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ deviceId: '33333333-3333-3333-3333-333333333333' })).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ deviceId: '33333333-3333-3333-3333-333333333333' });
      expect(r.userId).toBe(FIXED_USER_ID);
    });
  });

  describe('list', () => {
    it('paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('by userId', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce([build()]);
      const r = await ctx.svc.list({ userId: FIXED_USER_ID, page: 1, limit: 20 });
      expect(r.total).toBe(1);
    });

    it('by userId with page > 1', async () => {
      ctx.repo.findByUserId.mockResolvedValueOnce([build(), build(), build()]);
      const r = await ctx.svc.list({ userId: FIXED_USER_ID, page: 2, limit: 2 });
      expect(r.items.length).toBe(1);
    });

    it('with sortBy', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20, sortBy: 'lastActiveAt', sortDir: 'desc' });
      expect(r).toBeDefined();
    });
  });

  describe('listActiveByUser', () => {
    it('returns active devices', async () => {
      ctx.repo.findActiveByUserId.mockResolvedValueOnce([build()]);
      const r = await ctx.svc.listActiveByUser(FIXED_USER_ID);
      expect(r.length).toBe(1);
    });
  });
});

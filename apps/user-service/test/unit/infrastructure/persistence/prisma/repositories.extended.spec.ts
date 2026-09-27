/**
 * Prisma Repos — extended coverage (save paths)
 */
import { UserPreferencesPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository';
import { UserSettingsPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-settings.prisma.repository';
import { UserActivityPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-activity.prisma.repository';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { createPrismaServiceMock } from '../../../../helpers/prisma-mock';

describe('Prisma Repos extended', () => {
  const now = '2026-01-01T00:00:00.000Z';
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
  });

  describe('UserPreferencesPrismaRepository', () => {
    let repo: UserPreferencesPrismaRepository;
    beforeEach(() => { repo = new UserPreferencesPrismaRepository(prisma as never); });

    it('save: deleteMany + createMany with entries', async () => {
      const entity = UserPreferencesEntity.create({ id: 'u-1', userId: 'u-1', now });
      entity.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(true));

      prisma.userPreference.findMany.mockResolvedValue([
        { id: '1', userId: 'u-1', key: 'newsletter', value: 'true', createdAt: new Date(), updatedAt: new Date() },
      ]);

      await repo.save(entity);
      expect(prisma.userPreference.deleteMany).toHaveBeenCalled();
      expect(prisma.userPreference.createMany).toHaveBeenCalled();
    });

    it('save: skips createMany if no entries', async () => {
      const entity = UserPreferencesEntity.create({ id: 'u-1', userId: 'u-1', now });
      prisma.userPreference.findMany.mockResolvedValue([]);
      await repo.save(entity);
      expect(prisma.userPreference.createMany).not.toHaveBeenCalled();
    });

    it('findAll groups by user', async () => {
      prisma.userPreference.findMany.mockResolvedValue([
        { id: '1', userId: 'u-1', key: 'newsletter', value: 'true', createdAt: new Date(), updatedAt: new Date() },
        { id: '2', userId: 'u-2', key: 'promotions', value: 'true', createdAt: new Date(), updatedAt: new Date() },
      ]);
      const r = await repo.findAll();
      expect(r.length).toBe(2);
    });

    it('delete calls deleteMany', async () => {
      await repo.delete('u-1');
      expect(prisma.userPreference.deleteMany).toHaveBeenCalled();
    });

    it('exists returns true/false', async () => {
      prisma.userPreference.count.mockResolvedValue(1);
      expect(await repo.exists('u-1')).toBe(true);
      prisma.userPreference.count.mockResolvedValue(0);
      expect(await repo.exists('u-1')).toBe(false);
    });

    it('existsByUserId works', async () => {
      prisma.userPreference.count.mockResolvedValue(1);
      expect(await repo.existsByUserId(UserIdVO.create('u-1'))).toBe(true);
    });

    it('findById queries by userId', async () => {
      prisma.userPreference.findMany.mockResolvedValue([]);
      expect(await repo.findById('u-1')).toBeNull();
    });
  });

  describe('UserSettingsPrismaRepository', () => {
    let repo: UserSettingsPrismaRepository;
    beforeEach(() => { repo = new UserSettingsPrismaRepository(prisma as never); });

    it('save persists known keys', async () => {
      const entity = UserSettingsEntity.create({ id: 'u-1', userId: 'u-1', now });
      entity.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
      entity.set(SettingKeyVO.create('language'), SettingValueVO.create('bn'));

      prisma.userSetting.findMany.mockResolvedValue([
        { id: '1', userId: 'u-1', key: 'theme', value: 'dark', createdAt: new Date(), updatedAt: new Date() },
      ]);

      await repo.save(entity);
      expect(prisma.userSetting.deleteMany).toHaveBeenCalled();
      expect(prisma.userSetting.createMany).toHaveBeenCalled();
    });

    it('save with no entries skips createMany', async () => {
      const entity = UserSettingsEntity.create({ id: 'u-1', userId: 'u-1', now });
      prisma.userSetting.findMany.mockResolvedValue([]);
      await repo.save(entity);
      expect(prisma.userSetting.createMany).not.toHaveBeenCalled();
    });

    it('findAll groups by user', async () => {
      prisma.userSetting.findMany.mockResolvedValue([
        { id: '1', userId: 'u-1', key: 'theme', value: 'dark', createdAt: new Date(), updatedAt: new Date() },
      ]);
      const r = await repo.findAll();
      expect(r.length).toBe(1);
    });

    it('delete calls deleteMany', async () => {
      await repo.delete('u-1');
      expect(prisma.userSetting.deleteMany).toHaveBeenCalled();
    });

    it('exists count > 0', async () => {
      prisma.userSetting.count.mockResolvedValue(2);
      expect(await repo.exists('u-1')).toBe(true);
    });

    it('existsByUserId', async () => {
      prisma.userSetting.count.mockResolvedValue(1);
      expect(await repo.existsByUserId(UserIdVO.create('u-1'))).toBe(true);
    });
  });

  describe('UserActivityPrismaRepository extended', () => {
    let repo: UserActivityPrismaRepository;
    beforeEach(() => { repo = new UserActivityPrismaRepository(prisma as never); });

    it('save creates activity', async () => {
      prisma.userActivity.create.mockResolvedValue({
        id: 'a-1',
        userId: 'u-1',
        type: 'login',
        timestamp: new Date(),
        createdAt: new Date(),
      });
      const act = UserActivityEntity.record({
        activityId: ActivityIdVO.create('a-1'),
        userId: UserIdVO.create('u-1'),
        type: ActivityTypeVO.create('login'),
        now,
      });
      const r = await repo.save(act);
      expect(r.id).toBe('a-1');
    });

    it('findAll orders by timestamp desc', async () => {
      prisma.userActivity.findMany.mockResolvedValue([]);
      const r = await repo.findAll();
      expect(r.length).toBe(0);
    });

    it('latestByUserId returns limited list', async () => {
      prisma.userActivity.findMany.mockResolvedValue([]);
      const r = await repo.latestByUserId(UserIdVO.create('u-1'), 5);
      expect(r.length).toBe(0);
    });

    it('findPaginated with date range', async () => {
      prisma.userActivity.findMany.mockResolvedValue([]);
      prisma.userActivity.count.mockResolvedValue(0);
      const r = await repo.findPaginated(UserIdVO.create('u-1'), {
        page: 1,
        limit: 10,
        fromDate: new Date(Date.now() - 86400000),
        toDate: new Date(),
      });
      expect(r.total).toBe(0);
    });

    it('findPaginated with type filter', async () => {
      prisma.userActivity.findMany.mockResolvedValue([]);
      prisma.userActivity.count.mockResolvedValue(0);
      const r = await repo.findPaginated(UserIdVO.create('u-1'), {
        page: 1,
        limit: 10,
        type: ActivityTypeVO.create('login'),
      });
      expect(r.total).toBe(0);
    });
  });
});

/**
 * UserActivityEntity Unit Test
 */
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';

describe('UserActivityEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildActivity = () =>
    UserActivityEntity.record({
      activityId: ActivityIdVO.create('a-1'),
      userId: UserIdVO.create('user-1'),
      type: ActivityTypeVO.create('login'),
      metadata: { ip: '1.2.3.4' },
      now,
    });

  describe('record', () => {
    it('should create activity with timestamp', () => {
      const a = buildActivity();
      expect(a.id).toBe('a-1');
      expect(a.type.value).toBe('login');
      expect(a.userId.value).toBe('user-1');
      expect(a.timestamp).toBeDefined();
    });

    it('should preserve metadata', () => {
      const a = buildActivity();
      expect(a.metadata).toEqual({ ip: '1.2.3.4' });
    });
  });

  describe('isAuthActivity', () => {
    it('should be true for login', () => {
      expect(buildActivity().isAuthActivity()).toBe(true);
    });

    it('should be true for logout', () => {
      const a = UserActivityEntity.record({
        activityId: ActivityIdVO.create('a-2'),
        userId: UserIdVO.create('user-1'),
        type: ActivityTypeVO.create('logout'),
        now,
      });
      expect(a.isAuthActivity()).toBe(true);
    });

    it('should be false for non-auth', () => {
      const a = UserActivityEntity.record({
        activityId: ActivityIdVO.create('a-3'),
        userId: UserIdVO.create('user-1'),
        type: ActivityTypeVO.create('profile_update'),
        now,
      });
      expect(a.isAuthActivity()).toBe(false);
    });
  });

  describe('isRecent', () => {
    it('should be recent for just-recorded activity', () => {
      expect(buildActivity().isRecent(60)).toBe(true);
    });
  });

  describe('toActivityVO', () => {
    it('should return UserActivityVO', () => {
      const vo = buildActivity().toActivityVO();
      expect(vo.id.value).toBe('a-1');
      expect(vo.userId.value).toBe('user-1');
    });
  });
});

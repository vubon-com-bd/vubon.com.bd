/**
 * UserActivityMapper Unit Test
 */
import { UserActivityMapper } from '@application/mappers/user-activity.mapper';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';

describe('UserActivityMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildActivity = () =>
    UserActivityEntity.record({
      activityId: ActivityIdVO.create('act-1'),
      userId: UserIdVO.create('user-1'),
      type: ActivityTypeVO.create('login'),
      now,
    });

  describe('toResponse', () => {
    it('should map to ActivityResponseDTO', () => {
      const dto = UserActivityMapper.toResponse(buildActivity());
      expect(dto.id).toBe('act-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.type).toBe('login');
      expect(typeof dto.timestamp).toBe('string');
    });
  });

  describe('toResponseList', () => {
    it('should map a list', () => {
      expect(UserActivityMapper.toResponseList([buildActivity()]).length).toBe(1);
    });
  });
});

import { UserActivityVO } from '@domain/value-objects/composites/user-activity.vo';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

describe('UserActivityVO', () => {
  const build = (type: 'login' | 'profile_update' = 'login', recent = true) =>
    UserActivityVO.create({
      id: ActivityIdVO.create('a-1'),
      userId: UserIdVO.create('u-1'),
      type: ActivityTypeVO.create(type),
      timestamp: recent ? ActivityTimestampVO.now() : ActivityTimestampVO.fromEpochMs(Date.now() - 86400000),
    });

  it('creates activity', () => {
    const vo = build();
    expect(vo.id.value).toBe('a-1');
  });

  it('isAuthActivity for login', () => {
    expect(build('login').isAuthActivity()).toBe(true);
  });

  it('isAuthActivity false for profile_update', () => {
    expect(build('profile_update').isAuthActivity()).toBe(false);
  });

  it('isRecent true for now', () => {
    expect(build('login', true).isRecent(60)).toBe(true);
  });

  it('isRecent false for yesterday', () => {
    expect(build('login', false).isRecent(60)).toBe(false);
  });

  it('throws when id missing', () => {
    expect(() =>
      UserActivityVO.create({ id: null as never, userId: {} as never, type: {} as never, timestamp: {} as never })
    ).toThrow();
  });
});

import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';

describe('ActivityTypeVO', () => {
  it('should create login type', () => {
    const vo = ActivityTypeVO.create('login');
    expect(vo.value).toBe('login');
    expect(vo.isAuthActivity()).toBe(true);
  });
  it('should create logout type', () => {
    expect(ActivityTypeVO.create('logout').isAuthActivity()).toBe(true);
  });
  it('should not mark non-auth as auth', () => {
    expect(ActivityTypeVO.create('profile_update').isAuthActivity()).toBe(false);
  });
  it('should throw on invalid', () => {
    expect(() => ActivityTypeVO.create('invalid')).toThrow();
  });
});

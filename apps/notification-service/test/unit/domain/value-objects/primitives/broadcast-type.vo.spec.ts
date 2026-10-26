import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { InvalidBroadcastTypeError } from '@domain/errors/broadcast.errors.js';

describe('BroadcastTypeVO', () => {
  it.each(['all_users', 'segment', 'role_based', 'location_based', 'behavior_based', 'custom_list'])(
    'accepts "%s"',
    (t) => {
      expect(BroadcastTypeVO.create(t).value).toBe(t);
    },
  );

  it('rejects invalid', () => {
    expect(() => BroadcastTypeVO.create('whatever')).toThrow(InvalidBroadcastTypeError);
  });

  it('isMass for all_users', () => {
    expect(BroadcastTypeVO.create('all_users').isMass()).toBe(true);
    expect(BroadcastTypeVO.create('segment').isMass()).toBe(false);
  });

  it('isTargeted for non-all_users', () => {
    expect(BroadcastTypeVO.create('segment').isTargeted()).toBe(true);
    expect(BroadcastTypeVO.create('all_users').isTargeted()).toBe(false);
  });

  it('requiresAudienceDefinition for segment/custom_list', () => {
    expect(BroadcastTypeVO.create('segment').requiresAudienceDefinition()).toBe(true);
    expect(BroadcastTypeVO.create('custom_list').requiresAudienceDefinition()).toBe(true);
    expect(BroadcastTypeVO.create('all_users').requiresAudienceDefinition()).toBe(false);
  });
});

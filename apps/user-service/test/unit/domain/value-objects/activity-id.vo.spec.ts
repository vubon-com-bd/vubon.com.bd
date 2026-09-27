import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';

describe('ActivityIdVO', () => {
  it('should create valid id', () => {
    expect(ActivityIdVO.create('a-1').value).toBe('a-1');
  });
  it('should throw on empty', () => {
    expect(() => ActivityIdVO.create('')).toThrow();
  });
});

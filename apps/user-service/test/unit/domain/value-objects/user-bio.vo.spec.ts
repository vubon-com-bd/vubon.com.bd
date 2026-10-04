import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';

describe('UserBioVO', () => {
  it('should create valid bio', () => {
    expect(UserBioVO.create('Hello world').value).toBe('Hello world');
  });
  it('should trim whitespace', () => {
    expect(UserBioVO.create('  hi  ').value).toBe('hi');
  });
  it('should count words', () => {
    expect(UserBioVO.create('hello world test').wordCount).toBe(3);
  });
  it('should support empty', () => {
    expect(UserBioVO.empty().isEmpty()).toBe(true);
  });
  it('should truncate long text', () => {
    const vo = UserBioVO.create('a'.repeat(100));
    const truncated = vo.truncate(20);
    expect(truncated.length).toBeLessThanOrEqual(20);
  });
});

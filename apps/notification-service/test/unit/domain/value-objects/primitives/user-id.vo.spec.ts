import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('UserIdVO', () => {
  it('creates from valid', () => {
    expect(UserIdVO.create(IDS.userId).value).toBe(IDS.userId);
  });

  it('trims whitespace', () => {
    expect(UserIdVO.create(`  ${IDS.userId}  `).value).toBe(IDS.userId);
  });

  it('rejects empty', () => {
    expect(() => UserIdVO.create('')).toThrow(ValidationError);
  });

  it('rejects non-string', () => {
    expect(() => UserIdVO.create(0 as any)).toThrow(ValidationError);
  });

  it('toBranded / fromBranded round-trip', () => {
    const vo = UserIdVO.create(IDS.userId);
    const branded = vo.toBranded();
    const back = UserIdVO.fromBranded(branded);
    expect(back.value).toBe(IDS.userId);
  });

  it('reconstitute skips validation', () => {
    expect(UserIdVO.reconstitute('x').value).toBe('x');
  });
});

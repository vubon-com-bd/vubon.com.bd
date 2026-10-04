import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('UserIdVO', () => {
  it('creates from UUID', () => {
    expect(UserIdVO.create(UUID).value).toBe(UUID);
  });
  it('rejects non-UUID', () => {
    expect(() => UserIdVO.create('abc')).toThrow(ValidationError);
  });
});

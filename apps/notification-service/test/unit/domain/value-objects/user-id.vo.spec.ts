import { describe, it, expect } from '@jest/globals';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FIXED_USER_ID } from '../../../helpers/test-factories.js';

describe('UserIdVO', () => {
  it('create valid', () => expect(UserIdVO.create(FIXED_USER_ID).value).toBe(FIXED_USER_ID));
  it('rejects empty', () => expect(() => UserIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => UserIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(UserIdVO.reconstitute('any').value).toBe('any'));
});

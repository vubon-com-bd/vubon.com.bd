import { describe, it, expect } from '@jest/globals';
import { PreferenceIdVO } from '../../../../src/module/domain/value-objects/primitives/preference-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('PreferenceIdVO', () => {
  it('create valid', () => expect(PreferenceIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => PreferenceIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => PreferenceIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(PreferenceIdVO.reconstitute('any').value).toBe('any'));
});

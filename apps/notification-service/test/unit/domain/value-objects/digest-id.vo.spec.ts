import { describe, it, expect } from '@jest/globals';
import { DigestIdVO } from '../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('DigestIdVO', () => {
  it('create valid', () => expect(DigestIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => DigestIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => DigestIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(DigestIdVO.reconstitute('any').value).toBe('any'));
});

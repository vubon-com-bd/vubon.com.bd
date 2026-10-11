import { describe, it, expect } from '@jest/globals';
import { VendorIdVO } from '../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('VendorIdVO', () => {
  it('create valid', () => expect(VendorIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => VendorIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => VendorIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(VendorIdVO.reconstitute('any').value).toBe('any'));
});

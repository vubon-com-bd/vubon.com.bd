import { describe, it, expect } from '@jest/globals';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('ProductIdVO', () => {
  it('create valid', () => expect(ProductIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => ProductIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => ProductIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(ProductIdVO.reconstitute('any').value).toBe('any'));
});

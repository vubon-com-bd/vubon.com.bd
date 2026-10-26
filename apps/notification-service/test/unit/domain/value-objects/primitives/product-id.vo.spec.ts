import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('ProductIdVO', () => {
  it('creates valid', () => {
    expect(ProductIdVO.create(IDS.productId).value).toBe(IDS.productId);
  });
  it('rejects empty', () => {
    expect(() => ProductIdVO.create('')).toThrow(ValidationError);
  });
  it('branded round-trip', () => {
    const vo = ProductIdVO.create(IDS.productId);
    expect(ProductIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.productId);
  });
});

/**
 * PublishValidatorService — unit tests
 */
import { PublishValidatorService } from '../../../src/module/domain/services/publish-validator.service.js';
import { buildProduct, buildVariant, buildMedia } from '../../fixtures.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { ProductTypeVO } from '../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { DEFAULT_CURRENCY } from '../../helpers.js';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business/product';

describe('PublishValidatorService', () => {
  let service: PublishValidatorService;

  beforeEach(() => {
    service = new PublishValidatorService();
  });

  describe('validate()', () => {
    it('should pass for well-formed physical product', () => {
      const product = buildProduct();
      const result = service.validate(product, [buildVariant()], [buildMedia()]);
      expect(result.allowed).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should fail when description is empty', () => {
      const product = buildProduct({ description: ProductDescriptionVO.empty() });
      const result = service.validate(product, [buildVariant()], [buildMedia()]);
      expect(result.allowed).toBe(false);
      expect(result.errors).toContain('description is required');
    });

    it('should fail when price is zero', () => {
      const product = buildProduct({ price: PriceVO.create(0, DEFAULT_CURRENCY) });
      const result = service.validate(product, [], [buildMedia()]);
      expect(result.allowed).toBe(false);
    });

    it('should fail when physical product has no stock', () => {
      const product = buildProduct({ totalStock: 0 });
      const result = service.validate(product, [], [buildMedia()]);
      expect(result.allowed).toBe(false);
    });

    it('should fail when no images in media', () => {
      const product = buildProduct();
      const videoMedia = buildMedia({ type: 'video' });
      const result = service.validate(product, [buildVariant()], [videoMedia]);
      expect(result.allowed).toBe(false);
      expect(result.errors).toContain('at least one product image required');
    });

    it('should fail variable product without variants', () => {
      const product = buildProduct({
        type: ProductTypeVO.create(PRODUCT_TYPE.VARIABLE),
      });
      const result = service.validate(product, [], [buildMedia()]);
      expect(result.allowed).toBe(false);
    });

    it('should warn when all variants out of stock', () => {
      const product = buildProduct();
      const variant = buildVariant({ stock: 0 });
      const result = service.validate(product, [variant], [buildMedia()]);
      expect(result.warnings).toContain('all variants are out of stock');
    });

    it('should warn when no primary image', () => {
      const product = buildProduct();
      const media = buildMedia({ isPrimary: false });
      const result = service.validate(product, [buildVariant()], [media]);
      expect(result.warnings).toContain('no primary image set');
    });
  });
});

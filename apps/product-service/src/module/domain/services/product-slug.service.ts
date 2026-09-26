import { ProductNameVO } from '../value-objects/primitives/product-name.vo';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo';

export class ProductSlugService {
  static fromName(name: ProductNameVO): ProductSlugVO {
    const slug = name.value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return ProductSlugVO.create(slug);
  }
}

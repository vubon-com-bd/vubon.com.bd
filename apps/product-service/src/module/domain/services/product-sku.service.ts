import { ProductNameVO } from '../value-objects/primitives/product-name.vo';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo';

export class ProductSkuService {
  static generate(name: ProductNameVO, suffix?: string): ProductSkuVO {
    const base = name.value
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '')
      .slice(0, 8)
      .padEnd(3, 'X');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const sku = suffix ? `${base}-${suffix}-${rand}` : `${base}-${rand}`;
    return ProductSkuVO.create(sku);
  }
}

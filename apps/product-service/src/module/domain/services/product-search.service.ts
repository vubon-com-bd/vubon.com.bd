import { ProductEntity } from '../entities/product.entity';

export class ProductSearchService {
  static matches(product: ProductEntity, term: string): boolean {
    const t = term.toLowerCase();
    return (
      product.name.value.toLowerCase().includes(t) ||
      product.sku.value.toLowerCase().includes(t) ||
      product.slug.value.toLowerCase().includes(t)
    );
  }

  static buildSearchText(product: ProductEntity): string {
    return [product.name.value, product.sku.value, product.slug.value].join(' ');
  }
}

export interface BundleProductData {
  productId: string;
  product: { id: string; name: string; price: number };
  quantity: number;
  price: { amount: number; currency: string };
}

export interface BundleData {
  bundleId: string;
  name: string;
  description: string;
  type: string;
  products: BundleProductData[];
  productCount: number;
  originalPrice: { amount: number; currency: string };
  bundlePrice: { amount: number; currency: string };
  discount: number;
  discountPercentage: number;
  isActive: boolean;
  isFeatured: boolean;
  status: string;
  validUntil: Date;
  metadata: Record<string, unknown>;
}

export class BundleBuilder {
  private name = '';
  private description = '';
  private type = 'fixed';
  private products: { product: { id: string; name: string; price: number }; quantity: number }[] =
    [];
  private discount = 0;
  private discountPercentage = 0;

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  addProduct(product: { id: string; name: string; price: number }, quantity: number): this {
    this.products.push({ product, quantity });
    return this;
  }

  setDiscount(discount: number): this {
    this.discount = discount;
    return this;
  }

  setDiscountPercentage(discountPercentage: number): this {
    this.discountPercentage = discountPercentage;
    return this;
  }

  build(): BundleData {
    const originalPrice = this.products.reduce((sum, p) => sum + p.product.price * p.quantity, 0);
    const bundlePrice = originalPrice - this.discount;
    return {
      bundleId: crypto.randomUUID(),
      name: this.name,
      description: this.description,
      type: this.type,
      products: this.products.map((p) => ({
        productId: p.product.id,
        product: p.product,
        quantity: p.quantity,
        price: { amount: p.product.price, currency: 'BDT' },
      })),
      productCount: this.products.length,
      originalPrice: { amount: originalPrice, currency: 'BDT' },
      bundlePrice: { amount: bundlePrice, currency: 'BDT' },
      discount: this.discount,
      discountPercentage:
        this.discountPercentage || (originalPrice > 0 ? (this.discount / originalPrice) * 100 : 0),
      isActive: true,
      isFeatured: false,
      status: 'active',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      metadata: {},
    };
  }
}

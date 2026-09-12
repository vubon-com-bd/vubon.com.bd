import { ValueObject } from '../base/base.vo';

export class SKU extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('SKU cannot be empty');
    }
    if (!/^[A-Z0-9-]+$/.test(this._value)) {
      throw new Error('SKU must contain only uppercase letters, numbers, and hyphens');
    }
  }

  get parts(): string[] {
    return this._value.split('-');
  }

  get prefix(): string {
    return this.parts[0] || '';
  }

  get category(): string {
    return this.parts[1] || '';
  }

  get product(): string {
    return this.parts[2] || '';
  }

  get variant(): string {
    return this.parts.slice(3, -1).join('-') || '';
  }

  get serial(): string {
    return this.parts[this.parts.length - 1] || '';
  }

  isEqual(sku: SKU): boolean {
    return this._value === sku._value;
  }

  isForCategory(category: string): boolean {
    return this.category === category.toUpperCase();
  }

  static generate(options: {
    prefix?: string;
    category?: string;
    product?: string;
    variant?: string;
    serial?: string | number;
  }): SKU {
    const prefix = options.prefix || 'PRD';
    const category = options.category ? options.category.slice(0, 3).toUpperCase() : '';
    const product = options.product ? options.product.slice(0, 3).toUpperCase() : '';
    const variant = options.variant ? `-${options.variant.slice(0, 3).toUpperCase()}` : '';
    const serial =
      options.serial !== undefined
        ? `-${String(options.serial).padStart(6, '0')}`
        : `-${Math.floor(10000 + Math.random() * 90000)}`;

    const parts = [prefix];
    if (category) parts.push(category);
    if (product) parts.push(product);
    if (variant) parts.push(variant);
    parts.push(serial);

    return new SKU(parts.join(''));
  }

  static fromString(value: string): SKU {
    return new SKU(value);
  }
}

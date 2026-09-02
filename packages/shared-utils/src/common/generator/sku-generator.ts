/**
 * SKU Generator
 * এসকেইউ জেনারেটর
 */
export const skuGenerator = {
  /**
   * Generate SKU
   * এসকেইউ তৈরি করা
   */
  generate: (options: {
    prefix?: string;
    category?: string;
    productName?: string;
    attributes?: Record<string, string>;
    randomLength?: number;
  }): string => {
    const prefix = options.prefix || 'PRD';
    const category = options.category ? options.category.slice(0, 3).toUpperCase() : '';
    const product = options.productName ? options.productName.slice(0, 3).toUpperCase() : '';
    const randomLength = options.randomLength || 5;

    // Generate random number
    const random = Math.random()
      .toString(36)
      .substring(2, 2 + randomLength)
      .toUpperCase();

    // Build SKU parts
    const parts = [prefix];
    if (category) parts.push(category);
    if (product) parts.push(product);
    if (options.attributes) {
      const attrStr = Object.values(options.attributes)
        .map((v) => v.slice(0, 2).toUpperCase())
        .join('');
      if (attrStr) parts.push(attrStr);
    }
    parts.push(random);

    return parts.join('-');
  },

  /**
   * Generate product SKU
   * প্রোডাক্ট এসকেইউ তৈরি করা
   */
  generateProductSKU: (category: string, productName: string, variant?: string): string => {
    const prefix = 'PROD';
    const catCode = category.slice(0, 3).toUpperCase();
    const nameCode = productName.slice(0, 3).toUpperCase();
    const random = Math.floor(10000 + Math.random() * 90000);
    const variantCode = variant ? `-${variant.slice(0, 3).toUpperCase()}` : '';

    return `${prefix}-${catCode}-${nameCode}${variantCode}-${random}`;
  },

  /**
   * Generate variant SKU
   * ভেরিয়েন্ট এসকেইউ তৈরি করা
   */
  generateVariantSKU: (baseSKU: string, options: Record<string, string>): string => {
    const variantCode = Object.values(options)
      .map((v) => v.slice(0, 2).toUpperCase())
      .join('-');

    return `${baseSKU}-${variantCode}`;
  },

  /**
   * Generate batch SKU
   * ব্যাচ এসকেইউ তৈরি করা
   */
  generateBatchSKU: (productSKU: string, batchNumber: number): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${productSKU}-B${batchNumber}-${year}${month}${day}`;
  },

  /**
   * Generate serial SKU
   * সিরিয়াল এসকেইউ তৈরি করা
   */
  generateSerialSKU: (productSKU: string, serialNumber: number): string => {
    const paddedSerial = String(serialNumber).padStart(6, '0');
    return `${productSKU}-SN-${paddedSerial}`;
  },

  /**
   * Validate SKU format
   * এসকেইউ ফরম্যাট ভ্যালিডেট করা
   */
  isValid: (
    sku: string
  ): {
    isValid: boolean;
    parts: string[];
    errors: string[];
  } => {
    const errors: string[] = [];
    const parts = sku.split('-');

    if (parts.length < 2) {
      errors.push('SKU must have at least 2 parts');
    }

    for (const part of parts) {
      if (!/^[A-Z0-9]+$/.test(part)) {
        errors.push(`Invalid part: ${part} (must be alphanumeric)`);
      }
    }

    return {
      isValid: errors.length === 0,
      parts,
      errors,
    };
  },

  /**
   * Parse SKU
   * এসকেইউ পার্স করা
   */
  parse: (
    sku: string
  ): {
    prefix: string;
    category: string;
    product: string;
    variant: string;
    serial: string;
  } => {
    const parts = sku.split('-');

    return {
      prefix: parts[0] || '',
      category: parts[1] || '',
      product: parts[2] || '',
      variant: parts.slice(3, -1).join('-') || '',
      serial: parts[parts.length - 1] || '',
    };
  },

  /**
   * Generate multiple SKUs
   * একাধিক এসকেইউ তৈরি করা
   */
  generateMultiple: (baseSKU: string, count: number, variantPrefix: string = 'VAR'): string[] => {
    const skus: string[] = [];
    for (let i = 1; i <= count; i++) {
      const paddedNumber = String(i).padStart(3, '0');
      skus.push(`${baseSKU}-${variantPrefix}${paddedNumber}`);
    }
    return skus;
  },
};

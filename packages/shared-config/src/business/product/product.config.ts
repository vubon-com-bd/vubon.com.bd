/**
 * Product Config
 * প্রোডাক্ট কনফিগারেশন
 */

import { PRODUCT } from '@vubon/shared-constants';

export interface ProductConfig {
  enabled: boolean;
  types: Record<string, string>;
  status: Record<string, string>;
  visibility: Record<string, string>;
  condition: Record<string, string>;
  availability: Record<string, string>;
  approval: Record<string, string>;
  validation: {
    minPrice: number;
    maxPrice: number;
    maxStock: number;
    minStock: number;
    minNameLength: number;
    maxNameLength: number;
    minDescriptionLength: number;
    maxDescriptionLength: number;
    minSKULength: number;
    maxSKULength: number;
    allowNegativeStock: boolean;
  };
  image: {
    maxSize: number;
    allowedTypes: string[];
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    maxImages: number;
    allowedFormats: string[];
  };
  video: {
    maxSize: number;
    allowedTypes: string[];
    maxDuration: number;
    maxVideos: number;
    allowedFormats: string[];
  };
  variant: {
    maxVariants: number;
    minPrice: number;
    maxPrice: number;
    maxStock: number;
    maxAttributes: number;
    allowNegativeStock: boolean;
  };
  attribute: {
    maxOptions: number;
    maxNameLength: number;
    maxValueLength: number;
    allowedTypes: string[];
  };
  review: {
    minRating: number;
    maxRating: number;
    minContentLength: number;
    maxContentLength: number;
    maxImages: number;
    maxVideos: number;
    requireVerifiedPurchase: boolean;
    allowAnonymous: boolean;
  };
  inventory: {
    lowStockThreshold: number;
    criticalStockThreshold: number;
    defaultStock: number;
    maxStock: number;
    allowBackOrder: boolean;
    allowPreOrder: boolean;
  };
  pricing: {
    minPrice: number;
    maxPrice: number;
    defaultCurrency: string;
    supportedCurrencies: string[];
    defaultTaxRate: number;
    maxDiscountPercentage: number;
    minDiscountPercentage: number;
  };
  seo: {
    maxTitleLength: number;
    maxDescriptionLength: number;
    maxKeywords: number;
    minTitleLength: number;
    minDescriptionLength: number;
  };
  defaults: {
    minQuantity: number;
    maxQuantity: number;
    lowStockThreshold: number;
    maxDescriptionLength: number;
    maxNameLength: number;
    defaultWeight: number;
    defaultDimension: number;
  };
  sellerRoles: Record<string, string>;
  cache: {
    ttl: {
      product: number;
      category: number;
      brand: number;
      variant: number;
      review: number;
      inventory: number;
      price: number;
    };
    keyPrefix: string;
  };
  pagination: {
    defaultLimit: number;
    maxLimit: number;
    minLimit: number;
  };
  sort: {
    defaultField: string;
    defaultOrder: string;
    allowedFields: string[];
  };
  filter: {
    allowedFields: string[];
  };
  export: {
    allowedFormats: string[];
    maxRows: number;
  };
  import: {
    allowedFormats: string[];
    maxRows: number;
    maxFileSize: number;
  };
  bulk: {
    maxItems: number;
    allowedActions: string[];
  };
  analytics: {
    enabled: boolean;
    tracking: {
      view: boolean;
      addToCart: boolean;
      purchase: boolean;
      wishlist: boolean;
      share: boolean;
    };
  };
  notifications: {
    lowStock: boolean;
    outOfStock: boolean;
    priceChange: boolean;
    review: boolean;
    approval: boolean;
  };
}

export const productConfig: ProductConfig = {
  // Base configuration
  enabled: true,

  // Product types
  types: {
    physical: PRODUCT.TYPES.PHYSICAL,
    digital: PRODUCT.TYPES.DIGITAL,
    service: PRODUCT.TYPES.SERVICE,
    subscription: PRODUCT.TYPES.SUBSCRIPTION,
    downloadable: PRODUCT.TYPES.DOWNLOADABLE,
    virtual: PRODUCT.TYPES.VIRTUAL,
  },

  // Product status
  status: {
    draft: PRODUCT.STATUS.DRAFT,
    pending_approval: PRODUCT.STATUS.PENDING_APPROVAL,
    approved: PRODUCT.STATUS.APPROVED,
    published: PRODUCT.STATUS.PUBLISHED,
    out_of_stock: PRODUCT.STATUS.OUT_OF_STOCK,
    discontinued: PRODUCT.STATUS.DISCONTINUED,
    rejected: PRODUCT.STATUS.REJECTED,
    archived: PRODUCT.STATUS.ARCHIVED,
    active: PRODUCT.STATUS.ACTIVE,
    inactive: PRODUCT.STATUS.INACTIVE,
    deleted: PRODUCT.STATUS.DELETED,
  },

  // Product visibility
  visibility: {
    public: PRODUCT.VISIBILITY.PUBLIC,
    private: PRODUCT.VISIBILITY.PRIVATE,
    unlisted: PRODUCT.VISIBILITY.UNLISTED,
    members_only: PRODUCT.VISIBILITY.MEMBERS_ONLY,
    preview: PRODUCT.VISIBILITY.PREVIEW,
  },

  // Product conditions
  condition: {
    new: PRODUCT.CONDITION.NEW,
    used: PRODUCT.CONDITION.USED,
    refurbished: PRODUCT.CONDITION.REFURBISHED,
    open_box: PRODUCT.CONDITION.OPEN_BOX,
    rental: PRODUCT.CONDITION.RENTAL,
  },

  // Product availability
  availability: {
    in_stock: PRODUCT.AVAILABILITY.IN_STOCK,
    out_of_stock: PRODUCT.AVAILABILITY.OUT_OF_STOCK,
    pre_order: PRODUCT.AVAILABILITY.PRE_ORDER,
    back_order: PRODUCT.AVAILABILITY.BACK_ORDER,
    discontinued: PRODUCT.AVAILABILITY.DISCONTINUED,
  },

  // Product approval
  approval: {
    pending: PRODUCT.APPROVAL.PENDING,
    approved: PRODUCT.APPROVAL.APPROVED,
    rejected: PRODUCT.APPROVAL.REJECTED,
    needs_revision: PRODUCT.APPROVAL.NEEDS_REVISION,
    in_review: PRODUCT.APPROVAL.IN_REVIEW,
  },

  // Validation rules
  validation: {
    minPrice: 0,
    maxPrice: 1000000,
    maxStock: 99999,
    minStock: 0,
    minNameLength: 2,
    maxNameLength: 255,
    minDescriptionLength: 10,
    maxDescriptionLength: 5000,
    minSKULength: 3,
    maxSKULength: 100,
    allowNegativeStock: false,
  },

  // Image configuration
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    minWidth: 100,
    maxWidth: 4000,
    minHeight: 100,
    maxHeight: 4000,
    maxImages: 10,
    allowedFormats: ['jpeg', 'png', 'webp', 'gif'],
  },

  // Video configuration
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
    maxDuration: 300, // 5 minutes
    maxVideos: 5,
    allowedFormats: ['mp4', 'webm', 'ogg'],
  },

  // Variant configuration
  variant: {
    maxVariants: 100,
    minPrice: 0,
    maxPrice: 1000000,
    maxStock: 99999,
    maxAttributes: 5,
    allowNegativeStock: false,
  },

  // Attribute configuration
  attribute: {
    maxOptions: 50,
    maxNameLength: 100,
    maxValueLength: 255,
    allowedTypes: [
      'text',
      'number',
      'boolean',
      'date',
      'datetime',
      'select',
      'multiselect',
      'color',
      'size',
      'weight',
      'dimension',
      'file',
      'image',
      'url',
      'email',
      'phone',
    ],
  },

  // Review configuration
  review: {
    minRating: 1,
    maxRating: 5,
    minContentLength: 10,
    maxContentLength: 1000,
    maxImages: 5,
    maxVideos: 2,
    requireVerifiedPurchase: true,
    allowAnonymous: false,
  },

  // Inventory configuration
  inventory: {
    lowStockThreshold: 10,
    criticalStockThreshold: 5,
    defaultStock: 0,
    maxStock: 99999,
    allowBackOrder: true,
    allowPreOrder: true,
  },

  // Pricing configuration
  pricing: {
    minPrice: 0,
    maxPrice: 99999999,
    defaultCurrency: 'BDT',
    supportedCurrencies: ['BDT', 'USD', 'EUR', 'GBP', 'INR'],
    defaultTaxRate: 15,
    maxDiscountPercentage: 90,
    minDiscountPercentage: 1,
  },

  // SEO configuration
  seo: {
    maxTitleLength: 70,
    maxDescriptionLength: 160,
    maxKeywords: 10,
    minTitleLength: 30,
    minDescriptionLength: 50,
  },

  // Default values
  defaults: {
    minQuantity: PRODUCT.DEFAULTS.MIN_QUANTITY,
    maxQuantity: PRODUCT.DEFAULTS.MAX_QUANTITY,
    lowStockThreshold: PRODUCT.DEFAULTS.LOW_STOCK_THRESHOLD,
    maxDescriptionLength: PRODUCT.DEFAULTS.MAX_DESCRIPTION_LENGTH,
    maxNameLength: PRODUCT.DEFAULTS.MAX_NAME_LENGTH,
    defaultWeight: PRODUCT.DEFAULTS.DEFAULT_WEIGHT,
    defaultDimension: PRODUCT.DEFAULTS.DEFAULT_DIMENSION,
  },

  // Seller roles
  sellerRoles: {
    vendor: PRODUCT.SELLER_ROLES.VENDOR,
    merchant: PRODUCT.SELLER_ROLES.MERCHANT,
    supplier: PRODUCT.SELLER_ROLES.SUPPLIER,
    dropshipper: PRODUCT.SELLER_ROLES.DROPSHIPPER,
  },

  // Caching
  cache: {
    ttl: {
      product: 3600,
      category: 86400,
      brand: 86400,
      variant: 3600,
      review: 600,
      inventory: 300,
      price: 600,
    },
    keyPrefix: 'product:',
  },

  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
    minLimit: 1,
  },

  // Sorting
  sort: {
    defaultField: 'createdAt',
    defaultOrder: 'desc',
    allowedFields: [
      'name',
      'price',
      'rating',
      'soldCount',
      'viewCount',
      'createdAt',
      'updatedAt',
      'revenue',
      'stock',
      'reviewCount',
    ],
  },

  // Filtering
  filter: {
    allowedFields: [
      'categoryId',
      'brandId',
      'vendorId',
      'status',
      'type',
      'price',
      'stock',
      'isDigital',
      'isPhysical',
      'rating',
      'tags',
      'createdAt',
      'updatedAt',
    ],
  },

  // Export/Import
  export: {
    allowedFormats: ['csv', 'excel', 'json', 'pdf'],
    maxRows: 10000,
  },
  import: {
    allowedFormats: ['csv', 'excel', 'json'],
    maxRows: 1000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },

  // Bulk operations
  bulk: {
    maxItems: 100,
    allowedActions: ['delete', 'update', 'publish', 'unpublish', 'approve', 'reject'],
  },

  // Analytics
  analytics: {
    enabled: true,
    tracking: {
      view: true,
      addToCart: true,
      purchase: true,
      wishlist: true,
      share: true,
    },
  },

  // Notifications
  notifications: {
    lowStock: true,
    outOfStock: true,
    priceChange: true,
    review: true,
    approval: true,
  },
} as const;

export type ProductConfigType = typeof productConfig;

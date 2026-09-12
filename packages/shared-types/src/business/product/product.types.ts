import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { Vendor } from '../vendor/vendor.types';
import { Category } from './category.types';
import { Brand } from './brand.types';
import { Variant } from './variant.types';
import { Pricing } from './pricing.types';
import { Inventory } from './inventory.types';
import { Tag } from './tag.types';
import { Collection } from './collection.types';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isPrimary: boolean;
}

export interface ProductVideo {
  id: string;
  url: string;
  title: string;
  order: number;
}

export interface ProductDocument {
  id: string;
  url: string;
  name: string;
  type: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  type: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface ProductMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  weight?: number;
  dimensions?: ProductDimensions;
  material?: string;
  origin?: string;
  warranty?: string;
  returnPolicy?: string;
  shippingInfo?: string;
}

export interface Product extends BaseEntity {
  productId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  status: string;
  type: string;
  category: Category;
  categories: Category[];
  brand?: Brand;
  vendor: Vendor;
  vendorId: string;
  createdBy: User;
  updatedBy?: User;
  variants: Variant[];
  pricing: Pricing;
  inventory: Inventory;
  tags: Tag[];
  collections: Collection[];
  images: ProductImage[];
  videos: ProductVideo[];
  documents: ProductDocument[];
  attributes: ProductAttribute[];
  isActive: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  rating: number;
  reviewCount: number;
  metadata: ProductMetadata;
}

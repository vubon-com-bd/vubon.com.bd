import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { VendorSchema } from '../vendor/vendor.schema';
import { CategorySchema } from './category.schema';
import { BrandSchema } from './brand.schema';
import { VariantSchema } from './variant.schema';
import { PricingSchema } from './pricing.schema';
import { InventorySchema } from './inventory.schema';
import { TagSchema } from './tag.schema';
import { CollectionSchema } from './collection.schema';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';
import { PRODUCT_TYPES } from '@vubon/shared-constants/src/business/product/product-type.constants';

const productStatusKeys = Object.keys(PRODUCT_STATUS) as [string, ...string[]];
const productTypeKeys = Object.keys(PRODUCT_TYPES) as [string, ...string[]];

export const ProductSchema = BaseSchema.extend({
  productId: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10).max(5000),
  shortDescription: z.string().max(500).optional(),
  status: z.enum(productStatusKeys),
  type: z.enum(productTypeKeys),
  category: CategorySchema,
  categories: z.array(CategorySchema),
  brand: BrandSchema.optional(),
  vendor: VendorSchema,
  vendorId: z.string().uuid(),
  createdBy: UserSchema,
  updatedBy: UserSchema.optional(),
  variants: z.array(VariantSchema),
  pricing: PricingSchema,
  inventory: InventorySchema,
  tags: z.array(TagSchema),
  collections: z.array(CollectionSchema),
  images: z.array(
    z.object({
      id: z.string().uuid(),
      url: z.string().url(),
      alt: z.string().max(255),
      order: z.number().int().min(0),
      isPrimary: z.boolean().default(false),
    })
  ),
  videos: z.array(
    z.object({
      id: z.string().uuid(),
      url: z.string().url(),
      title: z.string().max(255),
      order: z.number().int().min(0),
    })
  ),
  documents: z.array(
    z.object({
      id: z.string().uuid(),
      url: z.string().url(),
      name: z.string().max(255),
      type: z.string(),
    })
  ),
  attributes: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      value: z.string(),
      type: z.string(),
    })
  ),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  viewCount: z.number().int().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      weight: z.number().positive().optional(),
      dimensions: z
        .object({
          length: z.number().positive(),
          width: z.number().positive(),
          height: z.number().positive(),
          unit: z.string(),
        })
        .optional(),
      material: z.string().optional(),
      origin: z.string().optional(),
      warranty: z.string().optional(),
      returnPolicy: z.string().optional(),
      shippingInfo: z.string().optional(),
    })
    .optional(),
});

export const ProductCreateSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  rating: true,
  reviewCount: true,
});

export const ProductUpdateSchema = ProductCreateSchema.partial();

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;

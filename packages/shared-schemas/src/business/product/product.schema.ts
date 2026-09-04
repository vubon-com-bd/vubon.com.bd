/**
 * Product Schema
 * প্রোডাক্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REGEX } from '@vubon/shared-constants';
import { PRODUCT_STATUS, PRODUCT_TYPES } from '@vubon/shared-constants';

const ProductImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string().optional(),
  isPrimary: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

const ProductVideoSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  title: z.string().optional(),
  thumbnail: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Variant name is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  comparePrice: z.number().min(0).optional(),
  sku: z.string().min(1, 'SKU is required').regex(REGEX.SLUG, 'Invalid SKU format'),
  stock: z.number().int().min(0).default(0),
  attributes: z.record(z.string()),
  images: z.array(ProductImageSchema).default([]),
});

const DimensionsSchema = z.object({
  length: z.number().min(0),
  width: z.number().min(0),
  height: z.number().min(0),
});

const SeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const ProductSchema = BaseSchema.extend({
  name: z.string().min(1, 'Product name is required').max(255),
  nameBangla: z.string().max(255).optional(),
  slug: z.string().regex(REGEX.SLUG, 'Invalid slug format'),
  description: z.string().min(1, 'Description is required').max(5000),
  descriptionBangla: z.string().max(5000).optional(),
  shortDescription: z.string().max(500).optional(),
  status: z.enum(Object.values(PRODUCT_STATUS) as [string, ...string[]]),
  type: z.enum(Object.values(PRODUCT_TYPES) as [string, ...string[]]),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().optional(),
  vendorId: z.string().uuid(),
  sku: z.string().min(1, 'SKU is required').max(100).regex(REGEX.SLUG, 'Invalid SKU format'),
  barcode: z.string().max(50).optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  comparePrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  taxRate: z.number().min(0).max(100).default(15),
  stock: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  weight: z.number().min(0).optional(),
  dimensions: DimensionsSchema.optional(),
  images: z.array(ProductImageSchema).default([]),
  videos: z.array(ProductVideoSchema).default([]),
  variants: z.array(ProductVariantSchema).default([]),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).default({}),
  isDigital: z.boolean().default(false),
  isDownloadable: z.boolean().default(false),
  downloadUrl: z.string().url().optional(),
  isPhysical: z.boolean().default(true),
  isVirtual: z.boolean().default(false),
  isSubscription: z.boolean().default(false),
  isService: z.boolean().default(false),
  isRental: z.boolean().default(false),
  rentalPrice: z.number().min(0).optional(),
  rentalDuration: z.number().int().min(1).optional(),
  subscriptionPrice: z.number().min(0).optional(),
  subscriptionDuration: z.number().int().min(1).optional(),
  seo: SeoSchema.optional(),
  tags: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  soldCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  wishlistCount: z.number().int().min(0).default(0),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductCreateSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  rating: true,
  reviewCount: true,
  soldCount: true,
  viewCount: true,
  wishlistCount: true,
});

export const ProductUpdateSchema = ProductCreateSchema.partial();

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;

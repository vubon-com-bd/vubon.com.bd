import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../product/product.schema';
import { FlashSaleScheduleSchema } from './flash-sale-schedule.schema';
import { FlashSaleParticipantSchema } from './flash-sale-participant.schema';
import { FlashSaleRuleSchema } from './flash-sale-rule.schema';
import { FlashSaleInventorySchema } from './flash-sale-inventory.schema';
import { FlashSalePriceSchema } from './flash-sale-price.schema';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-status.constants';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-type.constants';

const flashSaleStatusKeys = Object.keys(FLASH_SALE_STATUS) as [string, ...string[]];
const flashSaleTypeKeys = Object.keys(FLASH_SALE_TYPE) as [string, ...string[]];

export const FlashSaleSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(flashSaleStatusKeys),
  type: z.enum(flashSaleTypeKeys),
  products: z.array(ProductSchema),
  productCount: z.number().int().min(0).default(0),
  schedule: FlashSaleScheduleSchema,
  participants: z.array(FlashSaleParticipantSchema),
  participantCount: z.number().int().min(0).default(0),
  rules: z.array(FlashSaleRuleSchema),
  inventory: FlashSaleInventorySchema,
  pricing: FlashSalePriceSchema,
  discountPercentage: z.number().min(0).max(100),
  maxDiscountAmount: MoneySchema.optional(),
  minPurchaseAmount: MoneySchema.optional(),
  maxPurchaseAmount: MoneySchema.optional(),
  perUserLimit: z.number().int().min(1).default(1),
  totalLimit: z.number().int().min(1),
  soldCount: z.number().int().min(0).default(0),
  remainingCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      bannerImage: z.string().url().optional(),
      bannerVideo: z.string().url().optional(),
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      isPublic: z.boolean().default(true),
      viewCount: z.number().int().min(0).default(0),
      shareCount: z.number().int().min(0).default(0),
    })
    .optional(),
});

export const FlashSaleCreateSchema = FlashSaleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
  participantCount: true,
  soldCount: true,
  remainingCount: true,
});

export const FlashSaleUpdateSchema = FlashSaleCreateSchema.partial();

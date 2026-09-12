import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../product/product.schema';
import { DealDiscountTypeSchema } from './deal-discount-type.schema';
import { DealRuleSchema } from './deal-rule.schema';
import { DEAL_STATUS } from '@vubon/shared-constants/src/business/flash-sales/deal-status.constants';
import { DEAL } from '@vubon/shared-constants/src/business/flash-sales/deal.constants';

const dealStatusKeys = Object.keys(DEAL_STATUS) as [string, ...string[]];
const dealTypeKeys = Object.keys(DEAL.TYPES) as [string, ...string[]];

export const DealSchema = BaseSchema.extend({
  dealId: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(dealStatusKeys),
  type: z.enum(dealTypeKeys),
  products: z.array(ProductSchema),
  productCount: z.number().int().min(0).default(0),
  discountType: DealDiscountTypeSchema,
  discountValue: z.number().min(0),
  discountAmount: MoneySchema,
  minPurchaseAmount: MoneySchema.optional(),
  maxPurchaseAmount: MoneySchema.optional(),
  perUserLimit: z.number().int().min(1).default(1),
  totalLimit: z.number().int().min(1),
  usedCount: z.number().int().min(0).default(0),
  remainingCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  startsAt: z.date(),
  endsAt: z.date(),
  rules: z.array(DealRuleSchema),
  metadata: z.record(z.unknown()).optional(),
});

export const DealCreateSchema = DealSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
  usedCount: true,
  remainingCount: true,
});

export const DealUpdateSchema = DealCreateSchema.partial();

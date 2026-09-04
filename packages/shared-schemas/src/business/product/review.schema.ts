/**
 * Review Schema
 * রিভিউ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REVIEW_STATUS } from '@vubon/shared-constants';

const ReviewImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  sortOrder: z.number().int().min(0).default(0),
});

const ReviewVideoSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  thumbnail: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const ReviewSchema = BaseSchema.extend({
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  content: z.string().min(10, 'Review must be at least 10 characters').max(1000),
  contentBangla: z.string().max(1000).optional(),
  images: z.array(ReviewImageSchema).default([]),
  videos: z.array(ReviewVideoSchema).default([]),
  status: z.enum(Object.values(REVIEW_STATUS) as [string, ...string[]]),
  isVerifiedPurchase: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  helpfulCount: z.number().int().min(0).default(0),
  reportCount: z.number().int().min(0).default(0),
  parentId: z.string().uuid().optional(),
});

export const ReviewCreateSchema = ReviewSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  helpfulCount: true,
  reportCount: true,
});

export const ReviewUpdateSchema = ReviewCreateSchema.partial();

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewCreate = z.infer<typeof ReviewCreateSchema>;
export type ReviewUpdate = z.infer<typeof ReviewUpdateSchema>;

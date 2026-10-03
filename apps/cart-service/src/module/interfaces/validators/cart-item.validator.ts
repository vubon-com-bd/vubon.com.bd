import { z } from 'zod';

export const AddItemHttpSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  sku: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  imageUrl: z.string().url().optional(),
  unitPrice: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  quantity: z.number().int().min(1).max(999),
  currency: z.string().length(3),
  attributes: z.record(z.string(), z.string()).optional(),
}).strict();

export const UpdateQuantityHttpSchema = z.object({
  quantity: z.number().int().min(1).max(999),
  reason: z.string().max(500).optional(),
}).strict();

export class CartItemValidator {
  static validateAdd(input: unknown): void {
    AddItemHttpSchema.parse(input);
  }
  static validateQuantity(input: unknown): void {
    UpdateQuantityHttpSchema.parse(input);
  }
}

/**
 * CartValidator — Zod schema validation for cart DTOs
 * @module cart-service/interfaces/validators
 */
import { z } from 'zod';

export const CreateCartHttpSchema = z.object({
  type: z.enum(['guest', 'user', 'wishlist', 'saved', 'subscription']).optional(),
  sessionId: z.string().min(8).max(128).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(1000).optional(),
  expiresAt: z.string().datetime().optional(),
}).strict();

export const UpdateCartHttpSchema = z.object({
  notes: z.string().max(1000).optional(),
  currency: z.string().length(3).optional(),
  expiresAt: z.string().datetime().optional(),
  status: z.string().min(1).max(30).optional(),
}).strict();

export class CartValidator {
  static validateCreate(input: unknown): void {
    CreateCartHttpSchema.parse(input);
  }
  static validateUpdate(input: unknown): void {
    UpdateCartHttpSchema.parse(input);
  }
}

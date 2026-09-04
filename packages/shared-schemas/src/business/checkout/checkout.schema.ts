/**
 * Checkout Schema
 * চেকআউট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CHECKOUT_STATUS } from '@vubon/shared-constants';

const BillingAddressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().optional(),
  union: z.string().optional(),
  isDefault: z.boolean().default(false),
  addressType: z.enum(['shipping', 'billing', 'both']).default('both'),
  landmark: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isSameAsShipping: z.boolean().default(false),
  company: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),
});

const ShippingAddressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().optional(),
  union: z.string().optional(),
  isDefault: z.boolean().default(false),
  addressType: z.enum(['shipping', 'billing', 'both']).default('both'),
  landmark: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  deliveryInstructions: z.string().optional(),
  contactPhone: z.string().optional(),
  contactName: z.string().optional(),
});

const DeliveryMethodSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Delivery method name is required'),
  nameBangla: z.string().optional(),
  type: z.enum(['standard', 'express', 'same_day', 'next_day', 'scheduled', 'pickup']),
  carrier: z.string().min(1, 'Carrier is required'),
  carrierCode: z.string().optional(),
  cost: z.number().min(0, 'Cost must be greater than or equal to 0'),
  estimatedDays: z.number().int().min(0).default(3),
  estimatedDeliveryDate: z.date().optional(),
  trackingUrl: z.string().url().optional(),
  status: z.enum([
    'pending',
    'processing',
    'picked',
    'in_transit',
    'out_for_delivery',
    'attempted',
    'delivered',
    'failed',
    'returned',
    'cancelled',
    'rescheduled',
  ]),
});

const CheckoutStepSchema = z.object({
  id: z.string().uuid(),
  step: z.enum([
    'cart',
    'shipping',
    'payment',
    'review',
    'confirmation',
    'login',
    'billing',
    'shipping_method',
    'payment_method',
    'order_complete',
  ]),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed', 'skipped']),
  data: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])).optional(),
  error: z.string().optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
});

export const CheckoutSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  cartId: z.string().uuid(),
  status: z.enum(Object.values(CHECKOUT_STATUS) as [string, ...string[]]),
  steps: z.array(CheckoutStepSchema).default([]),
  currentStep: z.number().int().min(0).default(0),
  billingAddress: BillingAddressSchema.optional(),
  shippingAddress: ShippingAddressSchema.optional(),
  deliveryMethod: DeliveryMethodSchema.optional(),
  subtotal: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  shipping: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  currency: z.string().default('BDT'),
  note: z.string().optional(),
  sessionId: z.string().min(1, 'Session ID is required'),
  expiresAt: z.date(),
  completedAt: z.date().optional(),
  cancelledAt: z.date().optional(),
});

export const CheckoutCreateSchema = CheckoutSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  subtotal: true,
  discount: true,
  tax: true,
  shipping: true,
  total: true,
  currentStep: true,
  steps: true,
});

export const CheckoutUpdateSchema = CheckoutCreateSchema.partial();

export type Checkout = z.infer<typeof CheckoutSchema>;
export type CheckoutCreate = z.infer<typeof CheckoutCreateSchema>;
export type CheckoutUpdate = z.infer<typeof CheckoutUpdateSchema>;

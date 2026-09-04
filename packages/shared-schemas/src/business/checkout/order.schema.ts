/**
 * Order Schema
 * অর্ডার সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ORDER_STATUS } from '@vubon/shared-constants';

const OrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0),
  originalPrice: z.number().min(0),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  total: z.number().min(0),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  status: z.enum([
    'pending',
    'confirmed',
    'processed',
    'shipped',
    'delivered',
    'cancelled',
    'returned',
    'refunded',
  ]),
  returnRequested: z.boolean().default(false),
  returnStatus: z.enum(['pending', 'approved', 'rejected', 'processed', 'completed']).optional(),
});

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
  landmark: z.string().optional(),
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
  landmark: z.string().optional(),
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
  cost: z.number().min(0),
  estimatedDays: z.number().int().min(0).default(3),
  estimatedDeliveryDate: z.date().optional(),
  trackingUrl: z.string().url().optional(),
});

const OrderTrackingSchema = z.object({
  id: z.string().uuid(),
  status: z.string().min(1),
  description: z.string().min(1),
  descriptionBangla: z.string().optional(),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  carrier: z.string().optional(),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  estimatedDeliveryDate: z.date().optional(),
  actualDeliveryDate: z.date().optional(),
  note: z.string().optional(),
});

export const OrderSchema = BaseSchema.extend({
  orderNumber: z.string().min(1, 'Order number is required'),
  userId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  status: z.enum(Object.values(ORDER_STATUS) as [string, ...string[]]),
  items: z.array(OrderItemSchema).default([]),
  billingAddress: BillingAddressSchema,
  shippingAddress: ShippingAddressSchema,
  deliveryMethod: DeliveryMethodSchema,
  tracking: z.array(OrderTrackingSchema).default([]),
  subtotal: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  shipping: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  paidAmount: z.number().min(0).default(0),
  dueAmount: z.number().min(0).default(0),
  currency: z.string().default('BDT'),
  note: z.string().optional(),
  customerNote: z.string().optional(),
  adminNote: z.string().optional(),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded', 'partial_refunded']),
  paymentId: z.string().optional(),
  transactionId: z.string().optional(),
  placedAt: z.date(),
  confirmedAt: z.date().optional(),
  processedAt: z.date().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  cancelledAt: z.date().optional(),
  completedAt: z.date().optional(),
});

export const OrderCreateSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  orderNumber: true,
  paidAmount: true,
  dueAmount: true,
  tracking: true,
});

export const OrderUpdateSchema = OrderCreateSchema.partial();

export const OrderItemCreateSchema = OrderItemSchema.omit({
  id: true,
});

export const OrderItemUpdateSchema = OrderItemCreateSchema.partial();

export type Order = z.infer<typeof OrderSchema>;
export type OrderCreate = z.infer<typeof OrderCreateSchema>;
export type OrderUpdate = z.infer<typeof OrderUpdateSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>;
export type OrderItemUpdate = z.infer<typeof OrderItemUpdateSchema>;

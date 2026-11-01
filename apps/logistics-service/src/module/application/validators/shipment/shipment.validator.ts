/**
 * ShipmentValidator — Zod-based input validation
 * @module logistics-service/application/validators/shipment
 *
 * Uses Zod 3.x. Duck-types ZodError to avoid instance-mismatch.
 * Wraps all validation failures in ApplicationValidationError.
 */
import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

import type {
  CreateShipmentRequestDTO,
  UpdateShipmentRequestDTO,
  CancelShipmentRequestDTO,
  DeliverShipmentRequestDTO,
  FailShipmentRequestDTO,
  PickUpShipmentRequestDTO,
  AssignCourierRequestDTO,
  AssignWarehouseRequestDTO,
  PutOnHoldRequestDTO,
  MarkDelayedRequestDTO,
} from '@application/dtos/requests/shipment/index.js';

// ═══════════════════════════════════════
// ─── Zod Error Helpers ─────────────────
// ═══════════════════════════════════════
interface ZodIssueLike {
  readonly path: (string | number)[];
  readonly message: string;
}

function isZodError(e: unknown): e is { issues: ZodIssueLike[] } {
  if (!e || typeof e !== 'object') return false;
  const obj = e as Record<string, unknown>;
  return obj['name'] === 'ZodError' && Array.isArray(obj['issues']);
}

function toAppError(err: { issues: ZodIssueLike[] }, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

// ═══════════════════════════════════════
// ─── Zod Schemas ───────────────────────
// ═══════════════════════════════════════
const UuidSchema = z.string().uuid();
const CurrencySchema = z.string().min(3).max(5);
const PhoneLikeSchema = z.string().min(5).max(20);

const CreateItemSchema = z.object({
  sku: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  quantity: z.number().int().positive().max(999_999),
  unitPrice: z.number().nonnegative(),
  currency: CurrencySchema,
  weightKg: z.number().nonnegative().optional(),
  productId: UuidSchema.optional(),
  variantId: UuidSchema.optional(),
  imageUrl: z.string().url().optional(),
  notes: z.string().max(2000).optional(),
});

const CreateShipmentSchema = z.object({
  orderId: UuidSchema,
  userId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  courierId: UuidSchema.optional(),
  type: z.enum([
    'standard',
    'express',
    'same_day',
    'next_day',
    'overnight',
    'international',
    'freight',
    'bulk',
  ]),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  shippingAddress: z.string().min(5).max(500),
  pickupAddress: z.string().min(5).max(500).optional(),
  items: z.array(CreateItemSchema).min(1).max(100),
  totalWeightKg: z.number().nonnegative().optional(),
  totalVolumeM3: z.number().nonnegative().optional(),
  declaredValue: z.number().nonnegative().optional(),
  currency: CurrencySchema.optional(),
  shippingCost: z.number().nonnegative().optional(),
  codAmount: z.number().nonnegative().optional(),
  isCOD: z.boolean().optional(),
  isInsured: z.boolean().optional(),
  estimatedDeliveryAt: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const UpdateShipmentSchema = z.object({
  shipmentId: UuidSchema,
  shippingAddress: z.string().min(5).max(500).optional(),
  pickupAddress: z.string().min(5).max(500).optional(),
  notes: z.string().max(2000).optional(),
  estimatedDeliveryAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const CancelShipmentSchema = z.object({
  shipmentId: UuidSchema,
  reason: z.string().max(1000).optional(),
});

const DeliverShipmentSchema = z.object({
  shipmentId: UuidSchema,
  recipientName: z.string().min(1).max(255).optional(),
  signedBy: z.string().min(1).max(255).optional(),
  driverId: UuidSchema.optional(),
});

const FailShipmentSchema = z.object({
  shipmentId: UuidSchema,
  reason: z.string().min(1).max(1000),
  attemptedCount: z.number().int().positive().max(10).optional(),
});

const PickUpShipmentSchema = z.object({
  shipmentId: UuidSchema,
  courierId: z.string().min(1).max(100).optional(),
  driverId: UuidSchema.optional(),
});

const AssignCourierSchema = z.object({
  shipmentId: UuidSchema,
  courierId: z.string().min(1).max(100),
  courierTrackingNumber: z.string().min(1).max(200).optional(),
});

const AssignWarehouseSchema = z.object({
  shipmentId: UuidSchema,
  warehouseId: UuidSchema,
});

const PutOnHoldSchema = z.object({
  shipmentId: UuidSchema,
  reason: z.string().min(1).max(1000),
});

const MarkDelayedSchema = z.object({
  shipmentId: UuidSchema,
  reason: z.string().min(1).max(1000),
  newEstimatedDeliveryAt: z.string().datetime().optional(),
});

// ═══════════════════════════════════════
// ─── Public API ────────────────────────
// ═══════════════════════════════════════
export class ShipmentValidator {
  static validateCreate(input: unknown): CreateShipmentRequestDTO {
    try {
      return CreateShipmentSchema.parse(input) as CreateShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.create');
      throw e;
    }
  }

  static validateUpdate(input: unknown): UpdateShipmentRequestDTO {
    try {
      return UpdateShipmentSchema.parse(input) as UpdateShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.update');
      throw e;
    }
  }

  static validateCancel(input: unknown): CancelShipmentRequestDTO {
    try {
      return CancelShipmentSchema.parse(input) as CancelShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.cancel');
      throw e;
    }
  }

  static validateDeliver(input: unknown): DeliverShipmentRequestDTO {
    try {
      return DeliverShipmentSchema.parse(input) as DeliverShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.deliver');
      throw e;
    }
  }

  static validateFail(input: unknown): FailShipmentRequestDTO {
    try {
      return FailShipmentSchema.parse(input) as FailShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.fail');
      throw e;
    }
  }

  static validatePickUp(input: unknown): PickUpShipmentRequestDTO {
    try {
      return PickUpShipmentSchema.parse(input) as PickUpShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.pickUp');
      throw e;
    }
  }

  static validateAssignCourier(input: unknown): AssignCourierRequestDTO {
    try {
      return AssignCourierSchema.parse(input) as AssignCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.assignCourier');
      throw e;
    }
  }

  static validateAssignWarehouse(input: unknown): AssignWarehouseRequestDTO {
    try {
      return AssignWarehouseSchema.parse(input) as AssignWarehouseRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.assignWarehouse');
      throw e;
    }
  }

  static validatePutOnHold(input: unknown): PutOnHoldRequestDTO {
    try {
      return PutOnHoldSchema.parse(input) as PutOnHoldRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.putOnHold');
      throw e;
    }
  }

  static validateMarkDelayed(input: unknown): MarkDelayedRequestDTO {
    try {
      return MarkDelayedSchema.parse(input) as MarkDelayedRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Shipment.markDelayed');
      throw e;
    }
  }

  // ─── Safe parse variants (for tests) ───
  static safeParseCreate(input: unknown) {
    return CreateShipmentSchema.safeParse(input);
  }
}

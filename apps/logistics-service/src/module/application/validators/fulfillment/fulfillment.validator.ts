import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateFulfillmentRequestDTO,
  StartFulfillmentRequestDTO,
  BeginPickingRequestDTO,
  BeginPackingRequestDTO,
  MarkReadyToShipRequestDTO,
  ShipFulfillmentRequestDTO,
  FulfillRequestDTO,
  PartiallyFulfillRequestDTO,
  CancelFulfillmentRequestDTO,
  FailFulfillmentRequestDTO,
  PutFulfillmentOnHoldRequestDTO,
  ResumeFulfillmentFromHoldRequestDTO,
} from '@application/dtos/requests/fulfillment/index.js';

interface ZodIssueLike { readonly path: (string | number)[]; readonly message: string }
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
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

const UuidSchema = z.string().uuid();
const FType = z.enum(['standard', 'express', 'same_day', 'backorder', 'preorder', 'dropship', 'cross_dock']);
const FPriority = z.enum(['low', 'normal', 'high', 'urgent']);

const CreateSchema = z.object({
  orderId: UuidSchema,
  vendorId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  type: FType,
  priority: FPriority.optional(),
  itemIds: z.array(UuidSchema).min(1).max(100),
  assignedTo: UuidSchema.optional(),
  slaDueAt: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});
const IdOnlySchema = z.object({ fulfillmentId: UuidSchema });
const ShipSchema = z.object({
  fulfillmentId: UuidSchema,
  shipmentId: UuidSchema.optional(),
});
const PartialSchema = z.object({
  fulfillmentId: UuidSchema,
  fulfilledItemCount: z.number().int().positive(),
});
const CancelSchema = z.object({
  fulfillmentId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const FailSchema = z.object({
  fulfillmentId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const HoldSchema = z.object({
  fulfillmentId: UuidSchema,
  reason: z.string().min(1).max(1000),
});

export class FulfillmentValidator {
  static validateCreate(input: unknown): CreateFulfillmentRequestDTO {
    try { return CreateSchema.parse(input) as CreateFulfillmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.create'); throw e; }
  }
  static validateStart(input: unknown): StartFulfillmentRequestDTO {
    try { return IdOnlySchema.parse(input) as StartFulfillmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.start'); throw e; }
  }
  static validateBeginPicking(input: unknown): BeginPickingRequestDTO {
    try { return IdOnlySchema.parse(input) as BeginPickingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.beginPicking'); throw e; }
  }
  static validateBeginPacking(input: unknown): BeginPackingRequestDTO {
    try { return IdOnlySchema.parse(input) as BeginPackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.beginPacking'); throw e; }
  }
  static validateReadyToShip(input: unknown): MarkReadyToShipRequestDTO {
    try { return IdOnlySchema.parse(input) as MarkReadyToShipRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.markReadyToShip'); throw e; }
  }
  static validateShip(input: unknown): ShipFulfillmentRequestDTO {
    try { return ShipSchema.parse(input) as ShipFulfillmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.ship'); throw e; }
  }
  static validateFulfill(input: unknown): FulfillRequestDTO {
    try { return IdOnlySchema.parse(input) as FulfillRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.fulfill'); throw e; }
  }
  static validatePartiallyFulfill(input: unknown): PartiallyFulfillRequestDTO {
    try { return PartialSchema.parse(input) as PartiallyFulfillRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.partiallyFulfill'); throw e; }
  }
  static validateCancel(input: unknown): CancelFulfillmentRequestDTO {
    try { return CancelSchema.parse(input) as CancelFulfillmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.cancel'); throw e; }
  }
  static validateFail(input: unknown): FailFulfillmentRequestDTO {
    try { return FailSchema.parse(input) as FailFulfillmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.fail'); throw e; }
  }
  static validatePutOnHold(input: unknown): PutFulfillmentOnHoldRequestDTO {
    try { return HoldSchema.parse(input) as PutFulfillmentOnHoldRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.putOnHold'); throw e; }
  }
  static validateResumeFromHold(input: unknown): ResumeFulfillmentFromHoldRequestDTO {
    try { return IdOnlySchema.parse(input) as ResumeFulfillmentFromHoldRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Fulfillment.resumeFromHold'); throw e; }
  }
}

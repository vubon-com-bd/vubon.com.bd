import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateReturnShipmentRequestDTO,
  ReturnShipmentActionRequestDTO,
  ApproveReturnRequestDTO,
  RejectReturnRequestDTO,
  SchedulePickupRequestDTO,
  MarkReceivedRequestDTO,
  InspectReturnRequestDTO,
  CompleteReturnRequestDTO,
  CancelReturnRequestDTO,
} from '@application/dtos/requests/return-shipment/index.js';

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
const RSType = z.enum(['customer_return', 'rto', 'exchange', 'warranty', 'damaged', 'wrong_item', 'refused']);
const RSReason = z.enum(['defective', 'not_as_described', 'wrong_item', 'size_issue', 'changed_mind', 'damaged_in_transit', 'late_delivery', 'quality_issue', 'refused', 'other']);

const CreateSchema = z.object({
  orderId: UuidSchema,
  originalShipmentId: UuidSchema.optional(),
  userId: UuidSchema,
  type: RSType,
  reason: RSReason,
  description: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  itemIds: z.array(UuidSchema).min(1).max(100),
  pickupAddress: z.string().min(5).max(500),
  refundCurrency: z.string().min(3).max(5).optional(),
});
const IdOnlySchema = z.object({ returnId: UuidSchema });
const ApproveSchema = z.object({ returnId: UuidSchema, approvedBy: UuidSchema });
const RejectSchema = z.object({ returnId: UuidSchema, reason: z.string().min(1).max(1000) });
const ReceivedSchema = z.object({ returnId: UuidSchema, receivedBy: UuidSchema.optional() });
const InspectSchema = z.object({
  returnId: UuidSchema,
  restockable: z.boolean(),
  inspectedBy: UuidSchema.optional(),
});
const CompleteSchema = z.object({
  returnId: UuidSchema,
  refundAmount: z.number().nonnegative(),
  restockFeeAmount: z.number().nonnegative().optional(),
});
const CancelSchema = z.object({ returnId: UuidSchema, reason: z.string().max(1000).optional() });

export class ReturnShipmentValidator {
  static validateCreate(input: unknown): CreateReturnShipmentRequestDTO {
    try { return CreateSchema.parse(input) as CreateReturnShipmentRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.create'); throw e; }
  }
  static validateAction(input: unknown): ReturnShipmentActionRequestDTO {
    try { return IdOnlySchema.parse(input) as ReturnShipmentActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.action'); throw e; }
  }
  static validateApprove(input: unknown): ApproveReturnRequestDTO {
    try { return ApproveSchema.parse(input) as ApproveReturnRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.approve'); throw e; }
  }
  static validateReject(input: unknown): RejectReturnRequestDTO {
    try { return RejectSchema.parse(input) as RejectReturnRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.reject'); throw e; }
  }
  static validateMarkReceived(input: unknown): MarkReceivedRequestDTO {
    try { return ReceivedSchema.parse(input) as MarkReceivedRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.markReceived'); throw e; }
  }
  static validateInspect(input: unknown): InspectReturnRequestDTO {
    try { return InspectSchema.parse(input) as InspectReturnRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.inspect'); throw e; }
  }
  static validateComplete(input: unknown): CompleteReturnRequestDTO {
    try { return CompleteSchema.parse(input) as CompleteReturnRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.complete'); throw e; }
  }
  static validateCancel(input: unknown): CancelReturnRequestDTO {
    try { return CancelSchema.parse(input) as CancelReturnRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnShipment.cancel'); throw e; }
  }
}

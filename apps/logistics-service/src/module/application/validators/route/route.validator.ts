import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateRouteRequestDTO,
  UpdateRouteRequestDTO,
  RouteActionRequestDTO,
  OptimizeRouteRequestDTO,
  StartRouteRequestDTO,
  CompleteStopRequestDTO,
  CancelRouteRequestDTO,
} from '@application/dtos/requests/route/index.js';

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
const RType = z.enum(['delivery', 'pickup', 'mixed', 'return', 'transfer', 'line_haul', 'last_mile', 'first_mile']);
const ROpt = z.enum(['shortest_distance', 'fastest_time', 'lowest_cost', 'balanced', 'capacity_aware', 'time_window']);

const StopSchema = z.object({
  id: z.string().min(1).max(100),
  order: z.number().int().positive(),
  location: z.string().min(1).max(255),
  address: z.string().min(5).max(500),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  shipmentIds: z.array(UuidSchema).min(1),
  estimatedArrivalAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

const CreateSchema = z.object({
  name: z.string().min(3).max(150),
  code: z.string().min(3).max(50),
  type: RType,
  optimization: ROpt,
  stops: z.array(StopSchema).min(1).max(200),
  warehouseId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  scheduledDate: z.string().datetime(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().max(200).optional(),
});
const UpdateSchema = z.object({
  routeId: UuidSchema,
  name: z.string().min(3).max(150).optional(),
  optimization: ROpt.optional(),
  scheduledDate: z.string().datetime().optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
});
const IdOnlySchema = z.object({ routeId: UuidSchema });
const OptimizeSchema = z.object({
  routeId: UuidSchema,
  newDistanceKm: z.number().nonnegative().optional(),
  newDurationMinutes: z.number().nonnegative().optional(),
});
const StartSchema = z.object({
  routeId: UuidSchema,
  driverId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
});
const StopCompleteSchema = z.object({
  routeId: UuidSchema,
  stopId: z.string().min(1).max(100),
});
const CancelSchema = z.object({
  routeId: UuidSchema,
  reason: z.string().max(1000).optional(),
});

export class RouteValidator {
  static validateCreate(input: unknown): CreateRouteRequestDTO {
    try { return CreateSchema.parse(input) as CreateRouteRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateRouteRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateRouteRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.update'); throw e; }
  }
  static validateAction(input: unknown): RouteActionRequestDTO {
    try { return IdOnlySchema.parse(input) as RouteActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.action'); throw e; }
  }
  static validateOptimize(input: unknown): OptimizeRouteRequestDTO {
    try { return OptimizeSchema.parse(input) as OptimizeRouteRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.optimize'); throw e; }
  }
  static validateStart(input: unknown): StartRouteRequestDTO {
    try { return StartSchema.parse(input) as StartRouteRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.start'); throw e; }
  }
  static validateCompleteStop(input: unknown): CompleteStopRequestDTO {
    try { return StopCompleteSchema.parse(input) as CompleteStopRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.completeStop'); throw e; }
  }
  static validateCancel(input: unknown): CancelRouteRequestDTO {
    try { return CancelSchema.parse(input) as CancelRouteRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Route.cancel'); throw e; }
  }
}

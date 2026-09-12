import { z } from 'zod';
import { ID_CONST } from '@vubon/shared-constants/src/common/id.constants';

/**
 * A single ID value — accepts UUID string or positive integer.
 */
export const IDValueSchema = z.union([
  z.string().uuid(),
  z.number().int().min(ID_CONST.NUMBER.MIN).max(ID_CONST.NUMBER.MAX),
]);

/**
 * Object wrapper: { id: ... }
 */
export const IDObjectSchema = z.object({
  id: IDValueSchema,
});

/**
 * Path param: { id: uuid } (strict UUID for URL routes).
 */
export const IDParamSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Bulk IDs: { ids: uuid[] } with size limits.
 */
export const IDsSchema = z.object({
  ids: z.array(z.string().uuid()).min(ID_CONST.LIST.MIN_ITEMS).max(ID_CONST.LIST.MAX_ITEMS),
});

/** @deprecated Use IDObjectSchema instead. */
export const IDSchema = IDObjectSchema;

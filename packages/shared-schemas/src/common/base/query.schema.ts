/**
 * Base Query Schema
 * @module shared-schemas/common/base
 *
 * ⚠️ Note: sort/search/pagination/date-range সব query/-এ আছে।
 * এখানে শুধু base pagination + sort একসাথে composite।
 */

import { z } from 'zod';
import { PaginationQuerySchema } from './pagination.schema';

export const BaseQuerySchema = PaginationQuerySchema;

export type BaseQuerySchemaType = z.infer<typeof BaseQuerySchema>;

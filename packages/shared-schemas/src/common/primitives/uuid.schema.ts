/**
 * UUID Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants/common';

export const UuidSchema = z.string().regex(REGEX.UUID, 'Invalid UUID format');

export const OptionalUuidSchema = UuidSchema.optional();

export type UuidSchemaType = z.infer<typeof UuidSchema>;

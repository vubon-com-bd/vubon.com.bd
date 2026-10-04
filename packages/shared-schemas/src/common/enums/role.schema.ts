/**
 * Role Schema
 * @module shared-schemas/common/enums
 */

import { z } from 'zod';
import { ROLE } from '@vubon/shared-constants/common';

export const RoleSchema = z.enum(Object.values(ROLE) as [string, ...string[]]);

export type RoleSchemaType = z.infer<typeof RoleSchema>;

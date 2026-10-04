/**
 * Permission Schema
 * @module shared-schemas/common/enums
 */

import { z } from 'zod';
import { PERMISSION } from '@vubon/shared-constants/common';

export const PermissionSchema = z.enum(Object.values(PERMISSION) as [string, ...string[]]);

export type PermissionSchemaType = z.infer<typeof PermissionSchema>;

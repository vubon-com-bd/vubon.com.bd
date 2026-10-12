/**
 * Courier application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { CourierListFilterSchema } from '@vubon/shared-schemas/logistics';

export const CourierListFilterValidator = CourierListFilterSchema;
export type CourierListFilterValidated = z.infer<typeof CourierListFilterValidator>;

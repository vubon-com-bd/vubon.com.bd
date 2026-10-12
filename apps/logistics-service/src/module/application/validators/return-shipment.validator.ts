/**
 * ReturnShipment application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import {
  ReturnShipmentCreateInputSchema,
  ReturnShipmentSchema,
} from '@vubon/shared-schemas/logistics';

export const ReturnShipmentRequestValidator = ReturnShipmentCreateInputSchema;
export const ReturnShipmentValidator = ReturnShipmentSchema;
export type ReturnShipmentRequestValidated = z.infer<typeof ReturnShipmentRequestValidator>;

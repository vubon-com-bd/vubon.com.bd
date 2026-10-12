/**
 * Shipment application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { ShipmentCreateInputSchema, ShipmentListFilterSchema } from '@vubon/shared-schemas/logistics';

export const ShipmentCreateValidator = ShipmentCreateInputSchema;
export const ShipmentListFilterValidator = ShipmentListFilterSchema;

export type ShipmentCreateValidated = z.infer<typeof ShipmentCreateValidator>;
export type ShipmentListFilterValidated = z.infer<typeof ShipmentListFilterValidator>;

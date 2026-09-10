import { z } from 'zod';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/src/logistics/shipment-type.constants';

const shipmentTypeKeys = Object.keys(SHIPMENT_TYPE) as [string, ...string[]];

export const ShipmentTypeSchema = z.object({
  type: z.enum(shipmentTypeKeys),
  category: z.literal('shipment'),
  isAir: z.boolean().default(false),
  isOcean: z.boolean().default(false),
  isLand: z.boolean().default(false),
  isRail: z.boolean().default(false),
  isCourier: z.boolean().default(false),
  isPostal: z.boolean().default(false),
  isFreight: z.boolean().default(false),
  isExpress: z.boolean().default(false),
  isStandard: z.boolean().default(false),
  isInternational: z.boolean().default(false),
  isDomestic: z.boolean().default(false),
});

export const ShipmentTypeEnumSchema = z.enum(shipmentTypeKeys);

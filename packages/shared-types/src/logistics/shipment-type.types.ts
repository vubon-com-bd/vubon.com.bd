import { TypeObject } from '../common/types.types';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/src/logistics/shipment-type.constants';

export interface ShipmentType extends TypeObject {
  type: keyof typeof SHIPMENT_TYPE | string;
  category: 'shipment';
  isAir: boolean;
  isOcean: boolean;
  isLand: boolean;
  isRail: boolean;
  isCourier: boolean;
  isPostal: boolean;
  isFreight: boolean;
  isExpress: boolean;
  isStandard: boolean;
  isInternational: boolean;
  isDomestic: boolean;
}

export type ShipmentTypeKey = keyof typeof SHIPMENT_TYPE;

import { TypeObject } from '../common/types.types';
import { DELIVERY_TYPE } from '@vubon/shared-constants/src/logistics/delivery-type.constants';

export interface DeliveryType extends TypeObject {
  type: keyof typeof DELIVERY_TYPE | string;
  category: 'delivery';
  isStandard: boolean;
  isExpress: boolean;
  isSameDay: boolean;
  isNextDay: boolean;
  isScheduled: boolean;
  isInstant: boolean;
  isEconomy: boolean;
  isPriority: boolean;
}

export type DeliveryTypeKey = keyof typeof DELIVERY_TYPE;

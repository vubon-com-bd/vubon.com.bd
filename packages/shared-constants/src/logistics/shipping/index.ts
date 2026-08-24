/**
 * Shipping Constants Index
 * Export all shipping constants and types for easy importing
 */

// Shipping Method Constants
export {
  LOGISTICS_SHIPPING_METHOD,
  logisticsShippingMethodGetLabel,
  logisticsShippingMethodGetTypeLabel,
  logisticsShippingMethodGetStatusLabel,
  logisticsShippingMethodGetDeliveryTime,
  logisticsShippingMethodGetPriceMultiplier,
  logisticsShippingMethodIsActive,
  logisticsShippingMethodIsAvailable,
  logisticsShippingMethodGetLimits,
} from './shipping-method.constants';

export type {
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
} from './shipping-method.constants';

// Shipping Method Type Constants
export {
  LOGISTICS_SHIPPING_METHOD_TYPE,
  logisticsShippingMethodTypeGetLabel,
  logisticsShippingMethodTypeGetIcon,
  logisticsShippingMethodTypeGetColor,
  logisticsShippingMethodTypeGetServiceLevel,
  logisticsShippingMethodTypeHasTracking,
  logisticsShippingMethodTypeHasInsurance,
} from './shipping-method-type.constants';

export type {
  LogisticsShippingMethodTypeCategory,
  LogisticsShippingMethodTypeIcon,
  LogisticsShippingMethodTypeColor,
} from './shipping-method-type.constants';

// Shipping Rate Constants
export {
  LOGISTICS_SHIPPING_RATE,
  logisticsShippingRateGetTypeLabel,
  logisticsShippingRateGetStatusLabel,
  logisticsShippingRateGetZoneLabel,
  logisticsShippingRateGetBaseRate,
  logisticsShippingRateGetWeightRate,
  logisticsShippingRateIsActive,
  logisticsShippingRateCalculate,
} from './shipping-rate.constants';

export type {
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  LogisticsShippingRateCalculation,
} from './shipping-rate.constants';

// Shipping Rate Type Constants
export {
  LOGISTICS_SHIPPING_RATE_TYPE,
  logisticsShippingRateTypeGetLabel,
  logisticsShippingRateTypeGetIcon,
  logisticsShippingRateTypeGetColor,
  logisticsShippingRateTypeGetComplexity,
  logisticsShippingRateTypeGetAccuracy,
} from './shipping-rate-type.constants';

export type {
  LogisticsShippingRateTypeCategory,
  LogisticsShippingRateTypeIcon,
  LogisticsShippingRateTypeColor,
} from './shipping-rate-type.constants';

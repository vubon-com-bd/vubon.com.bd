/**
 * Insurance Constants Index
 * Export all insurance constants and types for easy importing
 */

// Insurance Constants
export {
  LOGISTICS_INSURANCE,
  logisticsInsuranceGetTypeLabel,
  logisticsInsuranceGetStatusLabel,
  logisticsInsuranceGetProviderLabel,
  logisticsInsuranceGetCoverageRate,
  logisticsInsuranceGetCoverageLabel,
  logisticsInsuranceGetClaimLimit,
  logisticsInsuranceGetExcess,
  logisticsInsuranceIsActive,
  logisticsInsuranceIsActiveOrPending,
  logisticsInsuranceCalculatePremium,
} from './insurance.constants';

export type {
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
} from './insurance.constants';

// Insurance Type Constants
export {
  LOGISTICS_INSURANCE_TYPE,
  logisticsInsuranceTypeGetCategory,
  logisticsInsuranceTypeGetIcon,
  logisticsInsuranceTypeGetColor,
  logisticsInsuranceTypeGetRiskLevel,
  logisticsInsuranceTypeGetPolicyType,
  logisticsInsuranceTypeGetDocuments,
} from './insurance-type.constants';

export type {
  LogisticsInsuranceTypeCategory,
  LogisticsInsuranceTypeIcon,
  LogisticsInsuranceTypeColor,
  LogisticsInsurancePolicyType,
} from './insurance-type.constants';

// Insurance Status Constants
export {
  LOGISTICS_INSURANCE_STATUS,
  logisticsInsuranceStatusGetLabel,
  logisticsInsuranceStatusGetCategory,
  logisticsInsuranceStatusIsActive,
  logisticsInsuranceStatusIsActiveOrPending,
  logisticsInsuranceStatusCanTransition,
} from './insurance-status.constants';

export type {
  LogisticsInsuranceStatusType,
  LogisticsInsuranceStatusCategory,
  LogisticsInsuranceStatusColor,
  LogisticsInsuranceStatusIcon,
  LogisticsInsuranceStatusTransition,
} from './insurance-status.constants';

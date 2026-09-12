import { TypeObject } from '../common/types.types';
import { RETURN_REASON } from '@vubon/shared-constants/src/logistics/return-reason.constants';

export interface ReturnReason extends TypeObject {
  type: keyof typeof RETURN_REASON.TYPES | string;
  category: keyof typeof RETURN_REASON.REASON_CATEGORIES | string;
  priority: keyof typeof RETURN_REASON.REASON_PRIORITY | string;
  isDefective: boolean;
  isDamaged: boolean;
  isWrongItem: boolean;
  isMissingParts: boolean;
  isNotAsDescribed: boolean;
  isSizeIssue: boolean;
  isColorIssue: boolean;
  isQualityIssue: boolean;
  isDeliveryIssue: boolean;
  isCustomerRequest: boolean;
  isOther: boolean;
}

export type ReturnReasonKey = keyof typeof RETURN_REASON.TYPES;

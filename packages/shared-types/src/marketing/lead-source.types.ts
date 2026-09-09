import { TypeObject } from '../common/types.types';
import { LEAD_SOURCE } from '@vubon/shared-constants/src/marketing/lead-source.constants';

export interface LeadSource extends TypeObject {
  type: keyof typeof LEAD_SOURCE.TYPES | string;
  category: 'lead_source';
  isWebsite: boolean;
  isSocialMedia: boolean;
  isEmail: boolean;
  isReferral: boolean;
  isOrganic: boolean;
  isPaid: boolean;
  isDirect: boolean;
  isEvent: boolean;
  isPartner: boolean;
  isOther: boolean;
}

export type LeadSourceKey = keyof typeof LEAD_SOURCE.TYPES;

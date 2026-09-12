import { StatusObject } from '../common/status.types';
import { LEAD_STATUS } from '@vubon/shared-constants/src/marketing/lead-status.constants';

export interface LeadStatus extends StatusObject {
  type: keyof typeof LEAD_STATUS | string;
  category: 'lead';
  isNew: boolean;
  isContacted: boolean;
  isQualified: boolean;
  isUnqualified: boolean;
  isConverted: boolean;
  isLost: boolean;
}

export type LeadStatusKey = keyof typeof LEAD_STATUS;

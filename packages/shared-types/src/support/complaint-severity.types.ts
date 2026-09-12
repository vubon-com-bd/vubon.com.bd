import { TypeObject } from '../common/types.types';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/src/support/complaint-severity.constants';

export interface ComplaintSeverity extends TypeObject {
  type: keyof typeof COMPLAINT_SEVERITY.TYPES | string;
  category: 'complaint_severity';
  level: keyof typeof COMPLAINT_SEVERITY.SEVERITY_LEVELS | string;
  responseTimeHours: number;
  isLow: boolean;
  isMedium: boolean;
  isHigh: boolean;
  isCritical: boolean;
}

export type ComplaintSeverityKey = keyof typeof COMPLAINT_SEVERITY.TYPES;

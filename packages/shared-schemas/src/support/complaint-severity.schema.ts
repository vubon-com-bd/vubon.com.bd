import { z } from 'zod';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/src/support/complaint-severity.constants';

const complaintSeverityTypeKeys = Object.keys(COMPLAINT_SEVERITY.TYPES) as [string, ...string[]];
const complaintSeverityLevelKeys = Object.keys(COMPLAINT_SEVERITY.SEVERITY_LEVELS) as [
  string,
  ...string[],
];

export const ComplaintSeveritySchema = z.object({
  severity: z.enum(complaintSeverityTypeKeys),
  category: z.literal('complaint_severity'),
  level: z.enum(complaintSeverityLevelKeys),
  responseTimeHours: z.number().int().min(1),
  isLow: z.boolean().default(false),
  isMedium: z.boolean().default(false),
  isHigh: z.boolean().default(false),
  isCritical: z.boolean().default(false),
});

export const ComplaintSeverityEnumSchema = z.enum(complaintSeverityTypeKeys);

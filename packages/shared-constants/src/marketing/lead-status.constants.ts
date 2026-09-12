import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const LEAD_STATUS = {
  ...COMMON_STATUS,
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  UNQUALIFIED: 'unqualified',
  CONVERTED: 'converted',
  LOST: 'lost',
} as const;

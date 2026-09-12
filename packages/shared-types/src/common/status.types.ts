import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Status value type — actual string values (e.g. 'active', 'pending')
 */
export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

/**
 * Status object interface
 */
export interface StatusObject {
  type: string;
  value: StatusValue;
  label: string;
  color?: string;
}

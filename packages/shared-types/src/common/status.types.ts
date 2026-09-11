import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Status type — derived from STATUS constant
 */
export type Status = keyof typeof STATUS;

/**
 * Status value type — actual string values
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

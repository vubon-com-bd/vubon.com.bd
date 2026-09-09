import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Status type
 */
export type Status = keyof typeof STATUS | string;

/**
 * Status value type
 */
export type StatusValue = (typeof STATUS)[keyof typeof STATUS] | string;

/**
 * Status object interface
 */
export interface StatusObject {
  type: string;
  value: string;
  label: string;
  color?: string;
}

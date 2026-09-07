import { STATUS } from '@vubon/shared-constants';

export type Status = keyof typeof STATUS;
export type StatusValue = (typeof STATUS)[Status];

export interface StatusObject {
  type: Status;
  value: StatusValue;
  label: string;
  color?: string;
}

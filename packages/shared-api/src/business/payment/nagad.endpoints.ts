/**
 * Nagad Endpoints
 * Nagad পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { NAGAD } from '@vubon/shared-constants';

export const nagadEndpoints = {
  init: `${baseEndpoints.api}/payment/nagad/init`,
  verify: `${baseEndpoints.api}/payment/nagad/verify`,
  callback: `${baseEndpoints.api}/payment/nagad/callback`,
  success: `${baseEndpoints.api}/payment/nagad/success`,
  cancel: `${baseEndpoints.api}/payment/nagad/cancel`,
  refund: `${baseEndpoints.api}/payment/nagad/refund`,
} as const;

// NAGAD ব্যবহার
export const getNagadStatuses = () => {
  return Object.values(NAGAD);
};

export type NagadEndpointKey = keyof typeof nagadEndpoints;

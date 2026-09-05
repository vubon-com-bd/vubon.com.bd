/**
 * Rocket Endpoints
 * Rocket পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { ROCKET } from '@vubon/shared-constants';

export const rocketEndpoints = {
  init: `${baseEndpoints.api}/payment/rocket/init`,
  verify: `${baseEndpoints.api}/payment/rocket/verify`,
  success: `${baseEndpoints.api}/payment/rocket/success`,
  cancel: `${baseEndpoints.api}/payment/rocket/cancel`,
  refund: `${baseEndpoints.api}/payment/rocket/refund`,
} as const;

// ROCKET ব্যবহার
export const getRocketStatuses = () => {
  return Object.values(ROCKET);
};

export type RocketEndpointKey = keyof typeof rocketEndpoints;

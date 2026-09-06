/**
 * Deal Rule Endpoints
 * ডিল রুল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { DEAL } from '@vubon/shared-constants';
import type { DealRule } from '@vubon/shared-types';

export const dealRuleEndpoints = {
  list: (dealId: string) => `/deals/${dealId}/rules`,
  create: (dealId: string) => `/deals/${dealId}/rules`,
  update: (id: string) => `/deals/rules/${id}`,
  delete: (id: string) => `/deals/rules/${id}`,
  get: (id: string) => `/deals/rules/${id}`,
  apply: (id: string) => `/deals/rules/${id}/apply`,
} as const;

export type DealRuleEndpointKey = keyof typeof dealRuleEndpoints;

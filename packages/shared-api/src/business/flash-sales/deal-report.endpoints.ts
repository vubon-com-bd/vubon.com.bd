/**
 * Deal Report Endpoints
 * ডিল রিপোর্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { DEAL } from '@vubon/shared-constants';
import type { DealReport } from '@vubon/shared-types';

export const dealReportEndpoints = {
  generate: (dealId: string) => `/deals/${dealId}/report`,
  list: '/deals/reports',
  download: (id: string) => `/deals/reports/${id}/download`,
  preview: (id: string) => `/deals/reports/${id}/preview`,
} as const;

export type DealReportEndpointKey = keyof typeof dealReportEndpoints;

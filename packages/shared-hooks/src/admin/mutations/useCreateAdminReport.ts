/**
 * useCreateAdminReport Hook
 * অ্যাডমিন রিপোর্ট তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminReportEndpoints } from '@vubon/shared-api';
import { AdminReportCreateInput } from '@vubon/shared-types';

export const useCreateAdminReport = (reportEndpoints: AdminReportEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminReportCreateInput) => reportEndpoints.createReport(data),
  });
};

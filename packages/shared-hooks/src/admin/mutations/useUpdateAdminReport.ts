/**
 * useUpdateAdminReport Hook
 * অ্যাডমিন রিপোর্ট আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminReportEndpoints } from '@vubon/shared-api';
import { AdminReportUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminReport = (reportEndpoints: AdminReportEndpoints) => {
  return useMutation({
    mutationFn: ({ reportId, data }: { reportId: string; data: AdminReportUpdateInput }) =>
      reportEndpoints.updateReport(reportId, data),
  });
};

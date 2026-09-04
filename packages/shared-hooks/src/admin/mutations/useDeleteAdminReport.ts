/**
 * useDeleteAdminReport Hook
 * অ্যাডমিন রিপোর্ট ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminReportEndpoints } from '@vubon/shared-api';

export const useDeleteAdminReport = (reportEndpoints: AdminReportEndpoints) => {
  return useMutation({
    mutationFn: (reportId: string) => reportEndpoints.deleteReport(reportId),
  });
};

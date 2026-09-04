/**
 * AdminReportList Component
 * অ্যাডমিন রিপোর্ট লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminReport } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';

export interface AdminReportListProps {
  reports: AdminReport[];
  onGenerate?: (reportId: string) => void;
  onDownload?: (reportId: string) => void;
  onDelete?: (reportId: string) => void;
  className?: string;
}

export const AdminReportList: React.FC<AdminReportListProps> = ({
  reports,
  onGenerate,
  onDownload,
  onDelete,
  className = '',
}) => {
  if (reports.length === 0) {
    return <p className="text-gray-500">No reports found.</p>;
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {reports.map((report) => (
        <Card key={report.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{report.name}</h4>
              <p className="text-sm text-gray-500">
                Type: {report.type} • Format: {report.format}
              </p>
              <p className="text-xs text-gray-400">
                Created: {new Date(report.createdAt).toLocaleString()}
              </p>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[report.status] || 'bg-gray-100 text-gray-600'}`}
              >
                {report.status}
              </span>
            </div>
            <div className="flex space-x-2">
              {report.status === 'pending' && onGenerate && (
                <Button variant="outline" size="sm" onClick={() => onGenerate(report.id)}>
                  Generate
                </Button>
              )}
              {report.status === 'completed' && onDownload && report.downloadUrl && (
                <Button variant="outline" size="sm" onClick={() => onDownload(report.id)}>
                  Download
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(report.id)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

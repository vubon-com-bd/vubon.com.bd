/**
 * AdminAuditList Component
 * অ্যাডমিন অডিট লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminAudit } from '@vubon/shared-types';
import { ADMIN_AUDIT } from '@vubon/shared-constants';

export interface AdminAuditListProps {
  audits: AdminAudit[];
  onRowClick?: (audit: AdminAudit) => void;
  className?: string;
  maxItems?: number;
}

export const AdminAuditList: React.FC<AdminAuditListProps> = ({
  audits,
  onRowClick,
  className = '',
  maxItems = 10,
}) => {
  const displayAudits = audits.slice(0, maxItems);

  if (displayAudits.length === 0) {
    return <p className="text-gray-500">No audit logs found.</p>;
  }

  const statusColors: Record<string, string> = {
    [ADMIN_AUDIT.STATUS.SUCCESS]: 'text-green-600',
    [ADMIN_AUDIT.STATUS.FAILED]: 'text-red-600',
    [ADMIN_AUDIT.STATUS.PENDING]: 'text-yellow-600',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {displayAudits.map((audit) => (
        <div
          key={audit.id}
          className={`rounded-lg border border-gray-100 p-3 ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          onClick={() => onRowClick?.(audit)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {audit.action.charAt(0).toUpperCase() + audit.action.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{audit.resource}</span>
                <span className={`text-xs font-medium ${statusColors[audit.status] || 'text-gray-500'}`}>
                  {audit.status.toUpperCase()}
                </span>
              </div>
              {audit.details && (
                <p className="text-sm text-gray-600">
                  {JSON.stringify(audit.details).slice(0, 100)}
                </p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(audit.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
      {audits.length > maxItems && (
        <p className="text-sm text-gray-500">
          Showing {maxItems} of {audits.length} audit logs
        </p>
      )}
    </div>
  );
};

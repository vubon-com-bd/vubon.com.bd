/**
 * AdminAuditDetail Component
 * অ্যাডমিন অডিট ডিটেইল কম্পোনেন্ট
 */

import React from 'react';
import { AdminAudit } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';

export interface AdminAuditDetailProps {
  audit: AdminAudit;
  className?: string;
}

export const AdminAuditDetail: React.FC<AdminAuditDetailProps> = ({
  audit,
  className = '',
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Audit Details</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-500">ID</span>
          <span className="text-sm text-gray-900">{audit.id}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-500">Action</span>
          <span className="text-sm text-gray-900">{audit.action}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-500">Resource</span>
          <span className="text-sm text-gray-900">{audit.resource}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-500">Status</span>
          <span className="text-sm text-gray-900">{audit.status}</span>
        </div>
        {audit.resourceId && (
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Resource ID</span>
            <span className="text-sm text-gray-900">{audit.resourceId}</span>
          </div>
        )}
        {audit.ipAddress && (
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">IP Address</span>
            <span className="text-sm text-gray-900">{audit.ipAddress}</span>
          </div>
        )}
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-500">Timestamp</span>
          <span className="text-sm text-gray-900">
            {new Date(audit.timestamp).toLocaleString()}
          </span>
        </div>
        {audit.details && (
          <div className="border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Details</span>
            <pre className="mt-1 text-sm text-gray-600">
              {JSON.stringify(audit.details, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};

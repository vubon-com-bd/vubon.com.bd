/**
 * AdminVerificationStatus Component
 * অ্যাডমিন ভেরিফিকেশন স্ট্যাটাস কম্পোনেন্ট
 */

import React from 'react';
import { AdminVerification } from '@vubon/shared-types';
import { ADMIN_VERIFICATION } from '@vubon/shared-constants';
import { Badge } from '../../common/components/Badge';
import { Card } from '../../common/components/Card';

export interface AdminVerificationStatusProps {
  verifications: AdminVerification[];
  className?: string;
}

export const AdminVerificationStatus: React.FC<AdminVerificationStatusProps> = ({
  verifications,
  className = '',
}) => {
  const statusColors: Record<string, string> = {
    [ADMIN_VERIFICATION.STATUS.VERIFIED]: 'bg-green-100 text-green-800',
    [ADMIN_VERIFICATION.STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ADMIN_VERIFICATION.STATUS.REJECTED]: 'bg-red-100 text-red-800',
    [ADMIN_VERIFICATION.STATUS.EXPIRED]: 'bg-gray-100 text-gray-600',
    [ADMIN_VERIFICATION.STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [ADMIN_VERIFICATION.STATUS.FAILED]: 'bg-red-100 text-red-800',
    [ADMIN_VERIFICATION.STATUS.CANCELLED]: 'bg-gray-100 text-gray-600',
    [ADMIN_VERIFICATION.STATUS.AWAITING_REVIEW]: 'bg-purple-100 text-purple-800',
  };

  if (verifications.length === 0) {
    return <p className="text-gray-500">No verifications found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {verifications.map((verification) => (
        <Card key={verification.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {verification.method.charAt(0).toUpperCase() + verification.method.slice(1)}
              </p>
              <p className="text-sm text-gray-600">{verification.value}</p>
            </div>
            <Badge className={statusColors[verification.status] || 'bg-gray-100 text-gray-600'}>
              {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

/**
 * UserKYCStatus Component
 * ইউজার KYC স্ট্যাটাস কম্পোনেন্ট
 */

import React from 'react';
import { UserKYC } from '@vubon/shared-types';
import { USER_KYC } from '@vubon/shared-constants';
import { Badge } from '../../common/components/Badge';
import { Card } from '../../common/components/Card';

export interface UserKYCStatusProps {
  kycList: UserKYC[];
  className?: string;
}

export const UserKYCStatus: React.FC<UserKYCStatusProps> = ({
  kycList,
  className = '',
}) => {
  const statusColors: Record<string, string> = {
    [USER_KYC.STATUS.VERIFIED]: 'bg-green-100 text-green-800',
    [USER_KYC.STATUS.SUBMITTED]: 'bg-blue-100 text-blue-800',
    [USER_KYC.STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [USER_KYC.STATUS.UNDER_REVIEW]: 'bg-purple-100 text-purple-800',
    [USER_KYC.STATUS.REJECTED]: 'bg-red-100 text-red-800',
    [USER_KYC.STATUS.EXPIRED]: 'bg-gray-100 text-gray-600',
    [USER_KYC.STATUS.CANCELLED]: 'bg-gray-100 text-gray-600',
    [USER_KYC.STATUS.NEEDS_REVISION]: 'bg-orange-100 text-orange-800',
  };

  if (kycList.length === 0) {
    return <p className="text-gray-500">No KYC records found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {kycList.map((kyc) => (
        <Card key={kyc.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {kyc.type.charAt(0).toUpperCase() + kyc.type.slice(1)}
              </p>
              <p className="text-sm text-gray-600">
                Document: {kyc.documentNumber || 'N/A'}
              </p>
              <p className="text-xs text-gray-500">
                Risk Level: {kyc.riskLevel}
              </p>
            </div>
            <Badge className={statusColors[kyc.status] || 'bg-gray-100 text-gray-600'}>
              {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
            </Badge>
          </div>
          {kyc.submittedAt && (
            <p className="mt-2 text-xs text-gray-500">
              Submitted: {new Date(kyc.submittedAt).toLocaleString()}
            </p>
          )}
          {kyc.reviewedAt && (
            <p className="text-xs text-gray-500">
              Reviewed: {new Date(kyc.reviewedAt).toLocaleString()}
            </p>
          )}
          {kyc.reviewComments && (
            <p className="mt-1 text-sm text-gray-600">
              Comment: {kyc.reviewComments}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
};

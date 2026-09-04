/**
 * UserVerificationStatus Component
 * ইউজার ভেরিফিকেশন স্ট্যাটাস কম্পোনেন্ট
 */

import React from 'react';
import { UserVerification } from '@vubon/shared-types';
import { USER_VERIFICATION } from '@vubon/shared-constants';
import { Badge } from '../../common/components/Badge';
import { Card } from '../../common/components/Card';

export interface UserVerificationStatusProps {
  verifications: UserVerification[];
  className?: string;
}

export const UserVerificationStatus: React.FC<UserVerificationStatusProps> = ({
  verifications,
  className = '',
}) => {
  const statusColors: Record<string, string> = {
    [USER_VERIFICATION.STATUS.VERIFIED]: 'bg-green-100 text-green-800',
    [USER_VERIFICATION.STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [USER_VERIFICATION.STATUS.REJECTED]: 'bg-red-100 text-red-800',
    [USER_VERIFICATION.STATUS.EXPIRED]: 'bg-gray-100 text-gray-600',
    [USER_VERIFICATION.STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [USER_VERIFICATION.STATUS.FAILED]: 'bg-red-100 text-red-800',
    [USER_VERIFICATION.STATUS.CANCELLED]: 'bg-gray-100 text-gray-600',
    [USER_VERIFICATION.STATUS.AWAITING_REVIEW]: 'bg-purple-100 text-purple-800',
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
              <p className="text-xs text-gray-500">
                Level: {verification.level}
              </p>
            </div>
            <Badge className={statusColors[verification.status] || 'bg-gray-100 text-gray-600'}>
              {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
            </Badge>
          </div>
          {verification.verifiedAt && (
            <p className="mt-2 text-xs text-gray-500">
              Verified: {new Date(verification.verifiedAt).toLocaleString()}
            </p>
          )}
          {verification.expiresAt && (
            <p className="text-xs text-gray-500">
              Expires: {new Date(verification.expiresAt).toLocaleString()}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
};

/**
 * Auth RequireVerified Guard
 * প্রমীকরণ ভেরিফাইড প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';

export interface AuthRequireVerifiedProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  verificationStatus: {
    isVerified: boolean;
    isLoading: boolean;
    unverifiedReason?: string;
  };
}

export const AuthRequireVerified: React.FC<AuthRequireVerifiedProps> = ({
  children,
  fallback,
  loadingFallback = <div>Loading verification status...</div>,
  verificationStatus,
}) => {
  if (verificationStatus.isLoading) {
    return <>{loadingFallback}</>;
  }

  if (verificationStatus.isVerified) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="verification-required">
      <h3>Email Verification Required</h3>
      <p>
        {verificationStatus.unverifiedReason || 'Please verify your email to continue.'}
      </p>
    </div>
  );
};

export const AuthRequireVerified2 = AuthRequireVerified;

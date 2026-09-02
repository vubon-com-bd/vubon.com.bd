/**
 * Auth RequireMFA Guard
 * প্রমীকরণ MFA প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';
import { AUTH_MFA } from '@vubon/shared-constants';

export interface AuthRequireMFAProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  mfaStatus: {
    enabled: boolean;
    verified: boolean;
    isLoading: boolean;
  };
}

export const AuthRequireMFA: React.FC<AuthRequireMFAProps> = ({
  children,
  fallback,
  loadingFallback = <div>Loading MFA status...</div>,
  mfaStatus,
}) => {
  if (mfaStatus.isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!mfaStatus.enabled) {
    return <>{children}</>;
  }

  if (!mfaStatus.verified) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="mfa-required">
        <h3>Multi-Factor Authentication Required</h3>
        <p>Please verify your MFA to continue.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export const AuthRequireMFA2 = AuthRequireMFA;

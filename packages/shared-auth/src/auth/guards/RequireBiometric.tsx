/**
 * Auth RequireBiometric Guard
 * প্রমীকরণ বায়োমেট্রিক প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';

export interface AuthRequireBiometricProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  biometricStatus: {
    enabled: boolean;
    verified: boolean;
    isLoading: boolean;
  };
}

export const AuthRequireBiometric: React.FC<AuthRequireBiometricProps> = ({
  children,
  fallback,
  loadingFallback = <div>Loading biometric status...</div>,
  biometricStatus,
}) => {
  if (biometricStatus.isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!biometricStatus.enabled) {
    return <>{children}</>;
  }

  if (!biometricStatus.verified) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="biometric-required">
        <h3>Biometric Authentication Required</h3>
        <p>Please verify your biometric to continue.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export const AuthRequireBiometric2 = AuthRequireBiometric;

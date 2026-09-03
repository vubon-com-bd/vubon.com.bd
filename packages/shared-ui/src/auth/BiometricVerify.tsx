/**
 * Auth BiometricVerify Component
 * প্রমীকরণ বায়োমেট্রিক ভেরিফাই কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useBiometric } from '@vubon/shared-auth';
import { AuthBiometricEndpoints } from '@vubon/shared-api';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthBiometricVerifyProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  deviceId?: string;
  className?: string;
}

export const AuthBiometricVerify: React.FC<AuthBiometricVerifyProps> = ({
  onSuccess,
  onError,
  deviceId,
  className = '',
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const biometricEndpoints = new AuthBiometricEndpoints({} as any);
  const { verifyBiometric, devices } = useBiometric(biometricEndpoints);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyBiometric({
        credentialId: deviceId || devices[0]?.credentialId || '',
        signature: 'mock_signature',
        challenge: 'mock_challenge',
      });
      if (result) {
        setVerified(true);
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (verified) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verified!</h2>
          <p className="text-sm text-gray-500">Biometric verification successful.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Biometric Verification</h2>
          <p className="text-sm text-gray-500">
            Please verify your biometric to continue.
          </p>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleVerify}
          loading={isVerifying}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify Biometric'}
        </Button>
      </div>
    </Card>
  );
};

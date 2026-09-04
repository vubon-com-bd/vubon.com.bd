/**
 * AdminBiometricVerify Component
 * অ্যাডমিন বায়োমেট্রিক ভেরিফাই কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';

export interface AdminBiometricVerifyProps {
  onVerify: () => Promise<boolean>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const AdminBiometricVerify: React.FC<AdminBiometricVerifyProps> = ({
  onVerify,
  onSuccess,
  onError,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const verified = await onVerify();
      if (verified) {
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`p-6 text-center ${className}`}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">Biometric Verification</h3>
      <p className="text-sm text-gray-500">Please verify your biometric to continue.</p>
      <Button
        className="mt-4"
        variant="primary"
        onClick={handleVerify}
        loading={isLoading}
      >
        Verify Biometric
      </Button>
    </Card>
  );
};

/**
 * Auth VerifyEmailForm Component
 * প্রমীকরণ ইমেইল ভেরিফাই ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useVerifyEmail, useResendVerification } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthVerifyEmailFormProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  email?: string;
  className?: string;
}

export const AuthVerifyEmailForm: React.FC<AuthVerifyEmailFormProps> = ({
  token,
  onSuccess,
  onError,
  email,
  className = '',
}) => {
  const [verified, setVerified] = useState(false);
  const [resendEmail, setResendEmail] = useState(email || '');

  const authEndpoints = new AuthEndpoints({} as any);
  const verifyMutation = useVerifyEmail(authEndpoints);
  const resendMutation = useResendVerification(authEndpoints);

  const handleVerify = async () => {
    try {
      await verifyMutation.mutateAsync(token);
      setVerified(true);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleResend = async () => {
    if (!resendEmail) return;
    try {
      await resendMutation.mutateAsync(resendEmail);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  if (verified) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
          <p className="text-sm text-gray-500">
            Your email has been successfully verified.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
          <p className="text-sm text-gray-500">
            Click the button below to verify your email address.
          </p>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleVerify}
          loading={verifyMutation.isPending}
        >
          Verify Email
        </Button>

        {resendEmail && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button
                onClick={handleResend}
                className="text-blue-600 hover:underline"
                disabled={resendMutation.isPending}
              >
                Resend verification
              </button>
            </p>
          </div>
        )}

        {verifyMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {verifyMutation.error.message}
          </div>
        )}
      </div>
    </Card>
  );
};

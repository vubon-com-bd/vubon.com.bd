/**
 * Auth MFAVerify Component
 * প্রমীকরণ MFA ভেরিফাই কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useMFA } from '@vubon/shared-auth';
import { AuthMFAEndpoints } from '@vubon/shared-api';
import { Input } from '../common/components/Input';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthMFAVerifyProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  method?: string;
  className?: string;
}

export const AuthMFAVerify: React.FC<AuthMFAVerifyProps> = ({
  onSuccess,
  onError,
  method = 'totp',
  className = '',
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mfaEndpoints = new AuthMFAEndpoints({} as any);
  const { verifyMFA } = useMFA(mfaEndpoints);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verified = await verifyMFA(code, method as any);
      if (verified) {
        onSuccess?.();
      } else {
        onError?.(new Error('Invalid verification code'));
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Verify MFA</h2>
          <p className="text-sm text-gray-500">
            Enter the code from your authenticator app to continue.
          </p>
        </div>

        <Input
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={code.length !== 6}
        >
          Verify
        </Button>
      </form>
    </Card>
  );
};

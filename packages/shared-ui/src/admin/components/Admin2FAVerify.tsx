/**
 * Admin2FAVerify Component
 * অ্যাডমিন 2FA ভেরিফাই কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';

export interface Admin2FAVerifyProps {
  onVerify: (code: string) => Promise<boolean>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const Admin2FAVerify: React.FC<Admin2FAVerifyProps> = ({
  onVerify,
  onSuccess,
  onError,
  className = '',
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verified = await onVerify(code);
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
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Verify 2FA</h3>
      <p className="text-sm text-gray-500">
        Enter the verification code from your authenticator app.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Input
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          fullWidth
        />
        <Button type="submit" variant="primary" fullWidth loading={isLoading}>
          Verify
        </Button>
      </form>
    </Card>
  );
};

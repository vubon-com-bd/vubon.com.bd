/**
 * Auth ResetPasswordForm Component
 * প্রমীকরণ রিসেট পাসওয়ার্ড ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useResetPassword } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { REGEX } from '@vubon/shared-constants';
import { Input } from '../common/components/Input';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const AuthResetPasswordForm: React.FC<AuthResetPasswordFormProps> = ({
  token,
  onSuccess,
  onError,
  className = '',
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const authEndpoints = new AuthEndpoints({} as any);
  const resetPasswordMutation = useResetPassword(authEndpoints);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!REGEX.PASSWORD.test(newPassword)) {
      setError('Password must contain uppercase, lowercase and number');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword });
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
          <p className="text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="password"
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
            required
            fullWidth
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
        >
          Reset Password
        </Button>

        {resetPasswordMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {resetPasswordMutation.error.message}
          </div>
        )}
      </form>
    </Card>
  );
};

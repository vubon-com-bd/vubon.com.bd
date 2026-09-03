/**
 * Auth ForgotPasswordForm Component
 * প্রমীকরণ ফরগট পাসওয়ার্ড ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useForgotPassword } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { Input } from '../common/components/Input';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthForgotPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const AuthForgotPasswordForm: React.FC<AuthForgotPasswordFormProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const authEndpoints = new AuthEndpoints({} as any);
  const forgotPasswordMutation = useForgotPassword(authEndpoints);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordMutation.mutateAsync(email);
      setSubmitted(true);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  if (submitted) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
          <p className="text-sm text-gray-500">
            We've sent a password reset link to {email}. Please check your inbox.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setEmail('');
            }}
          >
            Try another email
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={forgotPasswordMutation.isPending}
          disabled={forgotPasswordMutation.isPending}
        >
          Send Reset Link
        </Button>

        {forgotPasswordMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {forgotPasswordMutation.error.message}
          </div>
        )}
      </form>
    </Card>
  );
};

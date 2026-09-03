/**
 * Auth LoginForm Component
 * প্রমীকরণ লগইন ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useLogin } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { STATUS } from '@vubon/shared-constants';
import { Input } from '../common/components/Input';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthLoginFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
  className?: string;
}

export const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const authEndpoints = new AuthEndpoints({} as any);
  const loginMutation = useLogin(authEndpoints);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      onSuccess?.(result);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Sign In
        </Button>

        {loginMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {loginMutation.error.message}
          </div>
        )}
      </form>
    </Card>
  );
};

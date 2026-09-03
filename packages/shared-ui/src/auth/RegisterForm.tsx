/**
 * Auth RegisterForm Component
 * প্রমীকরণ রেজিস্টার ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useRegister } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { REGEX } from '@vubon/shared-constants';
import { Input } from '../common/components/Input';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthRegisterFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const authEndpoints = new AuthEndpoints({} as any);
  const registerMutation = useRegister(authEndpoints);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!REGEX.EMAIL.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!REGEX.PHONE.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!REGEX.PASSWORD.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await registerMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        acceptTerms: formData.acceptTerms,
      });
      onSuccess?.(result);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500">
            Fill in the details to create your account
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
            fullWidth
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
            fullWidth
          />

          <Input
            label="Phone Number"
            placeholder="017XXXXXXXX"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            required
            fullWidth
          />

          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            required
            fullWidth
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
            fullWidth
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleChange('acceptTerms', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              I accept the{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending}
        >
          Create Account
        </Button>

        {registerMutation.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {registerMutation.error.message}
          </div>
        )}
      </form>
    </Card>
  );
};

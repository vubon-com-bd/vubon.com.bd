'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@vubon/shared-ui';
import { useRegister } from '@vubon/auth-shared-hooks';
import { customerAuthClient } from '../../contexts/auth.context';

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function RegisterForm({
  onSuccess,
  redirectTo = '/dashboard',
}: RegisterFormProps): React.ReactElement {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const { register: registerUser, loading } = useRegister(customerAuthClient, {
    onSuccess: () => {
      setFormError(null);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    },
    onError: (error: Error) => {
      setFormError(error.message || 'Registration failed. Please try again.');
    },
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setFormError(null);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || null,
      });
    } catch {
      // Error is handled by useRegister hook
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
        <p className="mt-2 text-sm text-gray-600">Join Vubon and start your journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formError && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600" role="alert">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            {...registerField('firstName', {
              required: 'First name is required',
              minLength: { value: 1, message: 'First name is required' },
              maxLength: { value: 50, message: 'First name must not exceed 50 characters' },
              pattern: {
                value: /^[a-zA-Z\s\-']+$/,
                message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
              },
            })}
            error={errors.firstName?.message}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            {...registerField('lastName', {
              required: 'Last name is required',
              minLength: { value: 1, message: 'Last name is required' },
              maxLength: { value: 50, message: 'Last name must not exceed 50 characters' },
              pattern: {
                value: /^[a-zA-Z\s\-']+$/,
                message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
              },
            })}
            error={errors.lastName?.message}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...registerField('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          error={errors.email?.message}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...registerField('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            maxLength: { value: 72, message: 'Password must not exceed 72 characters' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,72}$/,
              message:
                'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)',
            },
          })}
          error={errors.password?.message}
          required
        />

        <Input
          label="Phone Number (Optional)"
          type="tel"
          placeholder="017XXXXXXXX"
          {...registerField('phone', {
            pattern: {
              value: /^01[3-9]\d{8}$/,
              message: 'Please enter a valid Bangladeshi phone number (format: 01XXXXXXXXX)',
            },
          })}
          error={errors.phone?.message}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/auth/login" className="text-blue-600 hover:text-blue-800 hover:underline">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}

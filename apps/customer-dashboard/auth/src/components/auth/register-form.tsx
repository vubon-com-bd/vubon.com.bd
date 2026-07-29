/**
 * Registration Form Component
 * Handles user registration with validation
 */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useRegister } from '@vubon/auth-shared-hooks';
import { Button, FormInput } from '@vubon/shared-ui';
import { authClient } from '../../providers/root-provider.js';

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}

interface RegisterFormProps {
  redirectTo?: string;
  onSuccess?: (data: RegisterFormData) => void;
}

export function RegisterForm({
  redirectTo = '/dashboard',
  onSuccess,
}: RegisterFormProps): React.ReactElement {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const {
    register: registerUser,
    loading,
    error,
  } = useRegister(authClient, {
    onSuccess: (response) => {
      console.log('Registration successful:', response);
      if (onSuccess) {
        onSuccess(getValues());
      }
      router.push(redirectTo);
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });

  const onSubmit = async (formData: RegisterFormData): Promise<void> => {
    try {
      await registerUser(formData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  // Helper to get error message for a field
  const getErrorMessage = (fieldName: keyof RegisterFormData): string | undefined => {
    const error = errors[fieldName];
    if (error) {
      return error.message;
    }
    return undefined;
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-2 text-sm text-gray-600">Join us today and start your journey</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
          <p className="font-medium">Registration failed</p>
          <p>{error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            required
            register={register}
            error={getErrorMessage('firstName')}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            required
            register={register}
            error={getErrorMessage('lastName')}
          />
        </div>

        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          register={register}
          error={getErrorMessage('email')}
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          register={register}
          error={getErrorMessage('password')}
        />

        <FormInput
          name="phone"
          label="Phone Number (Optional)"
          type="tel"
          placeholder="01712345678"
          register={register}
          error={getErrorMessage('phone')}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

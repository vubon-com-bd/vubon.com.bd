import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '@vubon/auth-shared-hooks';
import { useAuth } from '@vubon/auth-shared-auth';
import { Button, Input } from '@vubon/shared-ui';

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface RegisterFormProps {
  redirectTo?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ redirectTo = '/dashboard' }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const auth = useAuth();
  const { register: registerUser, loading, error } = useRegister(auth.client);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error.message}
        </div>
      )}
      <Input
        label="First Name"
        {...register('firstName', { required: 'First name is required' })}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register('lastName', { required: 'Last name is required' })}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' }
        })}
        error={errors.password?.message}
      />
      <Input
        label="Phone (Optional)"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Button type="submit" loading={loading} fullWidth>
        Create Account
      </Button>
    </form>
  );
};

/**
 * Form Input Component
 * Integrates with React Hook Form for validation
 */

import React from 'react';
import { FieldValues, UseFormRegister, FieldError, Path } from 'react-hook-form';
import { Input, InputProps } from '../ui/Input.js';

export interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  InputProps,
  'name' | 'error'
> {
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError | string;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  register,
  error,
  required,
  ...props
}: FormInputProps<TFieldValues>) {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <Input {...register(name, { required })} {...props} error={errorMessage} required={required} />
  );
}

FormInput.displayName = 'FormInput';

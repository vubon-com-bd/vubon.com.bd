/**
 * Generic Form Component
 * Wraps React Hook Form's handleSubmit
 */

import React, { FormHTMLAttributes } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues> extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className = '',
  ...props
}: FormProps<TFieldValues>) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate {...props}>
      {children}
    </form>
  );
}

Form.displayName = 'Form';

'use client';
import { forwardRef } from 'react';
import { Input } from '../../primitives/Input';
import type { InputProps } from '../../primitives/Input';

export interface PhoneInputProps extends Omit<InputProps, 'type'> {}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(props, ref) {
    return (
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+880 1XXX-XXXXXX"
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

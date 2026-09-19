'use client';
import { forwardRef, useState } from 'react';
import { Input } from '../../primitives/Input';
import { IconButton } from '../../primitives/IconButton';
import { EyeIcon } from '../../icons/generic/EyeIcon';
import type { InputProps } from '../../primitives/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          autoComplete="current-password"
          className="pr-10"
          {...props}
        />
        <span className="absolute right-1 top-1/2 -translate-y-1/2">
          <IconButton
            type="button"
            variant="ghost"
            size="icon"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
          >
            <EyeIcon off={!visible} size="sm" />
          </IconButton>
        </span>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

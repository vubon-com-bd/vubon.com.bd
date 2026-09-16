'use client';
import { forwardRef } from 'react';
import { Input } from '../../primitives/Input';
import type { InputProps } from '../../primitives/Input';

export interface TimePickerProps extends Omit<InputProps, 'type'> {}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  function TimePicker(props, ref) {
    return <Input ref={ref} type="time" {...props} />;
  },
);

TimePicker.displayName = 'TimePicker';

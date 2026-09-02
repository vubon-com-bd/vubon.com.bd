import React, { useState, useEffect, forwardRef } from 'react';
import { Input, InputProps } from '../components/Input';

export interface BengaliNumberInputProps extends Omit<InputProps, 'value' | 'onChange' | 'type'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const convertToBangla = (num: number): string => {
  return num.toString().split('').map(d => banglaDigits[parseInt(d)]).join('');
};

const convertToEnglish = (str: string): string => {
  let result = '';
  for (const char of str) {
    const index = banglaDigits.indexOf(char);
    if (index !== -1) {
      result += index.toString();
    } else {
      result += char;
    }
  }
  return result;
};

export const BengaliNumberInput = forwardRef<HTMLInputElement, BengaliNumberInputProps>(
  ({ value, onChange, min, max, step = 1, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>(
      value !== undefined && value !== 0 ? convertToBangla(value) : ''
    );
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (!isFocused && value !== undefined && value !== 0) {
        setDisplayValue(convertToBangla(value));
      } else if (!isFocused && value === 0) {
        setDisplayValue('');
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const englishValue = convertToEnglish(e.target.value);
      
      if (e.target.value === '' || englishValue === '') {
        setDisplayValue('');
        onChange?.(0);
        return;
      }

      const numValue = parseFloat(englishValue);

      if (!isNaN(numValue)) {
        let finalValue = numValue;
        if (min !== undefined && finalValue < min) finalValue = min;
        if (max !== undefined && finalValue > max) finalValue = max;
        
        if (step) {
          finalValue = Math.round(finalValue / step) * step;
        }

        setDisplayValue(convertToBangla(finalValue));
        onChange?.(finalValue);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
      if (value !== undefined && value !== 0) {
        setDisplayValue(value.toString());
      } else {
        setDisplayValue('');
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (value !== undefined && value !== 0) {
        setDisplayValue(convertToBangla(value));
      } else {
        setDisplayValue('');
      }
    };

    return (
      <Input
        ref={ref}
        {...props}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputMode="decimal"
      />
    );
  }
);

BengaliNumberInput.displayName = 'BengaliNumberInput';

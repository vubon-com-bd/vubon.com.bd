'use client';
import { forwardRef } from 'react';
import { Input } from '../../primitives/Input';
import { Label } from '../../primitives/Label';
import { cn } from '../../utils/cn';

export interface AddressValue {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface AddressInputProps {
  readonly value: AddressValue;
  readonly onChange: (value: AddressValue) => void;
  readonly disabled?: boolean;
  readonly className?: string;
}

export const AddressInput = forwardRef<HTMLDivElement, AddressInputProps>(function AddressInput(
  { value, onChange, disabled, className },
  ref
) {
  const update = <K extends keyof AddressValue>(key: K, v: AddressValue[K]): void => {
    onChange({ ...value, [key]: v });
  };

  return (
    <div ref={ref} className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', className)}>
      <div className="flex flex-col gap-1 md:col-span-2">
        <Label htmlFor="addr-line1" required>
          Address line 1
        </Label>
        <Input
          id="addr-line1"
          value={value.line1}
          disabled={disabled}
          onChange={(e) => update('line1', e.target.value)}
          autoComplete="address-line1"
        />
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <Label htmlFor="addr-line2">Address line 2</Label>
        <Input
          id="addr-line2"
          value={value.line2 ?? ''}
          disabled={disabled}
          onChange={(e) => update('line2', e.target.value)}
          autoComplete="address-line2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="addr-city" required>
          City
        </Label>
        <Input
          id="addr-city"
          value={value.city}
          disabled={disabled}
          onChange={(e) => update('city', e.target.value)}
          autoComplete="address-level2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="addr-state" required>
          State
        </Label>
        <Input
          id="addr-state"
          value={value.state}
          disabled={disabled}
          onChange={(e) => update('state', e.target.value)}
          autoComplete="address-level1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="addr-postal" required>
          Postal code
        </Label>
        <Input
          id="addr-postal"
          value={value.postalCode}
          disabled={disabled}
          onChange={(e) => update('postalCode', e.target.value)}
          autoComplete="postal-code"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="addr-country" required>
          Country
        </Label>
        <Input
          id="addr-country"
          value={value.country}
          disabled={disabled}
          onChange={(e) => update('country', e.target.value)}
          autoComplete="country-name"
        />
      </div>
    </div>
  );
});

AddressInput.displayName = 'AddressInput';

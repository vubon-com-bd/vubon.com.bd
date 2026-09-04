/**
 * UserAddressForm Component
 * ইউজার ঠিকানা ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { UserAddress } from '@vubon/shared-types';
import { USER_ADDRESS } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface UserAddressFormProps {
  address?: Partial<UserAddress>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const UserAddressForm: React.FC<UserAddressFormProps> = ({
  address,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    country: address?.country || USER_ADDRESS.COUNTRIES.BD,
    postalCode: address?.postalCode || '',
    division: address?.division || USER_ADDRESS.DIVISIONS.DHAKA,
    district: address?.district || '',
    upazila: address?.upazila || '',
    union: address?.union || '',
    type: address?.type || USER_ADDRESS.TYPES.BOTH,
    isDefault: address?.isDefault || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.street || formData.street.length < 2) {
      newErrors.street = 'Street is required';
    }
    if (!formData.city || formData.city.length < 2) {
      newErrors.city = 'City is required';
    }
    if (!formData.state || formData.state.length < 2) {
      newErrors.state = 'State is required';
    }
    if (!formData.postalCode || !/^\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Valid postal code is required';
    }
    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const divisionOptions = Object.values(USER_ADDRESS.DIVISIONS).map((div) => ({
    value: div,
    label: div.charAt(0).toUpperCase() + div.slice(1),
  }));

  const countryOptions = Object.values(USER_ADDRESS.COUNTRIES).map((country) => ({
    value: country,
    label: country,
  }));

  const typeOptions = Object.values(USER_ADDRESS.TYPES).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Street Address"
        value={formData.street}
        onChange={(e) => handleChange('street', e.target.value)}
        error={errors.street}
        required
        fullWidth
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
          required
          fullWidth
        />
        <Input
          label="State"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          error={errors.state}
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Country"
          options={countryOptions}
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          fullWidth
        />
        <Input
          label="Postal Code"
          value={formData.postalCode}
          onChange={(e) => handleChange('postalCode', e.target.value)}
          error={errors.postalCode}
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Division"
          options={divisionOptions}
          value={formData.division}
          onChange={(e) => handleChange('division', e.target.value)}
          fullWidth
        />
        <Input
          label="District"
          value={formData.district}
          onChange={(e) => handleChange('district', e.target.value)}
          error={errors.district}
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Upazila"
          value={formData.upazila}
          onChange={(e) => handleChange('upazila', e.target.value)}
          fullWidth
        />
        <Input
          label="Union"
          value={formData.union}
          onChange={(e) => handleChange('union', e.target.value)}
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Address Type"
          options={typeOptions}
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          fullWidth
        />
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => handleChange('isDefault', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Set as default address</label>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {address?.id ? 'Update Address' : 'Add Address'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

/**
 * UserContactForm Component
 * ইউজার কন্টাক্ট ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { UserContact } from '@vubon/shared-types';
import { USER_CONTACT } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface UserContactFormProps {
  contact?: Partial<UserContact>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const UserContactForm: React.FC<UserContactFormProps> = ({
  contact,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    type: contact?.type || USER_CONTACT.TYPES.EMAIL,
    value: contact?.value || '',
    label: contact?.label || '',
    isPrimary: contact?.isPrimary || false,
    isVerified: contact?.isVerified || false,
    visibility: contact?.visibility || USER_CONTACT.VISIBILITY.PRIVATE,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.value || formData.value.length < 1) {
      newErrors.value = 'Contact value is required';
    }

    if (formData.type === USER_CONTACT.TYPES.EMAIL) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value)) {
        newErrors.value = 'Invalid email format';
      }
    }

    if (formData.type === USER_CONTACT.TYPES.PHONE || formData.type === USER_CONTACT.TYPES.MOBILE) {
      if (!/^(?:\+880|880|0)(?:1[3-9]\d{8})$/.test(formData.value)) {
        newErrors.value = 'Invalid phone number';
      }
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

  const typeOptions = Object.values(USER_CONTACT.TYPES).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  const visibilityOptions = Object.values(USER_CONTACT.VISIBILITY).map((visibility) => ({
    value: visibility,
    label: visibility.charAt(0).toUpperCase() + visibility.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Select
        label="Contact Type"
        options={typeOptions}
        value={formData.type}
        onChange={(e) => handleChange('type', e.target.value)}
        fullWidth
      />

      <Input
        label="Contact Value"
        value={formData.value}
        onChange={(e) => handleChange('value', e.target.value)}
        error={errors.value}
        required
        fullWidth
      />

      <Input
        label="Label (Optional)"
        value={formData.label}
        onChange={(e) => handleChange('label', e.target.value)}
        fullWidth
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Visibility"
          options={visibilityOptions}
          value={formData.visibility}
          onChange={(e) => handleChange('visibility', e.target.value)}
          fullWidth
        />
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            checked={formData.isPrimary}
            onChange={(e) => handleChange('isPrimary', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Set as primary</label>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {contact?.id ? 'Update Contact' : 'Add Contact'}
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

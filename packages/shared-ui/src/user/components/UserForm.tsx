/**
 * UserForm Component
 * ইউজার ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { User } from '@vubon/shared-types';
import { USER_STATUS, USER_ROLES } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface UserFormProps {
  user?: Partial<User>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || USER_ROLES.USER,
    status: user?.status || USER_STATUS.ACTIVE,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.phone && !/^(?:\+880|880|0)(?:1[3-9]\d{8})$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Bangladesh phone number';
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

  const roleOptions = Object.values(USER_ROLES).map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' '),
  }));

  const statusOptions = Object.values(USER_STATUS).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        fullWidth
      />

      <Input
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
        fullWidth
      />

      <Input
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
        fullWidth
      />

      <Select
        label="Role"
        options={roleOptions}
        value={formData.role}
        onChange={(e) => handleChange('role', e.target.value)}
        fullWidth
      />

      <Select
        label="Status"
        options={statusOptions}
        value={formData.status}
        onChange={(e) => handleChange('status', e.target.value)}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {user?.id ? 'Update User' : 'Create User'}
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

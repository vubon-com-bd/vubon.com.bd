/**
 * AdminForm Component
 * অ্যাডমিন ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Admin } from '@vubon/shared-types';
import { ADMIN_STATUS, ADMIN_ROLES } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface AdminFormProps {
  admin?: Partial<Admin>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  admin,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    role: admin?.role || ADMIN_ROLES.ADMIN,
    status: admin?.status || ADMIN_STATUS.ACTIVE,
    level: admin?.level || 'level_1',
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

  const roleOptions = Object.values(ADMIN_ROLES).map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' '),
  }));

  const statusOptions = Object.values(ADMIN_STATUS).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }));

  const levelOptions = [
    { value: 'level_1', label: 'Level 1' },
    { value: 'level_2', label: 'Level 2' },
    { value: 'level_3', label: 'Level 3' },
    { value: 'level_4', label: 'Level 4' },
    { value: 'level_5', label: 'Level 5' },
  ];

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

      <Select
        label="Level"
        options={levelOptions}
        value={formData.level}
        onChange={(e) => handleChange('level', e.target.value)}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {admin?.id ? 'Update Admin' : 'Create Admin'}
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

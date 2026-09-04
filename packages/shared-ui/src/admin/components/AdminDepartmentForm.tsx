/**
 * AdminDepartmentForm Component
 * অ্যাডমিন ডিপার্টমেন্ট ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Select } from '../../common/components/Select';

export interface AdminDepartmentFormProps {
  department?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const AdminDepartmentForm: React.FC<AdminDepartmentFormProps> = ({
  department,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: department?.name || '',
    code: department?.code || '',
    description: department?.description || '',
    status: department?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Department Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />

      <Input
        label="Department Code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        required
        fullWidth
      />

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        fullWidth
      />

      <Select
        label="Status"
        options={statusOptions}
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {department?.id ? 'Update Department' : 'Create Department'}
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

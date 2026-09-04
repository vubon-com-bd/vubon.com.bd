/**
 * AdminTeamForm Component
 * অ্যাডমিন টিম ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Select } from '../../common/components/Select';

export interface AdminTeamFormProps {
  team?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
  departments?: string[];
}

export const AdminTeamForm: React.FC<AdminTeamFormProps> = ({
  team,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
  departments = [],
}) => {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    description: team?.description || '',
    department: team?.department || '',
    status: team?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
  ];

  const departmentOptions = departments.map((dept) => ({
    value: dept,
    label: dept.charAt(0).toUpperCase() + dept.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Team Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        label="Department"
        options={departmentOptions}
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
          {team?.id ? 'Update Team' : 'Create Team'}
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

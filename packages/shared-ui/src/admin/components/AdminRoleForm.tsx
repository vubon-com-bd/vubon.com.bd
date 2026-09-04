/**
 * AdminRoleForm Component
 * অ্যাডমিন রোল ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';

export interface AdminRoleFormProps {
  role?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const AdminRoleForm: React.FC<AdminRoleFormProps> = ({
  role,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    hierarchy: role?.hierarchy || 10,
    permissions: role?.permissions || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Role Name"
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

      <Input
        type="number"
        label="Hierarchy"
        value={formData.hierarchy}
        onChange={(e) => setFormData({ ...formData, hierarchy: Number(e.target.value) })}
        min={0}
        max={100}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {role?.id ? 'Update Role' : 'Create Role'}
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

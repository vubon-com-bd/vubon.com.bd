/**
 * AdminPermissionForm Component
 * অ্যাডমিন পারমিশন ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Select } from '../../common/components/Select';

export interface AdminPermissionFormProps {
  permission?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const AdminPermissionForm: React.FC<AdminPermissionFormProps> = ({
  permission,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: permission?.name || '',
    resource: permission?.resource || '',
    action: permission?.action || 'read',
    roles: permission?.roles || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const actionOptions = [
    { value: 'create', label: 'Create' },
    { value: 'read', label: 'Read' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'manage', label: 'Manage' },
    { value: 'execute', label: 'Execute' },
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Permission Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />

      <Input
        label="Resource"
        value={formData.resource}
        onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
        required
        fullWidth
      />

      <Select
        label="Action"
        options={actionOptions}
        value={formData.action}
        onChange={(e) => setFormData({ ...formData, action: e.target.value })}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          {permission?.id ? 'Update Permission' : 'Create Permission'}
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

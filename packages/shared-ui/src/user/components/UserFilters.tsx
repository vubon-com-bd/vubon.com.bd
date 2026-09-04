/**
 * UserFilters Component
 * ইউজার ফিল্টার কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';
import { USER_STATUS, USER_ROLES } from '@vubon/shared-constants';

export interface UserFiltersProps {
  onFilter: (filters: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
  initialFilters?: Record<string, any>;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  onFilter,
  onReset,
  className = '',
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    status: initialFilters.status || '',
    role: initialFilters.role || '',
  });

  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeFilters: Record<string, any> = {};
    if (filters.search) activeFilters.search = filters.search;
    if (filters.status) activeFilters.status = filters.status;
    if (filters.role) activeFilters.role = filters.role;
    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({ search: '', status: '', role: '' });
    if (onReset) onReset();
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    ...Object.values(USER_STATUS).map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
    })),
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    ...Object.values(USER_ROLES).map((role) => ({
      value: role,
      label: role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' '),
    })),
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          fullWidth
        />

        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          fullWidth
        />

        <Select
          options={roleOptions}
          value={filters.role}
          onChange={(e) => handleChange('role', e.target.value)}
          fullWidth
        />
      </div>

      <div className="flex space-x-2">
        <Button type="submit" variant="primary">
          Apply Filters
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

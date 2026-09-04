/**
 * AdminReportForm Component
 * অ্যাডমিন রিপোর্ট ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Select } from '../../common/components/Select';

export interface AdminReportFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const AdminReportForm: React.FC<AdminReportFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'daily' as const,
    format: 'pdf' as const,
    filters: {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const typeOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' },
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'excel', label: 'Excel' },
    { value: 'json', label: 'JSON' },
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        label="Report Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />

      <Select
        label="Report Type"
        options={typeOptions}
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
        fullWidth
      />

      <Select
        label="Format"
        options={formatOptions}
        value={formData.format}
        onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
        fullWidth
      />

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          Create Report
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

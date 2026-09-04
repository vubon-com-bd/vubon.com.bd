/**
 * AdminDepartmentList Component
 * অ্যাডমিন ডিপার্টমেন্ট লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminDepartment } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';

export interface AdminDepartmentListProps {
  departments: AdminDepartment[];
  onEdit?: (department: AdminDepartment) => void;
  onDelete?: (departmentId: string) => void;
  onViewMembers?: (departmentId: string) => void;
  className?: string;
}

export const AdminDepartmentList: React.FC<AdminDepartmentListProps> = ({
  departments,
  onEdit,
  onDelete,
  onViewMembers,
  className = '',
}) => {
  if (departments.length === 0) {
    return <p className="text-gray-500">No departments found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {departments.map((dept) => (
        <Card key={dept.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {dept.name.charAt(0).toUpperCase() + dept.name.slice(1)}
              </h4>
              <p className="text-sm text-gray-500">Code: {dept.code}</p>
              {dept.description && (
                <p className="text-sm text-gray-600">{dept.description}</p>
              )}
              <div className="mt-1 flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    dept.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {dept.status}
                </span>
                <span className="text-xs text-gray-500">
                  Members: {dept.members.length}
                </span>
                {dept.headId && (
                  <span className="text-xs text-gray-500">Has Head</span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {onViewMembers && (
                <Button variant="outline" size="sm" onClick={() => onViewMembers(dept.id)}>
                  Members
                </Button>
              )}
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(dept)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(dept.id)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

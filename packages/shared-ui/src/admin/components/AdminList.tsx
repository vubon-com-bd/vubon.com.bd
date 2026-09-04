/**
 * AdminList Component
 * অ্যাডমিন লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { Admin } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { AdminTable } from './AdminTable';
import { Pagination } from '../../common/components/Pagination';
import { Loading } from '../../common/components/Loading';

export interface AdminListProps {
  admins: Admin[];
  total: number;
  page: number;
  limit: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onRowClick?: (admin: Admin) => void;
  onEdit?: (admin: Admin) => void;
  onDelete?: (admin: Admin) => void;
  className?: string;
  showActions?: boolean;
}

export const AdminList: React.FC<AdminListProps> = ({
  admins,
  total,
  page,
  limit,
  isLoading = false,
  onPageChange,
  onRowClick,
  onEdit,
  onDelete,
  className = '',
  showActions = false,
}) => {
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <Card className="flex justify-center py-8">
        <Loading />
      </Card>
    );
  }

  if (admins.length === 0) {
    return (
      <Card className="py-8 text-center">
        <p className="text-gray-500">No admins found.</p>
      </Card>
    );
  }

  return (
    <div className={className}>
      <AdminTable
        admins={admins}
        onRowClick={onRowClick}
        showActions={showActions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

/**
 * UserAddressList Component
 * ইউজার ঠিকানা লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { UserAddress } from '@vubon/shared-types';
import { Button } from '../../common/components/Button';
import { Card } from '../../common/components/Card';

export interface UserAddressListProps {
  addresses: UserAddress[];
  onEdit?: (address: UserAddress) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
  className?: string;
}

export const UserAddressList: React.FC<UserAddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  className = '',
}) => {
  if (addresses.length === 0) {
    return <p className="text-gray-500">No addresses found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {addresses.map((address) => (
        <Card key={address.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900">{address.street}</p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-sm text-gray-500">
                {address.country} • {address.division}
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {!address.isDefault && onSetDefault && (
                <Button variant="outline" size="sm" onClick={() => onSetDefault(address.id)}>
                  Set Default
                </Button>
              )}
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(address.id)}>
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

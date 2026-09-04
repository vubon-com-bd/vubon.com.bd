/**
 * UserContactList Component
 * ইউজার কন্টাক্ট লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { UserContact } from '@vubon/shared-types';
import { Button } from '../../common/components/Button';
import { Card } from '../../common/components/Card';

export interface UserContactListProps {
  contacts: UserContact[];
  onEdit?: (contact: UserContact) => void;
  onDelete?: (contactId: string) => void;
  onVerify?: (contactId: string) => void;
  className?: string;
}

export const UserContactList: React.FC<UserContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
  onVerify,
  className = '',
}) => {
  if (contacts.length === 0) {
    return <p className="text-gray-500">No contacts found.</p>;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {contacts.map((contact) => (
        <Card key={contact.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {contact.label || contact.value}
              </p>
              <p className="text-sm text-gray-600">{contact.value}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {contact.type}
                </span>
                {contact.isPrimary && (
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    Primary
                  </span>
                )}
                {contact.isVerified && (
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {!contact.isVerified && onVerify && (
                <Button variant="outline" size="sm" onClick={() => onVerify(contact.id)}>
                  Verify
                </Button>
              )}
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(contact)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(contact.id)}>
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

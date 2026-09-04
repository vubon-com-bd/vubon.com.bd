/**
 * useUpdateContact Hook
 * কন্টাক্ট আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserContactEndpoints } from '@vubon/shared-api';
import { UserContactUpdateInput } from '@vubon/shared-types';

export const useUpdateContact = (contactEndpoints: UserContactEndpoints) => {
  return useMutation({
    mutationFn: ({ contactId, data }: { contactId: string; data: UserContactUpdateInput }) =>
      contactEndpoints.updateContact(contactId, data),
  });
};

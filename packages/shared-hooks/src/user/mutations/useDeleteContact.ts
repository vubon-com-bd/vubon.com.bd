/**
 * useDeleteContact Hook
 * কন্টাক্ট ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserContactEndpoints } from '@vubon/shared-api';

export const useDeleteContact = (contactEndpoints: UserContactEndpoints) => {
  return useMutation({
    mutationFn: (contactId: string) => contactEndpoints.deleteContact(contactId),
  });
};

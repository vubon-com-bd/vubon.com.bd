/**
 * useAddContact Hook
 * কন্টাক্ট যোগ করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserContactEndpoints } from '@vubon/shared-api';
import { UserContactCreateInput } from '@vubon/shared-types';

export const useAddContact = (contactEndpoints: UserContactEndpoints) => {
  return useMutation({
    mutationFn: (data: UserContactCreateInput) => contactEndpoints.createContact(data),
  });
};

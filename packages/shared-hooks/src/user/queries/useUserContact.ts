/**
 * useUserContact Hook
 * ইউজারের একটি কন্টাক্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserContactEndpoints } from '@vubon/shared-api';
import { UserContact } from '@vubon/shared-types';

export const useUserContact = (contactEndpoints: UserContactEndpoints, contactId: string) => {
  const {
    data: contact,
    isLoading,
    error,
    refetch,
  } = useQuery<UserContact>({
    queryKey: ['user', 'contact', contactId],
    queryFn: () => contactEndpoints.getContact(contactId),
    enabled: !!contactId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    contact,
    isLoading,
    error,
    refetch,
  };
};

/**
 * useUserContacts Hook
 * ইউজারের সব কন্টাক্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserContactEndpoints } from '@vubon/shared-api';
import { UserContact } from '@vubon/shared-types';

export const useUserContacts = (contactEndpoints: UserContactEndpoints, userId: string) => {
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = useQuery<UserContact[]>({
    queryKey: ['user', 'contacts', userId],
    queryFn: () => contactEndpoints.getContacts(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    contacts: contacts || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyContacts = (contactEndpoints: UserContactEndpoints) => {
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = useQuery<UserContact[]>({
    queryKey: ['user', 'contacts', 'me'],
    queryFn: () => contactEndpoints.getMyContacts(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    contacts: contacts || [],
    isLoading,
    error,
    refetch,
  };
};

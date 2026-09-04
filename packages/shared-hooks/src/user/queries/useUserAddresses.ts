/**
 * useUserAddresses Hook
 * ইউজারের সব ঠিকানা পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserAddressEndpoints } from '@vubon/shared-api';
import { UserAddress } from '@vubon/shared-types';

export const useUserAddresses = (addressEndpoints: UserAddressEndpoints, userId: string) => {
  const {
    data: addresses,
    isLoading,
    error,
    refetch,
  } = useQuery<UserAddress[]>({
    queryKey: ['user', 'addresses', userId],
    queryFn: () => addressEndpoints.getAddresses(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    addresses: addresses || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyAddresses = (addressEndpoints: UserAddressEndpoints) => {
  const {
    data: addresses,
    isLoading,
    error,
    refetch,
  } = useQuery<UserAddress[]>({
    queryKey: ['user', 'addresses', 'me'],
    queryFn: () => addressEndpoints.getMyAddresses(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    addresses: addresses || [],
    isLoading,
    error,
    refetch,
  };
};

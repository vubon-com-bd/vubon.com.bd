/**
 * useUserAddress Hook
 * ইউজারের একটি ঠিকানা পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserAddressEndpoints } from '@vubon/shared-api';
import { UserAddress } from '@vubon/shared-types';

export const useUserAddress = (addressEndpoints: UserAddressEndpoints, addressId: string) => {
  const {
    data: address,
    isLoading,
    error,
    refetch,
  } = useQuery<UserAddress>({
    queryKey: ['user', 'address', addressId],
    queryFn: () => addressEndpoints.getAddress(addressId),
    enabled: !!addressId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    address,
    isLoading,
    error,
    refetch,
  };
};

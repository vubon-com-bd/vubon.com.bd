/**
 * useDeleteAddress Hook
 * ঠিকানা ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserAddressEndpoints } from '@vubon/shared-api';

export const useDeleteAddress = (addressEndpoints: UserAddressEndpoints) => {
  return useMutation({
    mutationFn: (addressId: string) => addressEndpoints.deleteAddress(addressId),
  });
};

/**
 * useUpdateAddress Hook
 * ঠিকানা আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserAddressEndpoints } from '@vubon/shared-api';
import { UserAddressUpdateInput } from '@vubon/shared-types';

export const useUpdateAddress = (addressEndpoints: UserAddressEndpoints) => {
  return useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: UserAddressUpdateInput }) =>
      addressEndpoints.updateAddress(addressId, data),
  });
};

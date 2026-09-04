/**
 * useAddAddress Hook
 * ঠিকানা যোগ করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserAddressEndpoints } from '@vubon/shared-api';
import { UserAddressCreateInput } from '@vubon/shared-types';

export const useAddAddress = (addressEndpoints: UserAddressEndpoints) => {
  return useMutation({
    mutationFn: (data: UserAddressCreateInput) => addressEndpoints.createAddress(data),
  });
};

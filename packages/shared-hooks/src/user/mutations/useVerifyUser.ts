/**
 * useVerifyUser Hook
 * ইউজার ভেরিফাই করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserVerificationEndpoints } from '@vubon/shared-api';
import { UserVerificationVerifyInput } from '@vubon/shared-types';

export const useVerifyUser = (verificationEndpoints: UserVerificationEndpoints) => {
  return useMutation({
    mutationFn: ({
      verificationId,
      data,
    }: {
      verificationId: string;
      data: UserVerificationVerifyInput;
    }) => verificationEndpoints.verifyCode(verificationId, data),
  });
};

export const useVerifyUserEmail = (verificationEndpoints: UserVerificationEndpoints) => {
  return useMutation({
    mutationFn: (token: string) => verificationEndpoints.verifyEmail(token),
  });
};

export const useVerifyUserPhone = (verificationEndpoints: UserVerificationEndpoints) => {
  return useMutation({
    mutationFn: ({ code, phone }: { code: string; phone: string }) =>
      verificationEndpoints.verifyPhone(code, phone),
  });
};

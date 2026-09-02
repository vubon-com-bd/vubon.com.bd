/**
 * Auth useRegister Mutation
 * প্রমীকরণ রেজিস্টার মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';
import { REGEX } from '@vubon/shared-constants';

export const useRegister = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      name: string;
      phone: string;
      acceptTerms?: boolean;
    }) => {
      // REGEX ব্যবহার করে ইমেইল এবং ফোন ভ্যালিডেট করা
      if (!REGEX.EMAIL.test(data.email)) {
        throw new Error('Invalid email format');
      }
      if (!REGEX.PHONE.test(data.phone)) {
        throw new Error('Invalid phone number');
      }
      if (!REGEX.PASSWORD.test(data.password)) {
        throw new Error('Password must contain uppercase, lowercase and number');
      }

      return authEndpoints.register({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        acceptTerms: data.acceptTerms || true,
      });
    },
    onSuccess: (data) => {
      // AuthRegisterResponse এ accessToken নেই, তাই শুধু user সেট করা
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      if (data.sessionId) {
        localStorage.setItem('sessionId', data.sessionId);
      }
    },
  });
};

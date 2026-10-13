import { TApiModule } from '../utility/type';

export const authRecoveryCodeApi: TApiModule = {
  "generate": {
    endpoint: "generate",
    method: "POST",
    path: "/auth/recovery-codes/generate",
  },

  "getCount": {
    endpoint: "getCount",
    method: "GET",
    path: "/auth/recovery-codes",
  }
};

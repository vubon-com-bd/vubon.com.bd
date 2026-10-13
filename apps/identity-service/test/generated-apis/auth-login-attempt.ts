import { TApiModule } from '../utility/type';

export const authLoginAttemptApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/login-attempts",
  }
};

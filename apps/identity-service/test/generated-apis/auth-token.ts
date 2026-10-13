import { TApiModule } from '../utility/type';

export const authTokenApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/tokens",
  }
};

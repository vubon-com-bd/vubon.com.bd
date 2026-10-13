import { TApiModule } from '../utility/type';

export const healthApi: TApiModule = {
  "check": {
    endpoint: "check",
    method: "GET",
    path: "/health",
  }
};

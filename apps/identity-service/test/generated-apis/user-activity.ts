import { TApiModule } from '../utility/type';

export const userActivityApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/users/activity",
  }
};

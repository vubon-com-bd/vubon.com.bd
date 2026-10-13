import { TApiModule } from '../utility/type';

export const publicProfileApi: TApiModule = {
  "get": {
    endpoint: "get",
    method: "GET",
    path: "/public/profiles/:userId",
    extra: [
      { insertAfter: 'profiles', valueKey: 'userId' }
    ],
  }
};

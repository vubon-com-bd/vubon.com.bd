import { TApiModule } from '../utility/type';

export const authSessionApi: TApiModule = {
  "getById": {
    endpoint: "getById",
    method: "GET",
    path: "/auth/sessions/:id",
    extra: [
      { insertAfter: 'sessions', valueKey: 'id' }
    ],
  },

  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/sessions",
  },

  "revoke": {
    endpoint: "revoke",
    method: "DELETE",
    path: "/auth/sessions/:id",
    extra: [
      { insertAfter: 'sessions', valueKey: 'id' }
    ],
  }
};

import { TApiModule } from '../utility/type';

export const authDeviceApi: TApiModule = {
  "getById": {
    endpoint: "getById",
    method: "GET",
    path: "/auth/devices/:id",
    extra: [
      { insertAfter: 'devices', valueKey: 'id' }
    ],
  },

  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/devices",
  },

  "remove": {
    endpoint: "remove",
    method: "DELETE",
    path: "/auth/devices/:id",
    extra: [
      { insertAfter: 'devices', valueKey: 'id' }
    ],
  },

  "trust": {
    endpoint: "trust",
    method: "POST",
    path: "/auth/devices/:id/trust",
    extra: [
      { insertAfter: 'devices', valueKey: 'id' }
    ],
  }
};

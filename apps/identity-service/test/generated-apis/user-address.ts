import { TApiModule } from '../utility/type';
import { AddAddressHttpDTODtoPayload, UpdateAddressHttpDTODtoPayload } from '../generated-payloads';

export const userAddressApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/users/addresses",
  },

  "getById": {
    endpoint: "getById",
    method: "GET",
    path: "/users/addresses/:id",
    extra: [
      { insertAfter: 'addresses', valueKey: 'id' }
    ],
  },

  "add": {
    endpoint: "add",
    method: "POST",
    path: "/users/addresses",
    payload: () => AddAddressHttpDTODtoPayload,
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/addresses/:id",
    payload: () => UpdateAddressHttpDTODtoPayload,
    extra: [
      { insertAfter: 'addresses', valueKey: 'id' }
    ],
  },

  "delete": {
    endpoint: "delete",
    method: "DELETE",
    path: "/users/addresses/:id",
    extra: [
      { insertAfter: 'addresses', valueKey: 'id' }
    ],
  }
};

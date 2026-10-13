import { TApiModule } from '../utility/type';
import { AddContactHttpDTODtoPayload, UpdateContactHttpDTODtoPayload, VerifyContactHttpDTODtoPayload } from '../generated-payloads';

export const userContactApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/users/contacts",
  },

  "add": {
    endpoint: "add",
    method: "POST",
    path: "/users/contacts",
    payload: () => AddContactHttpDTODtoPayload,
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/contacts/:id",
    payload: () => UpdateContactHttpDTODtoPayload,
    extra: [
      { insertAfter: 'contacts', valueKey: 'id' }
    ],
  },

  "remove": {
    endpoint: "remove",
    method: "DELETE",
    path: "/users/contacts/:id",
    extra: [
      { insertAfter: 'contacts', valueKey: 'id' }
    ],
  },

  "verify": {
    endpoint: "verify",
    method: "POST",
    path: "/users/contacts/:id/verify",
    payload: () => VerifyContactHttpDTODtoPayload,
    extra: [
      { insertAfter: 'contacts', valueKey: 'id' }
    ],
  }
};

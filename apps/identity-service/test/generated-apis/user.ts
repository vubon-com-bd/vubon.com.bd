import { TApiModule } from '../utility/type';
import { CreateUserHttpDTODtoPayload, UpdateUserHttpDTODtoPayload, DeleteUserHttpDTODtoPayload, ActivateUserHttpDTODtoPayload, DeactivateUserHttpDTODtoPayload, SuspendUserHttpDTODtoPayload, UnsuspendUserHttpDTODtoPayload } from '../generated-payloads';

export const userApi: TApiModule = {
  "create": {
    endpoint: "create",
    method: "POST",
    path: "/users",
    payload: () => CreateUserHttpDTODtoPayload,
  },

  "list": {
    endpoint: "list",
    method: "GET",
    path: "/users",
  },

  "getById": {
    endpoint: "getById",
    method: "GET",
    path: "/users/:id",
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/:id",
    payload: () => UpdateUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "delete": {
    endpoint: "delete",
    method: "DELETE",
    path: "/users/:id",
    payload: () => DeleteUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "activate": {
    endpoint: "activate",
    method: "POST",
    path: "/users/:id/activate",
    payload: () => ActivateUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "deactivate": {
    endpoint: "deactivate",
    method: "POST",
    path: "/users/:id/deactivate",
    payload: () => DeactivateUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "suspend": {
    endpoint: "suspend",
    method: "POST",
    path: "/users/:id/suspend",
    payload: () => SuspendUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  },

  "unsuspend": {
    endpoint: "unsuspend",
    method: "POST",
    path: "/users/:id/unsuspend",
    payload: () => UnsuspendUserHttpDTODtoPayload,
    extra: [
      { insertAfter: 'users', valueKey: 'id' }
    ],
  }
};

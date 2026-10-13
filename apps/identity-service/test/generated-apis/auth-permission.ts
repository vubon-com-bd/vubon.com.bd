import { TApiModule } from '../utility/type';
import { AssignPermissionHttpDTODtoPayload, RevokePermissionHttpDTODtoPayload } from '../generated-payloads';

export const authPermissionApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/permissions",
  },

  "assign": {
    endpoint: "assign",
    method: "POST",
    path: "/auth/permissions/assign",
    payload: () => AssignPermissionHttpDTODtoPayload,
  },

  "revoke": {
    endpoint: "revoke",
    method: "POST",
    path: "/auth/permissions/revoke",
    payload: () => RevokePermissionHttpDTODtoPayload,
  }
};

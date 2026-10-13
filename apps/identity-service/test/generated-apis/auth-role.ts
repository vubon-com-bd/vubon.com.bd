import { TApiModule } from '../utility/type';
import { AssignRoleHttpDTODtoPayload, RevokeRoleHttpDTODtoPayload } from '../generated-payloads';

export const authRoleApi: TApiModule = {
  "list": {
    endpoint: "list",
    method: "GET",
    path: "/auth/roles",
  },

  "assign": {
    endpoint: "assign",
    method: "POST",
    path: "/auth/roles/assign",
    payload: () => AssignRoleHttpDTODtoPayload,
  },

  "revoke": {
    endpoint: "revoke",
    method: "POST",
    path: "/auth/roles/revoke",
    payload: () => RevokeRoleHttpDTODtoPayload,
  }
};

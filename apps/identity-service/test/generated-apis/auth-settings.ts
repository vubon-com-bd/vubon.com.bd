import { TApiModule } from '../utility/type';
import { UpdateAuthSettingsHttpDTODtoPayload } from '../generated-payloads';

export const authSettingsApi: TApiModule = {
  "get": {
    endpoint: "get",
    method: "GET",
    path: "/auth/settings",
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/auth/settings",
    payload: () => UpdateAuthSettingsHttpDTODtoPayload,
  }
};

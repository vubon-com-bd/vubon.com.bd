import { TApiModule } from '../utility/type';
import { UpdateSettingsHttpDTODtoPayload } from '../generated-payloads';

export const userSettingsApi: TApiModule = {
  "get": {
    endpoint: "get",
    method: "GET",
    path: "/users/settings",
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/settings",
    payload: () => UpdateSettingsHttpDTODtoPayload,
  }
};

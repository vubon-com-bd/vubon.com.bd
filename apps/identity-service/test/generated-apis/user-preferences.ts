import { TApiModule } from '../utility/type';
import { UpdatePreferencesHttpDTODtoPayload, ResetPreferencesHttpDTODtoPayload } from '../generated-payloads';

export const userPreferencesApi: TApiModule = {
  "get": {
    endpoint: "get",
    method: "GET",
    path: "/users/preferences",
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/preferences",
    payload: () => UpdatePreferencesHttpDTODtoPayload,
  },

  "reset": {
    endpoint: "reset",
    method: "POST",
    path: "/users/preferences/reset",
    payload: () => ResetPreferencesHttpDTODtoPayload,
  }
};

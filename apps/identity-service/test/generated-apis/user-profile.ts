import { TApiModule } from '../utility/type';
import { UpdateProfileHttpDTODtoPayload } from '../generated-payloads';

export const userProfileApi: TApiModule = {
  "get": {
    endpoint: "get",
    method: "GET",
    path: "/users/profile",
  },

  "update": {
    endpoint: "update",
    method: "PUT",
    path: "/users/profile",
    payload: () => UpdateProfileHttpDTODtoPayload,
  }
};

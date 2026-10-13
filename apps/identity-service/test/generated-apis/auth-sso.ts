import { TApiModule } from '../utility/type';
import { SsoLoginHttpDTODtoPayload, SsoCallbackHttpDTODtoPayload } from '../generated-payloads';

export const authSsoApi: TApiModule = {
  "login": {
    endpoint: "login",
    method: "POST",
    path: "/auth/sso/login",
    payload: () => SsoLoginHttpDTODtoPayload,
  },

  "callback": {
    endpoint: "callback",
    method: "POST",
    path: "/auth/sso/callback",
    payload: () => SsoCallbackHttpDTODtoPayload,
  }
};

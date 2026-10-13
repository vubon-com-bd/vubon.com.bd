import { TApiModule } from '../utility/type';
import { SocialLoginHttpDTODtoPayload, LinkSocialHttpDTODtoPayload, UnlinkSocialHttpDTODtoPayload } from '../generated-payloads';

export const authSocialApi: TApiModule = {
  "login": {
    endpoint: "login",
    method: "POST",
    path: "/auth/social/login",
    payload: () => SocialLoginHttpDTODtoPayload,
  },

  "link": {
    endpoint: "link",
    method: "POST",
    path: "/auth/social/link",
    payload: () => LinkSocialHttpDTODtoPayload,
  },

  "unlink": {
    endpoint: "unlink",
    method: "POST",
    path: "/auth/social/unlink",
    payload: () => UnlinkSocialHttpDTODtoPayload,
  }
};

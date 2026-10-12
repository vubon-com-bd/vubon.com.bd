import {
  SocialLoginHandler,
  SocialCallbackHandler,
  LinkSocialHandler,
  UnlinkSocialHandler,
} from '../../../application/commands/auth/index.js';

export const SOCIAL_COMMAND_HANDLERS = [
  SocialLoginHandler,
  SocialCallbackHandler,
  LinkSocialHandler,
  UnlinkSocialHandler,
] as const;

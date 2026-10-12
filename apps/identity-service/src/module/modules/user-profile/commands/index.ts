import {
  UpdateProfileHandler,
  UpdateAvatarHandler,
  UpdateBioHandler,
  UpdateVisibilityHandler,
} from '../../../application/commands/index.js';

export const USER_PROFILE_COMMAND_HANDLERS = [
  UpdateProfileHandler,
  UpdateAvatarHandler,
  UpdateBioHandler,
  UpdateVisibilityHandler,
] as const;

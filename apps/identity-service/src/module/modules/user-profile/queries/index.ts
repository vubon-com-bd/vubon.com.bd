import {
  GetUserProfileHandler,
} from '../../../application/queries/index.js';

export const USER_PROFILE_QUERY_HANDLERS = [
  GetUserProfileHandler,
] as const;

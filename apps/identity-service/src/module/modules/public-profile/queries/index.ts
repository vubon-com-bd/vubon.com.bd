import { GetProfilePublicHandler } from '../../../application/queries/index.js';

export const PUBLIC_PROFILE_QUERY_HANDLERS = [
  GetProfilePublicHandler,
] as const;

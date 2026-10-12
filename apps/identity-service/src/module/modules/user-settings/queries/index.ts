import { GetUserSettingsHandler } from '../../../application/queries/index.js';

export const USER_SETTINGS_QUERY_HANDLERS = [
  GetUserSettingsHandler,
] as const;

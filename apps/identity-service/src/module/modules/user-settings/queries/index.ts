import { GetUserSettingsNewHandler } from '../../../application/queries/settings/get-user-settings.handler.js';

export const USER_SETTINGS_QUERY_HANDLERS = [
  GetUserSettingsNewHandler,
] as const;

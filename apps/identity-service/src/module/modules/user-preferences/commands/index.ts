import {
  UpdatePreferencesHandler,
  ResetPreferencesHandler,
} from '../../../application/commands/index.js';

export const USER_PREFERENCES_COMMAND_HANDLERS = [
  UpdatePreferencesHandler,
  ResetPreferencesHandler,
] as const;

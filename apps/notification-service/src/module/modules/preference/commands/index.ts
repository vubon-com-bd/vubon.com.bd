/**
 * Preference Command Handlers Barrel
 * @module notification-service/modules/preference/commands
 */
import { UpdatePreferenceHandler } from '@application/commands/preference/update-preference.handler.js';
import { BulkUpdatePreferenceHandler } from '@application/commands/preference/bulk-update-preference.handler.js';
import { UnsubscribeHandler } from '@application/commands/preference/unsubscribe.handler.js';

export const PREFERENCE_COMMAND_HANDLERS = [
  UpdatePreferenceHandler,
  BulkUpdatePreferenceHandler,
  UnsubscribeHandler,
] as const;

export {
  UpdatePreferenceHandler,
  BulkUpdatePreferenceHandler,
  UnsubscribeHandler,
};

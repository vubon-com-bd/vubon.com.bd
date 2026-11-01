/**
 * Preference Query Handlers Barrel
 * @module notification-service/modules/preference/queries
 */
import { GetPreferenceHandler } from '@application/queries/preference/get-preference.handler.js';
import { GetPreferenceMatrixHandler } from '@application/queries/preference/get-preference-matrix.handler.js';
import { GetPreferenceDefaultsHandler } from '@application/queries/preference/get-preference-defaults.handler.js';

export const PREFERENCE_QUERY_HANDLERS = [
  GetPreferenceHandler,
  GetPreferenceMatrixHandler,
  GetPreferenceDefaultsHandler,
] as const;

export {
  GetPreferenceHandler,
  GetPreferenceMatrixHandler,
  GetPreferenceDefaultsHandler,
};

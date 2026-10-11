// queries/preference/index.ts
export * from './get-preference.query.js';
export * from './get-preference.handler.js';
export * from './get-preference-public.query.js';
export * from './get-preference-public.handler.js';

import { GetPreferenceHandler } from './get-preference.handler.js';
import { GetPreferencePublicHandler } from './get-preference-public.handler.js';

export const PREFERENCE_QUERY_HANDLERS = [
  GetPreferenceHandler,
  GetPreferencePublicHandler,
] as const;

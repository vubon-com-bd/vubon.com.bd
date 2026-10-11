// commands/preference/index.ts
export * from './update-preference.command.js';
export * from './update-preference.handler.js';
export * from './toggle-channel.command.js';
export * from './toggle-channel.handler.js';
export * from './toggle-category.command.js';
export * from './toggle-category.handler.js';
export * from './update-quiet-hours.command.js';
export * from './update-quiet-hours.handler.js';
export * from './opt-out.command.js';
export * from './opt-out.handler.js';
export * from './opt-in.command.js';
export * from './opt-in.handler.js';

import { UpdatePreferenceHandler } from './update-preference.handler.js';
import { ToggleChannelHandler } from './toggle-channel.handler.js';
import { ToggleCategoryHandler } from './toggle-category.handler.js';
import { UpdateQuietHoursHandler } from './update-quiet-hours.handler.js';
import { OptOutHandler } from './opt-out.handler.js';
import { OptInHandler } from './opt-in.handler.js';

export const PREFERENCE_COMMAND_HANDLERS = [
  UpdatePreferenceHandler,
  ToggleChannelHandler,
  ToggleCategoryHandler,
  UpdateQuietHoursHandler,
  OptOutHandler,
  OptInHandler,
] as const;

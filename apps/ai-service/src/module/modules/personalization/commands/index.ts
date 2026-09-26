import { BuildProfileHandler } from '../../../application/commands/personalization/build-profile.handler';
import { UpdateProfileHandler } from '../../../application/commands/personalization/update-profile.handler';
import { ApplyPersonalizationHandler } from '../../../application/commands/personalization/apply-personalization.handler';

export const PersonalizationCommandHandlers = [
  BuildProfileHandler,
  UpdateProfileHandler,
  ApplyPersonalizationHandler,
];

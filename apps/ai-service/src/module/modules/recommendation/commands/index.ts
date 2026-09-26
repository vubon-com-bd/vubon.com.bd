import { GenerateRecommendationHandler } from '../../../application/commands/recommendation/generate-recommendation.handler';
import { TrackClickHandler } from '../../../application/commands/recommendation/track-click.handler';
import { TrackConversionHandler } from '../../../application/commands/recommendation/track-conversion.handler';
import { SubmitFeedbackHandler } from '../../../application/commands/recommendation/submit-feedback.handler';

export const RecommendationCommandHandlers = [
  GenerateRecommendationHandler,
  TrackClickHandler,
  TrackConversionHandler,
  SubmitFeedbackHandler,
];

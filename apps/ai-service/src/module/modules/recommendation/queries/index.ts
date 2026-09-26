import { GetRecommendationHandler } from '../../../application/queries/recommendation/get-recommendation.handler';
import { ListUserRecommendationsHandler } from '../../../application/queries/recommendation/list-user-recommendations.handler';

export const RecommendationQueryHandlers = [
  GetRecommendationHandler,
  ListUserRecommendationsHandler,
];

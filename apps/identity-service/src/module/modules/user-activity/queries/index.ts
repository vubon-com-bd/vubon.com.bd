import {
  ListUserActivitiesHandler,
  ListActivitiesQueryHandler,
} from '../../../application/queries/index.js';

export const USER_ACTIVITY_QUERY_HANDLERS = [
  ListUserActivitiesHandler,
  ListActivitiesQueryHandler,
] as const;

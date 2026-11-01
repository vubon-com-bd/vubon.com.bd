/**
 * User Core Query Handlers Barrel
 * @module identity-service/modules/user/queries
 */
import {
  GetUserHandler,
  ListUsersHandler,
} from '../../../application/queries/user/index.js';

export const USER_QUERY_HANDLERS = [
  GetUserHandler,
  ListUsersHandler,
] as const;

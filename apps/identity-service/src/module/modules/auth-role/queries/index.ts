import {
  ListAuthRolesHandler,
  ListAuthPermissionsHandler,
} from '../../../application/queries/auth/index.js';

export const ROLE_QUERY_HANDLERS = [
  ListAuthRolesHandler,
  ListAuthPermissionsHandler,
] as const;

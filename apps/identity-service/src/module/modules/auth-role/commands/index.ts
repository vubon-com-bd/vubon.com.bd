import {
  AssignRoleHandler,
  RevokeRoleHandler,
  AssignPermissionHandler,
  RevokePermissionHandler,
} from '../../../application/commands/user/index.js';

export const ROLE_COMMAND_HANDLERS = [
  AssignRoleHandler,
  RevokeRoleHandler,
  AssignPermissionHandler,
  RevokePermissionHandler,
] as const;

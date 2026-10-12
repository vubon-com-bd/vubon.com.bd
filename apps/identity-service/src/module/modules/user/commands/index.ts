/**
 * User Core Command Handlers Barrel
 * @module identity-service/modules/user/commands
 */
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
} from '../../../application/commands/user/index.js';

export const USER_COMMAND_HANDLERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
] as const;

/**
 * UserModule — Core User CRUD only
 * @module identity-service/modules/user
 *
 * Note: user sub-entities (profile, settings, preferences, address, contact,
 * kyc, activity) are handled by their own feature modules. This module ONLY
 * handles UserEntity itself + core CRUD operations.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controller — core user CRUD only
import { UserController } from '../../interfaces/controllers/rest/user.controller.js';

// Core user handlers only
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
} from '../../application/commands/user/index.js';

import {
  GetUserHandler,
  ListUsersHandler,
} from '../../application/queries/user/index.js';

// Application services
import { UserService } from '../../application/services/impl/user.service.js';
import { USER_SERVICE } from '../../application/services/interfaces/user.service.interface.js';

const CORE_USER_COMMAND_HANDLERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  ActivateUserHandler,
  DeactivateUserHandler,
  SuspendUserHandler,
  UnsuspendUserHandler,
] as const;

const CORE_USER_QUERY_HANDLERS = [
  GetUserHandler,
  ListUsersHandler,
] as const;

const SERVICES = [
  UserService,
  { provide: USER_SERVICE, useExisting: UserService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    ...SERVICES,
    ...(CORE_USER_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CORE_USER_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class UserModule {}

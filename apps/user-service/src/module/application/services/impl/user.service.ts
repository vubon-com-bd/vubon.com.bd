/**
 * UserService — orchestrates CommandBus + QueryBus
 * @module user-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserServiceInterface } from '../interfaces/user.service.interface.js';
import { CreateUserCommand } from '../../commands/user/create-user.command.js';
import { UpdateUserCommand } from '../../commands/user/update-user.command.js';
import { DeleteUserCommand } from '../../commands/user/delete-user.command.js';
import { ActivateUserCommand } from '../../commands/user/activate-user.command.js';
import { DeactivateUserCommand } from '../../commands/user/deactivate-user.command.js';
import { SuspendUserCommand } from '../../commands/user/suspend-user.command.js';
import { UnsuspendUserCommand } from '../../commands/user/unsuspend-user.command.js';
import { GetUserQuery } from '../../queries/user/get-user.query.js';
import { GetUserByEmailQuery } from '../../queries/user/get-user-by-email.query.js';
import { ListUsersQuery } from '../../queries/user/list-users.query.js';
import { SearchUsersQuery } from '../../queries/user/search-users.query.js';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/index.js';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/index.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import type { ListUsersResult } from '../../queries/user/list-users.handler.js';
import type { SearchUsersResult } from '../../queries/user/search-users.handler.js';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  findById(userId: string): Promise<UserResponseDTO> {
    return this.queryBus.execute(new GetUserQuery(userId));
  }

  findByEmail(email: string): Promise<UserResponseDTO> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  create(input: CreateUserRequestDTO): Promise<UserResponseDTO> {
    return this.commandBus.execute(new CreateUserCommand(input));
  }

  update(userId: string, input: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    return this.commandBus.execute(new UpdateUserCommand(userId, input));
  }

  delete(userId: string, hardDelete = false): Promise<{ success: true }> {
    return this.commandBus.execute(new DeleteUserCommand(userId, undefined, hardDelete));
  }

  activate(userId: string): Promise<UserResponseDTO> {
    return this.commandBus.execute(new ActivateUserCommand(userId));
  }

  deactivate(userId: string, reason?: string): Promise<UserResponseDTO> {
    return this.commandBus.execute(new DeactivateUserCommand(userId, reason));
  }

  suspend(userId: string, reason: string): Promise<UserResponseDTO> {
    return this.commandBus.execute(new SuspendUserCommand(userId, reason));
  }

  unsuspend(userId: string): Promise<UserResponseDTO> {
    return this.commandBus.execute(new UnsuspendUserCommand(userId));
  }

  list(
    page: number,
    limit: number,
    status?: string,
    type?: string,
    search?: string
  ): Promise<ListUsersResult> {
    return this.queryBus.execute(new ListUsersQuery(page, limit, status, type, search));
  }

  search(term: string, page = 1, limit = 20): Promise<SearchUsersResult> {
    return this.queryBus.execute(new SearchUsersQuery(term, page, limit));
  }
}

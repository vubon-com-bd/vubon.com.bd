/**
 * UserServiceInterface
 * @module user-service/application/services/interfaces
 */
import type { CreateUserRequestDTO } from '../../dtos/requests/user/index.js';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/index.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import type {
  ListUsersResult,
} from '../../queries/user/list-users.handler.js';
import type {
  SearchUsersResult,
} from '../../queries/user/search-users.handler.js';

export interface UserServiceInterface {
  findById(userId: string): Promise<UserResponseDTO>;
  findByEmail(email: string): Promise<UserResponseDTO>;
  create(input: CreateUserRequestDTO): Promise<UserResponseDTO>;
  update(userId: string, input: UpdateUserRequestDTO): Promise<UserResponseDTO>;
  delete(userId: string, hardDelete?: boolean): Promise<{ success: true }>;
  activate(userId: string): Promise<UserResponseDTO>;
  deactivate(userId: string, reason?: string): Promise<UserResponseDTO>;
  suspend(userId: string, reason: string): Promise<UserResponseDTO>;
  unsuspend(userId: string): Promise<UserResponseDTO>;
  list(
    page: number,
    limit: number,
    status?: string,
    type?: string,
    search?: string
  ): Promise<ListUsersResult>;
  search(term: string, page?: number, limit?: number): Promise<SearchUsersResult>;
}

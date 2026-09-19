import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserEntity } from '../../../domain/entities/user.entity';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

export interface UserServiceInterface
  extends BaseServiceInterface<UserEntity, string> {
  create(input: CreateUserRequestDTO): Promise<UserResponseDTO>;
  update(userId: string, input: UpdateUserRequestDTO): Promise<UserResponseDTO>;
  delete(userId: string): Promise<void>;
  findById(userId: string): Promise<UserResponseDTO | null>;
}

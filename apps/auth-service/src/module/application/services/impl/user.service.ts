/**
 * UserService — User lifecycle (create/update/delete/status)
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserServiceInterface } from '../interfaces/user.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { PasswordHasherServiceInterface } from '../interfaces/password-hasher.service.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPasswordVO } from '../../../domain/value-objects/primitives/user-password.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import {
  UserNotFoundAppError,
  UserAlreadyExistsAppError,
} from '../../errors/user.errors';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_REPO } from '../../tokens';
import { PASSWORD_HASHER } from '../../tokens';
import { ID_GENERATOR } from '../tokens';

@Injectable()
export class UserService
  extends BaseService<UserEntity, UserId>
  implements UserServiceInterface {
  readonly name = 'UserService';

  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly hasher: PasswordHasherServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async create(input: CreateUserRequestDTO): Promise<UserEntity> {
    const email = UserEmailVO.of(input.email);
    if (await this.userRepo.existsByEmail(email)) {
      throw new UserAlreadyExistsAppError('email', input.email);
    }
    UserPasswordVO.of(input.password, { email: input.email });
    const passwordHash = await this.hasher.hash(input.password);
    const now = new Date().toISOString();
    const displayName =
      [input.firstName, input.lastName].filter(Boolean).join(' ').trim() ||
      'User';

    const entity = UserEntity.create({
      id: this.idGen.generateUuid() as UserId,
      email,
      passwordHash,
      name: UserNameVO.of(displayName),
      phone: input.phone ? UserPhoneVO.of(input.phone) : undefined,
      status: UserStatusVO.of('pending'),
      type: UserTypeVO.of(input.type),
      roles: [],
      emailVerified: false,
      phoneVerified: false,
      createdAt: now,
      updatedAt: now,
    });
    return this.userRepo.save(entity);
  }

  async update(
    userId: UserId,
    input: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundAppError(userId);
    const maybeName = (input as { name?: string }).name;
    if (maybeName) user.changeName(UserNameVO.of(maybeName));
    return this.userRepo.save(user);
  }

  async delete(userId: UserId, _reason?: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundAppError(userId);
    user.changeStatus(UserStatusVO.of('deleted'));
    await this.userRepo.save(user);
  }

  async activate(userId: UserId): Promise<void> {
    await this.transition(userId, 'active');
  }

  async deactivate(userId: UserId, _reason: string): Promise<void> {
    await this.transition(userId, 'inactive');
  }

  async suspend(userId: UserId, _reason: string, _until?: string): Promise<void> {
    await this.transition(userId, 'suspended');
  }

  async unsuspend(userId: UserId): Promise<void> {
    await this.transition(userId, 'active');
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findByEmail(UserEmailVO.of(email));
  }

  toResponse(user: UserEntity): UserResponseDTO {
    return {
      id: user.id,
      email: user.email.value,
      phone: user.phone?.value,
      name: user.name.value,
      status: user.status.value as
        | 'active'
        | 'inactive'
        | 'suspended'
        | 'pending'
        | 'deleted',
      type: user.type.value,
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      mfaEnabled: false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async transition(userId: UserId, status: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundAppError(userId);
    user.changeStatus(UserStatusVO.of(status));
    await this.userRepo.save(user);
  }
}

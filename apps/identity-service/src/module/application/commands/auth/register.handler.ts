/**
 * Register Handler
 * @module identity-service/application/commands/auth
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterCommand } from './register.command.js';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto.js';
import type { AuthRepository } from '../../../domain/repositories/auth.repository.interface.js';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { AuthAlreadyExistsError } from '../../../domain/errors/auth.errors.js';

import { AuthIdVO } from '../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo.js';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo.js';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo.js';

import { AuthEntity } from '../../../domain/entities/auth.entity.js';
import { UserEntity } from '../../../domain/entities/user.entity.js';

@CommandHandler(RegisterCommand)
export class RegisterHandler
  extends BaseCommandHandler<RegisterCommand, RegisterResponseDTO>
  implements ICommandHandler<RegisterCommand>
{
  readonly commandType = 'auth.register';

  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: AuthRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {
    super();
  }

  async execute(command: RegisterCommand): Promise<RegisterResponseDTO> {
    const email = command.input.email.trim().toLowerCase();

    // 1. Check existing
    const existingAuth = await this.authRepo.findByIdentifier(email);
    if (existingAuth) {
      throw new AuthAlreadyExistsError(email);
    }
    const existingUser = await this.userRepo.findByEmailRaw(email);
    if (existingUser) {
      throw new AuthAlreadyExistsError(email);
    }

    const now = new Date().toISOString();
    const userId = UserIdVO.create(crypto.randomUUID());

    // 2. Create UserEntity and SAVE
    const user = UserEntity.create({
      id: userId,
      email: UserEmailVO.create(email),
      type: UserTypeVO.individual(),
      roles: [UserRoleVO.customer()],
      firstName: command.input.firstName
        ? UserNameVO.create(command.input.firstName)
        : undefined,
      lastName: command.input.lastName
        ? UserNameVO.create(command.input.lastName)
        : undefined,
      now,
    });
    await this.userRepo.save(user);

    // 3. Create AuthEntity and SAVE
    const auth = AuthEntity.create({
      id: AuthIdVO.create(crypto.randomUUID()),
      props: {
        userId,
        type: { value: 'password' } as never,
        provider: { value: 'local' } as never,
        method: { value: 'email_password' } as never,
        identifier: { kind: 'email', normalized: email } as never,
      },
      now,
    });
    await this.authRepo.save(auth);

    // 4. Return response
    return {
      success: true,
      user: {
        id: userId.value,
        email,
        firstName: command.input.firstName,
        lastName: command.input.lastName,
        status: 'pending',
        type: 'individual',
        roles: ['customer'],
        emailVerified: false,
        phoneVerified: false,
        isMfaEnabled: false,
        createdAt: now,
      },
      requiresVerification: true,
      verificationChannel: 'email',
      message: 'Registration successful. Please verify your email.',
    };
  }
}

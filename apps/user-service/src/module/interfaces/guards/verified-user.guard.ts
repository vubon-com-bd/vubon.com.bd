/**
 * VerifiedUserGuard — requires email-verified user
 * @module user-service/interfaces/guards
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces';
import {
  USER_REPOSITORY,
} from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

interface AuthedRequest extends Request {
  user?: CurrentUserShape;
}

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const currentUser = request.user;

    if (!currentUser) {
      throw new ForbiddenException('Authentication required');
    }

    const user = await this.userRepo.findById(UserIdVO.create(currentUser.userId).value);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!user.emailVerified) {
      throw new ForbiddenException('Email verification required');
    }

    return true;
  }
}

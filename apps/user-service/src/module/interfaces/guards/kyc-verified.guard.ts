/**
 * KycVerifiedGuard — requires approved KYC
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
  USER_KYC_REPOSITORY,
} from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

interface AuthedRequest extends Request {
  user?: CurrentUserShape;
}

@Injectable()
export class KycVerifiedGuard implements CanActivate {
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const currentUser = request.user;

    if (!currentUser) {
      throw new ForbiddenException('Authentication required');
    }

    const kyc = await this.kycRepo.findByUserId(UserIdVO.create(currentUser.userId));
    if (!kyc || !kyc.isVerified()) {
      throw new ForbiddenException('KYC verification required');
    }

    return true;
  }
}

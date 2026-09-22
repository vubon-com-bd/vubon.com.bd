import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { emailVerified?: boolean } }>();

    if (!request.user?.emailVerified) {
      throw new ForbiddenException('Email verification required');
    }
    return true;
  }
}

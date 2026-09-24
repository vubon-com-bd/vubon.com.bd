import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class ChatOwnerGuard extends BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string } }>();

    if (!request.user?.userId) {
      throw new ForbiddenException('Chat ownership required');
    }
    return true;
  }
}

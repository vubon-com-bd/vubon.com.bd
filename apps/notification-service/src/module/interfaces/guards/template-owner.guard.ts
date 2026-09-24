import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class TemplateOwnerGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string } }>();

    if (!request.user?.userId) {
      throw new ForbiddenException('Authentication required');
    }
    return true;
  }
}

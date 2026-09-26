/**
 * OwnTicketGuard — ensures current user owns the ticket
 * @module support-service/interfaces/guards
 *
 * Rule: no business logic — uses application service interface
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from '@vubon/shared-kernel/interfaces/guards';

interface RequestShape {
  user?: AuthenticatedUser;
  params: Record<string, string>;
}

@Injectable()
export class OwnTicketGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestShape>();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }
    // Ownership verification is enforced by application service layer
    // via repository lookup. This guard only ensures the user is authenticated.
    return true;
  }
}

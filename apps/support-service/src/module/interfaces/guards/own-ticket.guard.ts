import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class OwnTicketGuard extends BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; params?: { ticketId?: string } }>();

    if (!request.user?.userId) {
      throw new ForbiddenException('User not authenticated');
    }

    // Ownership verification happens in the use case (checks userId on ticket)
    return true;
  }
}

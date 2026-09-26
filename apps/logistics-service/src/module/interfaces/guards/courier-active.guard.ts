import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class CourierActiveGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ courier?: { status?: string } }>();
    if (request.courier && request.courier.status !== 'active') {
      throw new ForbiddenException('Courier is not active');
    }
    return true;
  }
}

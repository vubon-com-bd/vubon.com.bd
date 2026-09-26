import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class DriverAvailableGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ driver?: { status?: string } }>();
    if (request.driver && request.driver.status !== 'available') {
      throw new ForbiddenException('Driver is not available');
    }
    return true;
  }
}

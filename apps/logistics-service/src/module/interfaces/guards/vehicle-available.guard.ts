import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class VehicleAvailableGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ vehicle?: { status?: string } }>();
    if (request.vehicle && request.vehicle.status !== 'available') {
      throw new ForbiddenException('Vehicle is not available');
    }
    return true;
  }
}

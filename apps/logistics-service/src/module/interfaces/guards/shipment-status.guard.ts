import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

export const SHIPMENT_STATUS_KEY = 'requiredShipmentStatus';

@Injectable()
export class ShipmentStatusGuard extends BaseGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string>(
      SHIPMENT_STATUS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ shipment?: { status?: string } }>();
    if (request.shipment?.status !== required) {
      throw new ForbiddenException(`Shipment must be in status: ${required}`);
    }
    return true;
  }
}

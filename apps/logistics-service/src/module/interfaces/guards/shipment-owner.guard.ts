/**
 * ShipmentOwnerGuard — resource-level authorization
 * @module logistics-service/interfaces/guards
 *
 * Checks:
 *  - Admin override (ROLE.ADMIN / ROLE.SUPER_ADMIN)
 *  - Ownership (userId OR vendorId matches current user)
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ROLE } from '@vubon/shared-constants/common';
import {
  SHIPMENT_REPOSITORY,
  type ShipmentRepository,
} from '@domain/repositories/shipment.repository.interface.js';

const HTTP_FORBIDDEN = 403;

@Injectable()
export class ShipmentOwnerGuard extends BaseGuard {
  constructor(
    @Inject(SHIPMENT_REPOSITORY)
    private readonly repo: ShipmentRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { sub?: string; userId?: string; roles?: readonly string[] };
    }>();

    const shipmentId = req.params?.['id'] ?? req.params?.['shipmentId'];
    if (!shipmentId) return true;

    const user = req.user;
    const userId = user?.sub ?? user?.userId;
    if (!userId) {
      throw new ForbiddenException({
        statusCode: HTTP_FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user?.roles?.includes(ROLE.ADMIN) ||
      user?.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const entity = await this.repo.findById(shipmentId);
    if (!entity) {
      throw new ForbiddenException({
        statusCode: HTTP_FORBIDDEN,
        message: 'Shipment not found',
      });
    }

    // Shipment entity exposes `userId` and `vendorId` getters
    const shipment = entity as unknown as {
      userId?: string;
      vendorId?: string;
    };
    const matchesUser = shipment.userId === userId;
    const matchesVendor = shipment.vendorId === userId;

    if (!matchesUser && !matchesVendor) {
      throw new ForbiddenException({
        statusCode: HTTP_FORBIDDEN,
        message: 'You do not own this shipment',
      });
    }

    return true;
  }
}

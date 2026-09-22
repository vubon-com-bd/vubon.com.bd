import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import type { VendorRepository } from '../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../domain/value-objects/primitives/vendor-id.vo';

interface RequestWithUser {
  user?: { id?: string; userId?: string };
  params: { id?: string };
}

@Injectable()
export class VendorApprovedGuard extends BaseGuard {
  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const vendorId = request.params.id;
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(VendorIdVO.create(vendorId));
    if (!vendor) throw new ForbiddenException('Vendor not found');

    if (vendor.status.value !== 'active' && vendor.status.value !== 'approved') {
      throw new ForbiddenException('Vendor not approved');
    }
    return true;
  }
}

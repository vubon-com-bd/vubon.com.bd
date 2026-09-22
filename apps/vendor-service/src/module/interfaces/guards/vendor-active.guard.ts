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
  params: { id?: string };
}

@Injectable()
export class VendorActiveGuard extends BaseGuard {
  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const vendorId = request.params.id;
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(VendorIdVO.create(vendorId));
    if (!vendor) throw new ForbiddenException('Vendor not found');

    if (vendor.status.value === 'suspended') {
      throw new ForbiddenException('Vendor suspended');
    }
    return true;
  }
}

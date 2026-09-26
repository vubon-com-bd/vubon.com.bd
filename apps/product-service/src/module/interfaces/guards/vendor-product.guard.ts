import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class VendorProductGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { vendorId?: string } }>();

    if (!request.user?.vendorId) {
      throw new ForbiddenException('Vendor access required');
    }
    return true;
  }
}

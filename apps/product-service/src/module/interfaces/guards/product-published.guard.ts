import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ProductPublishedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ product?: { status?: string } }>();

    const status = request.product?.status;
    if (status && status !== 'published') {
      throw new ForbiddenException('Product must be published');
    }
    return true;
  }
}

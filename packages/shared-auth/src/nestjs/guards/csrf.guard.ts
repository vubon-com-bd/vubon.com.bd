import { Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { verifyCsrf } from '../../server/csrf/csrf-verify.middleware';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      method?: string;
      headers?: Record<string, string | undefined>;
      cookies?: Record<string, string>;
    }>();
    verifyCsrf(req);
    return true;
  }
}

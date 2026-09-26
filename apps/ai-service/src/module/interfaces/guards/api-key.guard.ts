import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class ApiKeyGuard extends BaseGuard implements CanActivate {
  private readonly expectedKey = getOptionalEnv('AI_SERVICE_API_KEY', '');

  canActivate(context: ExecutionContext): boolean {
    if (!this.expectedKey) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | undefined> }>();
    const provided = request.headers['x-api-key'];

    if (provided !== this.expectedKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}

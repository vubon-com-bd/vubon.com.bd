/**
 * BiometricGuard — enforces biometric binding for the current request
 * @module auth-service/interfaces/guards
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BIOMETRIC_REQUIRED_KEY } from '../decorators/biometric-required.decorator';

@Injectable()
export class BiometricGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      BIOMETRIC_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context.switchToHttp().getRequest<{ headers?: Record<string, string> }>();
    const header = request.headers?.['x-biometric-verified'];
    if (header !== 'true') {
      throw new ForbiddenException('Biometric verification required');
    }
    return true;
  }
}

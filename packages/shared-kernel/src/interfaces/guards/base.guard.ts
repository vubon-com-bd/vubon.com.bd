import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  abstract canActivate(context: ExecutionContext): boolean | Promise<boolean>;

  protected getRequest(context: ExecutionContext): Record<string, unknown> {
    return context.switchToHttp().getRequest();
  }

  protected getResponse(context: ExecutionContext): Record<string, unknown> {
    return context.switchToHttp().getResponse();
  }

  protected getNext(context: ExecutionContext): () => void {
    return context.switchToHttp().getNext();
  }
}

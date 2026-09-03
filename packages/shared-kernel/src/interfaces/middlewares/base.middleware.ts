import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export abstract class BaseMiddleware implements NestMiddleware {
  abstract use(req: Request, res: Response, next: NextFunction): void;

  protected getRequestId(req: Request): string {
    return (req.headers['x-request-id'] as string) || 'unknown';
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

interface UtmRequest extends Request {
  utm?: {
    readonly source?: string;
    readonly medium?: string;
    readonly campaign?: string;
    readonly term?: string;
    readonly content?: string;
  };
}

@Injectable()
export class UtmMiddleware implements NestMiddleware {
  use(req: UtmRequest, _res: Response, next: NextFunction): void {
    const query = req.query as Record<string, string | undefined>;
    req.utm = {
      source: query['utm_source'],
      medium: query['utm_medium'],
      campaign: query['utm_campaign'],
      term: query['utm_term'],
      content: query['utm_content'],
    };
    next();
  }
}

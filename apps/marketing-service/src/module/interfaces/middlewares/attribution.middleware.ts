import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

interface AttributionRequest extends Request {
  attribution?: {
    readonly utmSource?: string;
    readonly utmMedium?: string;
    readonly utmCampaign?: string;
    readonly referrer?: string;
    readonly ip?: string;
    readonly userAgent?: string;
    readonly capturedAt: string;
  };
}

@Injectable()
export class AttributionMiddleware implements NestMiddleware {
  use(req: AttributionRequest, _res: Response, next: NextFunction): void {
    const query = req.query as Record<string, string | undefined>;
    req.attribution = {
      utmSource: query['utm_source'],
      utmMedium: query['utm_medium'],
      utmCampaign: query['utm_campaign'],
      referrer: req.headers.referer,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      capturedAt: new Date().toISOString(),
    };
    next();
  }
}

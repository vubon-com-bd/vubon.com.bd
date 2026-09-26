import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

interface AffiliateRequest extends Request {
  affiliateTracking?: {
    readonly ref?: string;
    readonly affiliateId?: string;
    readonly capturedAt: string;
  };
}

@Injectable()
export class AffiliateTrackerMiddleware implements NestMiddleware {
  use(req: AffiliateRequest, _res: Response, next: NextFunction): void {
    const query = req.query as Record<string, string | undefined>;
    const ref = query['ref'] ?? query['affiliate'];
    if (ref) {
      req.affiliateTracking = {
        ref,
        affiliateId: ref,
        capturedAt: new Date().toISOString(),
      };
    }
    next();
  }
}

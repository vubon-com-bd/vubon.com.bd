import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const requestId = req.headers['x-request-id'] || 'unknown';

    this.logger.log(`[${requestId}] ${method} ${originalUrl} - Started`);

    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      this.logger.log(
        `[${requestId}] ${method} ${originalUrl} - ${statusCode} - ${duration}ms - ${userAgent} ${ip}`
      );
    });

    next();
  }
}

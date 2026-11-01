import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';
import { getJwtSecret } from '../../server/jwt/jwt-secret';
import { JwtService } from '../../server/jwt/jwt.service';

/**
 * Wraps @nestjs/jwt with our secure defaults (from shared-config).
 * Exposes our own JwtService — do NOT inject @nestjs/jwt's directly.
 */
@Module({
  imports: [
    NestJwtModule.register({
      secret: getJwtSecret(),
      signOptions: {
        algorithm: JWT_CONFIG.algorithm as never,
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}

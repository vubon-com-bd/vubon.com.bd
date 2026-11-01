/**
 * AuthModule — JWT authentication for payment-service
 * @module payment-service/modules/auth
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getOptionalEnv } from '@vubon/shared-config/common';
import { JwtStrategy } from '../../infrastructure/security/jwt.strategy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: getOptionalEnv('JWT_SECRET', 'dev-jwt-secret-change-in-prod'),
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}

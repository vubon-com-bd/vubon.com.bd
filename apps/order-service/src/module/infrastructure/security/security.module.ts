/**
 * SecurityModule — Passport JWT + strategy
 * @module order-service/infrastructure/security
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class SecurityModule {}

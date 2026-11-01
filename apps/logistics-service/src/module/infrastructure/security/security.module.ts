/**
 * SecurityModule — JWT strategy wiring (@Global)
 * @module logistics-service/infrastructure/security
 *
 * ⚠️ @Global() — JwtAuthGuard DI needs PassportModule + JwtStrategy everywhere
 * ⚠️ FORCE-INSTANTIATE JwtStrategy — NestJS lazy instantiate otherwise
 *    (PassportStrategy auto-registers on construction — must ensure constructor runs)
 */
import { Global, Module, OnModuleInit, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { JwtStrategy } from './jwt.strategy.js';

const ttl = (process.env['JWT_ACCESS_TOKEN_TTL'] ?? '15m') as StringValue;

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: ttl },
    }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class SecurityModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit(): void {
    // Force instantiate JwtStrategy — this triggers PassportStrategy constructor
    // which registers the strategy globally with passport.use()
    try {
      this.moduleRef.get(JwtStrategy, { strict: false });
      // eslint-disable-next-line no-console
      console.log('[SecurityModule] ✅ JwtStrategy instantiated — passport strategy registered');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[SecurityModule] ❌ Failed to instantiate JwtStrategy:', err);
    }
  }
}

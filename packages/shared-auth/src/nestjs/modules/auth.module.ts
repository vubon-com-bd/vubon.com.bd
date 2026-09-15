import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RolesGuard } from '../guards/roles.guard';
import { MfaGuard } from '../guards/mfa.guard';
import { VerifiedGuard } from '../guards/verified.guard';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { RefreshStrategy } from '../strategies/refresh.strategy';

/**
 * Base auth module — imports PassportModule, registers JWT strategies
 * and global guards (JwtAuthGuard + RolesGuard + PermissionsGuard).
 *
 * Apps should extend/compose this module with their own
 * service providers.
 */
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    JwtStrategy,
    RefreshStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
    { provide: APP_GUARD, useClass: MfaGuard },
    { provide: APP_GUARD, useClass: VerifiedGuard },
  ],
  exports: [PassportModule],
})
export class AuthModule {}

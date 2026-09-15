import { Module } from '@nestjs/common';
import { RbacModule } from './rbac.module';
import { JwtModule } from './jwt.module';

/**
 * User module — placeholder for app-specific user services.
 * Import RbacModule + JwtModule so user providers can inject them.
 */
@Module({
  imports: [JwtModule, RbacModule],
  providers: [],
  exports: [],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Auth2FaController } from '../../interfaces/controllers/rest/auth-2fa.controller';
import { Auth2FaService } from '../../application/services/impl/auth-2fa.service';
import { Auth2FaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-2fa.prisma.repository';
import { AUTH_2FA_REPO } from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_2FA_REPO, useExisting: Auth2FaPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [Auth2FaController],
  providers: [Auth2FaService, Auth2FaPrismaRepository, ...TOKEN_BINDINGS],
  exports: [Auth2FaService, Auth2FaPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class Auth2FaModule {}

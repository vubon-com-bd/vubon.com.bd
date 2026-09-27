import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthOAuthController } from '../../interfaces/controllers/rest/auth-oauth.controller.js';
import { AuthOAuthPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-oauth.prisma.repository.js';
import { AUTH_OAUTH_REPO } from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_OAUTH_REPO, useExisting: AuthOAuthPrismaRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthOAuthController],
  providers: [AuthOAuthPrismaRepository, ...TOKEN_BINDINGS],
  exports: [AuthOAuthPrismaRepository, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class AuthOAuthModule {}

/**
 * Auth Module
 * Registers all authentication-related classes
 * Controllers, Services, Repositories, Adapters, and Handlers
 */

import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Controllers
import { AuthController } from '../../interfaces/controllers/auth.controller.js';

// Services
import { AuthServiceImpl } from '../../application/services/impl/auth.service.impl.js';

// Repositories
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';

// Adapters
import { PasswordHasherAdapter } from '../../infrastructure/adapters/password-hasher.adapter.js';
import { EmailValidatorAdapter } from '../../infrastructure/adapters/email-validator.adapter.js';
import { TokenGeneratorAdapter } from '../../infrastructure/adapters/token-generator.adapter.js';
import { NotificationSenderAdapter } from '../../infrastructure/adapters/notification-sender.adapter.js';

// Command Handlers
import { RegisterUserHandler } from '../../application/commands/auth/register-user.handler.js';

// Event Handlers
import { SendWelcomeEmailHandler } from '../../application/event-handlers/send-welcome-email.handler.js';
import { LogRegistrationActivityHandler } from '../../application/event-handlers/log-registration-activity.handler.js';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Services
    {
      provide: 'IAuthService',
      useClass: AuthServiceImpl,
    },
    AuthServiceImpl,

    // Repositories
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    UserPrismaRepository,

    // Adapters
    {
      provide: 'IPasswordHasher',
      useClass: PasswordHasherAdapter,
    },
    PasswordHasherAdapter,

    {
      provide: 'IEmailValidator',
      useClass: EmailValidatorAdapter,
    },
    EmailValidatorAdapter,

    {
      provide: 'ITokenGenerator',
      useClass: TokenGeneratorAdapter,
    },
    TokenGeneratorAdapter,

    {
      provide: 'INotificationSender',
      useClass: NotificationSenderAdapter,
    },
    NotificationSenderAdapter,

    // Command Handlers
    RegisterUserHandler,

    // Event Handlers
    SendWelcomeEmailHandler,
    LogRegistrationActivityHandler,
  ],
  exports: [
    'IAuthService',
    'IUserRepository',
    'IPasswordHasher',
    'IEmailValidator',
    'ITokenGenerator',
    'INotificationSender',
  ],
})
export class AuthModule {}

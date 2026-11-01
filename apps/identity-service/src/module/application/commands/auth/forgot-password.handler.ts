import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ForgotPasswordCommand } from './forgot-password.command.js';
import type { AuthRepository } from '../../../domain/repositories/auth.repository.interface.js';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';

export interface ForgotPasswordResponse { readonly success: true; readonly message: string; }

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  extends BaseCommandHandler<ForgotPasswordCommand, ForgotPasswordResponse>
  implements ICommandHandler<ForgotPasswordCommand>
{
  readonly commandType = 'auth.forgot-password';
  constructor(@Inject(AUTH_REPOSITORY) private readonly authRepo: AuthRepository) { super(); }
  async execute(_command: ForgotPasswordCommand): Promise<ForgotPasswordResponse> {
    return { success: true, message: 'If email exists, reset link has been sent' };
  }
}

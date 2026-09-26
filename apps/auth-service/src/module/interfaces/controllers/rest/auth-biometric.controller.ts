/**
 * AuthBiometricController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { EnableBiometricCommand } from '../../../application/commands/auth/enable-biometric.command';
import { DisableBiometricCommand } from '../../../application/commands/auth/disable-biometric.command';
import { VerifyBiometricCommand } from '../../../application/commands/auth/verify-biometric.command';
import {
  EnableBiometricRequestDTO,
  DisableBiometricRequestDTO,
  VerifyBiometricRequestDTO,
} from '../../dtos/requests/biometric.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Biometric')
@Controller('auth/biometric')
export class AuthBiometricController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post('enable')
  @HttpCode(HttpStatus.OK)
  async enable(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: EnableBiometricRequestDTO,
  ) {
    return this.commandBus.execute(
      new EnableBiometricCommand(user.id as UserId, body),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: DisableBiometricRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new DisableBiometricCommand(user.id as UserId, body),
    );
  }

  @Public()
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() body: VerifyBiometricRequestDTO): Promise<{ verified: boolean }> {
    const ok = await this.commandBus.execute<VerifyBiometricCommand, boolean>(
      new VerifyBiometricCommand(body),
    );
    return { verified: ok };
  }
}

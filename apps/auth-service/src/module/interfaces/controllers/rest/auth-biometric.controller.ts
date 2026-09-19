import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { EnableBiometricCommand } from '../../../application/commands/auth/enable-biometric.command';
import { DisableBiometricCommand } from '../../../application/commands/auth/disable-biometric.command';
import { VerifyBiometricCommand } from '../../../application/commands/auth/verify-biometric.command';
import {
  BiometricEnrollRequestDTO,
  BiometricVerifyRequestDTO,
} from '../../dtos/requests/biometric.request.dto';

@ApiTags('Biometric')
@Controller('auth/biometric')
@UseGuards(JwtAuthGuard)
export class AuthBiometricController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('enroll')
  async enroll(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: BiometricEnrollRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new EnableBiometricCommand(user.userId, body.biometricId, body.type),
    );
  }

  @Delete('disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(@CurrentUser() user: CurrentUserShape): Promise<void> {
    return this.commandBus.execute(new DisableBiometricCommand(user.userId));
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: BiometricVerifyRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new VerifyBiometricCommand(user.userId, body.biometricId),
    );
  }
}

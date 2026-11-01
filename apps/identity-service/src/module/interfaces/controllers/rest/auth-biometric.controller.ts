/**
 * AuthBiometricController — REST endpoints for biometric
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { EnableBiometricCommand } from '../../../application/commands/auth/enable-biometric.command.js';
import { DisableBiometricCommand } from '../../../application/commands/auth/disable-biometric.command.js';
import { VerifyBiometricCommand } from '../../../application/commands/auth/verify-biometric.command.js';

import { EnableBiometricHttpDTO } from '../../dtos/requests/auth/enable-biometric.request.dto.js';
import { DisableBiometricHttpDTO } from '../../dtos/requests/auth/disable-biometric.request.dto.js';
import { VerifyBiometricHttpDTO } from '../../dtos/requests/auth/verify-biometric.request.dto.js';

import type { BiometricHttpResponseDTO } from '../../dtos/responses/biometric/biometric.response.dto.js';

import { AuthBiometricControllerMapper } from '../../mappers/auth-biometric.controller.mapper.js';

@ApiTags('auth-biometric')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/biometric')
export class AuthBiometricController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('enable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enable biometric authentication' })
  async enable(
    @Body() dto: EnableBiometricHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BiometricHttpResponseDTO> {
    const appDto = AuthBiometricControllerMapper.toEnableAppDto(dto);
    const result = await this.commandBus.execute(
      new EnableBiometricCommand(user.userId, appDto as never),
    );
    return AuthBiometricControllerMapper.toHttpResponse(result.enabled, undefined, dto.type);
  }

  @Post('disable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disable biometric authentication' })
  async disable(
    @Body() dto: DisableBiometricHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BiometricHttpResponseDTO> {
    const appDto = AuthBiometricControllerMapper.toDisableAppDto(dto);
    await this.commandBus.execute(new DisableBiometricCommand(user.userId, appDto as never));
    return AuthBiometricControllerMapper.toHttpResponse(false);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify biometric authentication' })
  async verify(
    @Body() dto: VerifyBiometricHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; verified: boolean }> {
    const appDto = AuthBiometricControllerMapper.toVerifyAppDto(dto);
    return this.commandBus.execute(new VerifyBiometricCommand(user.userId, appDto as never));
  }
}

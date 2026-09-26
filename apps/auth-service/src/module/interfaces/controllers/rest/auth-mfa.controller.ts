/**
 * AuthMfaController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Get, Post, Delete, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { EnableMfaCommand } from '../../../application/commands/auth/enable-mfa.command';
import { DisableMfaCommand } from '../../../application/commands/auth/disable-mfa.command';
import { VerifyMfaCommand } from '../../../application/commands/auth/verify-mfa.command';
import { GetAuthMfaSettingsQuery } from '../../../application/queries/auth/get-auth-mfa-settings.query';
import type { MfaResponseDTO } from '../../../application/dtos/responses/mfa-response.dto';
import type { UserId } from '@vubon/shared-types/common';

import {
  EnableMfaRequestDTO,
  DisableMfaRequestDTO,
  VerifyMfaRequestDTO,
} from '../../dtos/requests/mfa.request.dto';
import { MfaControllerMapper } from '../../mappers/mfa.controller.mapper';
import { MfaSwagger } from '../../swagger/mfa.swagger';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth MFA')
@Controller('auth/mfa')
@UseGuards(JwtAuthGuard)
export class AuthMfaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: MfaControllerMapper,
  ) {}

  @Post('enable')
  @HttpCode(HttpStatus.OK)
  @MfaSwagger.Enable()
  async enable(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: EnableMfaRequestDTO,
  ) {
    return this.commandBus.execute(
      new EnableMfaCommand(user.id as UserId, {
        type: body.type,
        password: body.password,
        phone: body.phone,
      } as never),
    );
  }

  @Delete('disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  @MfaSwagger.Disable()
  async disable(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: DisableMfaRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new DisableMfaCommand(user.id as UserId, {
        password: body.password,
        code: body.code,
      } as never),
    );
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @MfaSwagger.Verify()
  async verify(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: VerifyMfaRequestDTO,
  ): Promise<{ verified: boolean }> {
    const ok = await this.commandBus.execute<VerifyMfaCommand, boolean>(
      new VerifyMfaCommand(
        {
          challengeId: body.challengeId,
          code: body.code,
          trustDevice: body.trustDevice ?? false,
          type: 'totp',
        } as never,
        user.id as UserId,
      ),
    );
    return { verified: ok };
  }

  @Get('status')
  @MfaSwagger.Status()
  async status(@CurrentUser() user: AuthenticatedUser) {
    const row = await this.queryBus.execute<
      GetAuthMfaSettingsQuery,
      MfaResponseDTO
    >(new GetAuthMfaSettingsQuery(user.id as UserId));
    return this.mapper.toResponse(row);
  }
}

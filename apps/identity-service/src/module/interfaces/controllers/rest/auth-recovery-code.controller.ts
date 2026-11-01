/**
 * AuthRecoveryCodeController — REST endpoints for recovery codes
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { GenerateRecoveryCodesCommand } from '../../../application/commands/auth/generate-recovery-codes.command.js';
import { GetAuthRecoveryCodesQuery } from '../../../application/queries/auth/get-auth-recovery-codes.query.js';

import type { RecoveryCodesHttpResponseDTO } from '../../dtos/responses/recovery-code/recovery-codes.response.dto.js';

import { AuthRecoveryCodeControllerMapper } from '../../mappers/auth-recovery-code.controller.mapper.js';

@ApiTags('auth-recovery-code')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/recovery-codes')
export class AuthRecoveryCodeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate new recovery codes' })
  @ApiResponse({ status: 200, description: 'Recovery codes generated' })
  async generate(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RecoveryCodesHttpResponseDTO> {
    const codes = await this.commandBus.execute(
      new GenerateRecoveryCodesCommand(user.userId, 10),
    );
    return AuthRecoveryCodeControllerMapper.toGenerateHttpResponse(codes);
  }

  @Get()
  @ApiOperation({ summary: 'Get recovery codes count' })
  async getCount(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ total: number; remaining: number; used: number }> {
    return this.queryBus.execute(new GetAuthRecoveryCodesQuery(user.userId));
  }
}

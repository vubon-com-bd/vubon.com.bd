/**
 * AuthRecoveryCodeController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '@vubon/shared-kernel/interfaces';

import { GenerateRecoveryCodesCommand } from '../../../application/commands/auth/generate-recovery-codes.command';
import { RecoverAccountCommand } from '../../../application/commands/auth/recover-account.command';
import { GetAuthRecoveryCodesQuery } from '../../../application/queries/auth/get-auth-recovery-codes.query';
import type { UserId } from '@vubon/shared-types/common';

import {
  GenerateRecoveryCodesRequestDTO,
  RecoverAccountRequestDTO,
} from '../../dtos/requests/recovery-code.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Recovery')
@Controller('auth/recovery-codes')
export class AuthRecoveryCodeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generate(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: GenerateRecoveryCodesRequestDTO,
  ) {
    return this.commandBus.execute(
      new GenerateRecoveryCodesCommand(user.id as UserId, {
        password: body.password,
        count: body.count ?? 10,
        invalidatePrevious: true,
      }),
    );
  }

  @Public()
  @Post('recover')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recover(@Body() body: RecoverAccountRequestDTO): Promise<void> {
    await this.commandBus.execute(
      new RecoverAccountCommand({
        email: body.email,
        recoveryCode: body.recoveryCode,
        newPassword: body.newPassword,
        confirmPassword: body.confirmPassword,
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new GetAuthRecoveryCodesQuery(user.id as UserId),
    );
  }
}

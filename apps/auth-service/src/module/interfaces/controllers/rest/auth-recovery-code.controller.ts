import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { GenerateRecoveryCodesCommand } from '../../../application/commands/auth/generate-recovery-codes.command';
import { RecoverAccountCommand } from '../../../application/commands/auth/recover-account.command';
import { GetAuthRecoveryCodesQuery } from '../../../application/queries/auth/get-auth-recovery-codes.query';
import {
  RecoveryCodeGenerateRequestDTO,
  RecoveryCodeConsumeRequestDTO,
} from '../../dtos/requests/recovery-code.request.dto';

@ApiTags('Recovery Codes')
@Controller('auth/recovery-codes')
@UseGuards(JwtAuthGuard)
export class AuthRecoveryCodeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  async generate(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RecoveryCodeGenerateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateRecoveryCodesCommand(user.userId, body.count ?? 10),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetAuthRecoveryCodesQuery(user.userId));
  }

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  async recover(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RecoveryCodeConsumeRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RecoverAccountCommand(user.userId, body.code),
    );
  }
}

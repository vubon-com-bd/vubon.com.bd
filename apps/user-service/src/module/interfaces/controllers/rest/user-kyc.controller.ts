import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { SubmitKycCommand } from '../../../application/commands/kyc/submit-kyc.command';
import { VerifyKycCommand } from '../../../application/commands/kyc/verify-kyc.command';
import { RejectKycCommand } from '../../../application/commands/kyc/reject-kyc.command';
import { GetKycStatusQuery } from '../../../application/queries/kyc/get-kyc-status.query';
import { SubmitKycRequestDto } from '../../dtos/requests/kyc.request.dto';
import { KycSwagger } from '../../swagger/kyc.swagger';

@ApiTags('KYC')
@Controller('users/kyc')
@UseGuards(JwtAuthGuard)
export class UserKycController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @KycSwagger.Status()
  async status(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetKycStatusQuery(user.userId));
  }

  @Post('submit')
  @KycSwagger.Submit()
  async submit(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SubmitKycRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitKycCommand(user.userId, body.documents, body.acceptTerms),
    );
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async verify(
    @CurrentUser() user: CurrentUserShape,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new VerifyKycCommand(user.userId, id));
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async reject(
    @CurrentUser() user: CurrentUserShape,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new RejectKycCommand(user.userId, id, body.reason),
    );
  }
}

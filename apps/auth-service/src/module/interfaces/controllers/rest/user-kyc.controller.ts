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
import { SubmitKycCommand } from '../../../application/commands/user/submit-kyc.command';
import { VerifyKycCommand } from '../../../application/commands/user/verify-kyc.command';
import { RejectKycCommand } from '../../../application/commands/user/reject-kyc.command';
import { GetUserKycStatusQuery } from '../../../application/queries/user/get-user-kyc-status.query';
import { KycSubmitRequestDTO } from '../../dtos/requests/kyc.request.dto';

@ApiTags('KYC')
@Controller('users/kyc')
@UseGuards(JwtAuthGuard)
export class UserKycController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async status(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUserKycStatusQuery(user.userId));
  }

  @Post('submit')
  async submit(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: KycSubmitRequestDTO,
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

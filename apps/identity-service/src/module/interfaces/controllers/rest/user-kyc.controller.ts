/**
 * UserKycController — REST endpoints for user KYC
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SubmitKycCommand } from '../../../application/commands/user/submit-kyc.command.js';
import { VerifyKycCommand } from '../../../application/commands/user/verify-kyc.command.js';
import { RejectKycCommand } from '../../../application/commands/user/reject-kyc.command.js';

import { GetUserKycStatusQuery } from '../../../application/queries/user/get-user-kyc-status.query.js';

import { SubmitKycHttpDTO } from '../../dtos/requests/user/submit-kyc.request.dto.js';
import { VerifyKycHttpDTO } from '../../dtos/requests/user/verify-kyc.request.dto.js';
import { RejectKycHttpDTO } from '../../dtos/requests/user/reject-kyc.request.dto.js';

import type { UserKycHttpResponseDTO } from '../../dtos/responses/user-kyc/user-kyc.response.dto.js';

import { UserKycControllerMapper } from '../../mappers/user-kyc.controller.mapper.js';
import { ApiKycTag, ApiSubmitKyc, ApiVerifyKyc, ApiRejectKyc } from '../../swagger/user-kyc.swagger.js';

@ApiKycTag()
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/kyc')
export class UserKycController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @ApiSubmitKyc()
  async submit(
    @Body() dto: SubmitKycHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserKycHttpResponseDTO> {
    const appDto = UserKycControllerMapper.toSubmitAppDto(dto);
    const app = await this.commandBus.execute(
      new SubmitKycCommand(user.userId, appDto as never),
    );
    return UserKycControllerMapper.toHttpResponse(app);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiVerifyKyc()
  async verify(
    @Body() dto: VerifyKycHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserKycHttpResponseDTO> {
    const appDto = UserKycControllerMapper.toVerifyAppDto(dto);
    const app = await this.commandBus.execute(
      new VerifyKycCommand(appDto as never, user.userId),
    );
    return UserKycControllerMapper.toHttpResponse(app);
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  @ApiRejectKyc()
  async reject(
    @Body() dto: RejectKycHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserKycHttpResponseDTO> {
    const appDto = UserKycControllerMapper.toRejectAppDto(dto);
    const app = await this.commandBus.execute(
      new RejectKycCommand(appDto as never, user.userId),
    );
    return UserKycControllerMapper.toHttpResponse(app);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get KYC status for current user' })
  async getStatus(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserKycHttpResponseDTO | null> {
    const app = await this.queryBus.execute(new GetUserKycStatusQuery(user.userId));
    return app ? UserKycControllerMapper.toHttpResponse(app) : null;
  }
}

/**
 * InsuranceController — REST endpoints
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param,
  Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateInsuranceCommand } from '@application/commands/insurance/create-insurance.command.js';
import { ActivateInsuranceCommand } from '@application/commands/insurance/activate.command.js';
import { CancelInsuranceCommand } from '@application/commands/insurance/cancel.command.js';
import { ExpireInsuranceCommand } from '@application/commands/insurance/expire.command.js';
import { SubmitClaimInsuranceCommand } from '@application/commands/insurance/submit-claim.command.js';
import { ReviewClaimInsuranceCommand } from '@application/commands/insurance/review-claim.command.js';
import { ApproveClaimInsuranceCommand } from '@application/commands/insurance/approve-claim.command.js';
import { RejectClaimInsuranceCommand } from '@application/commands/insurance/reject-claim.command.js';
import { PayClaimInsuranceCommand } from '@application/commands/insurance/pay-claim.command.js';

import { GetInsuranceQuery } from '@application/queries/insurance/get-insurance.query.js';
import { GetInsuranceByPolicyQuery } from '@application/queries/insurance/get-insurance-by-policy.query.js';
import { GetInsuranceStatsQuery } from '@application/queries/insurance/get-insurance-stats.query.js';
import { ListInsurancesQuery } from '@application/queries/insurance/list-insurances.query.js';
import { ListClaimableInsurancesQuery } from '@application/queries/insurance/list-claimable-insurances.query.js';
import { ListExpiringInsurancesQuery } from '@application/queries/insurance/list-expiring-insurances.query.js';

import {
  CreateInsuranceHttpDTO,
  SubmitClaimHttpDTO,
  ReviewClaimHttpDTO,
  ApproveClaimHttpDTO,
  RejectClaimHttpDTO,
  PayClaimHttpDTO,
  InsuranceReasonHttpDTO,
  ListInsurancesHttpQueryDTO,
} from '../../dtos/requests/insurance/insurance.request.dto.js';
import type {
  InsuranceHttpResponseDTO,
  InsuranceListHttpResponseDTO,
  InsuranceStatsHttpResponseDTO,
  InsuranceInitiateHttpResponseDTO,
} from '../../dtos/responses/insurance/insurance.response.dto.js';

import { InsuranceControllerMapper } from '../../mappers/insurance.controller.mapper.js';
import { InsuranceHttpValidator } from '../../validators/insurance.validator.js';
import { InsuranceLoggingInterceptor } from '../../interceptors/insurance-logging.interceptor.js';
import { InsuranceTimeoutInterceptor } from '../../interceptors/insurance-timeout.interceptor.js';
import {
  ApiCreateInsurance,
  ApiGetInsurance,
  ApiListInsurances,
  ApiGetInsuranceStats,
  ApiInsuranceTransition,
  ApiInsuranceTag,
} from '../../swagger/insurance.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiInsuranceTag()
@ApiBearerAuth('bearer')
@Controller('insurances')
@UseGuards(JwtAuthGuard)
@UseInterceptors(InsuranceLoggingInterceptor, InsuranceTimeoutInterceptor)
export class InsuranceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateInsurance()
  async create(
    @Body() body: CreateInsuranceHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceInitiateHttpResponseDTO> {
    InsuranceHttpValidator.validateCreate(body);
    const appDto = InsuranceControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateInsuranceCommand,
      { readonly id: string; readonly policyNumber: string; readonly status: string }
    >(new CreateInsuranceCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      insuranceId: result.id,
      policyNumber: result.policyNumber,
      status: result.status,
    };
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<InsuranceHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivateInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new ActivateInsuranceCommand({ insuranceId: id } as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: InsuranceReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<CancelInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new CancelInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/expire')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('expire')
  async expire(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<InsuranceHttpResponseDTO> {
    const r = await this.commandBus.execute<ExpireInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new ExpireInsuranceCommand({ insuranceId: id } as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/claims')
  @HttpCode(HttpStatus.CREATED)
  @ApiInsuranceTransition('submit-claim')
  async submitClaim(
    @Param('id') id: string,
    @Body() body: SubmitClaimHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toSubmitClaimAppDto(id, body);
    const r = await this.commandBus.execute<SubmitClaimInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new SubmitClaimInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/claims/:claimId/review')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('review-claim')
  async reviewClaim(
    @Param('id') id: string,
    @Param('claimId') claimId: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toReviewClaimAppDto(id, { claimId });
    const r = await this.commandBus.execute<ReviewClaimInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new ReviewClaimInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/claims/:claimId/approve')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('approve-claim')
  async approveClaim(
    @Param('id') id: string,
    @Param('claimId') claimId: string,
    @Body() body: ApproveClaimHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toApproveClaimAppDto(id, { ...body, claimId });
    const r = await this.commandBus.execute<ApproveClaimInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new ApproveClaimInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/claims/:claimId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('reject-claim')
  async rejectClaim(
    @Param('id') id: string,
    @Param('claimId') claimId: string,
    @Body() body: RejectClaimHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toRejectClaimAppDto(id, { ...body, claimId });
    const r = await this.commandBus.execute<RejectClaimInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new RejectClaimInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Post(':id/claims/:claimId/pay')
  @HttpCode(HttpStatus.OK)
  @ApiInsuranceTransition('pay-claim')
  async payClaim(
    @Param('id') id: string,
    @Param('claimId') claimId: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InsuranceHttpResponseDTO> {
    const appDto = InsuranceControllerMapper.toPayClaimAppDto(id, { claimId });
    const r = await this.commandBus.execute<PayClaimInsuranceCommand, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new PayClaimInsuranceCommand(appDto as never, this.getActorId(user))
    );
    return InsuranceControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetInsuranceStats()
  async getStats(): Promise<InsuranceStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInsuranceStatsQuery, Parameters<typeof InsuranceControllerMapper.toStatsHttp>[0]>(
      new GetInsuranceStatsQuery()
    );
    return InsuranceControllerMapper.toStatsHttp(appDto);
  }

  @Get('claimable')
  @ApiListInsurances()
  async listClaimable(): Promise<InsuranceListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListClaimableInsurancesQuery, Parameters<typeof InsuranceControllerMapper.toListHttp>[0]>(
      new ListClaimableInsurancesQuery()
    );
    return InsuranceControllerMapper.toListHttp(appDto);
  }

  @Get('expiring')
  @ApiListInsurances()
  async listExpiring(
    @Query('days') days: string = '30',
  ): Promise<InsuranceListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListExpiringInsurancesQuery, Parameters<typeof InsuranceControllerMapper.toListHttp>[0]>(
      new ListExpiringInsurancesQuery(Number(days))
    );
    return InsuranceControllerMapper.toListHttp(appDto);
  }

  @Get('policy/:policyNumber')
  @ApiGetInsurance()
  async getByPolicy(@Param('policyNumber') policyNumber: string): Promise<InsuranceHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInsuranceByPolicyQuery, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new GetInsuranceByPolicyQuery(policyNumber)
    );
    return InsuranceControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetInsurance()
  async getById(@Param('id') id: string): Promise<InsuranceHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInsuranceQuery, Parameters<typeof InsuranceControllerMapper.toHttpResponse>[0]>(
      new GetInsuranceQuery(id)
    );
    return InsuranceControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListInsurances()
  async list(@Query() query: ListInsurancesHttpQueryDTO): Promise<InsuranceListHttpResponseDTO> {
    const options = InsuranceControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListInsurancesQuery, Parameters<typeof InsuranceControllerMapper.toListHttp>[0]>(
      new ListInsurancesQuery(options as never)
    );
    return InsuranceControllerMapper.toListHttp(appDto);
  }
}

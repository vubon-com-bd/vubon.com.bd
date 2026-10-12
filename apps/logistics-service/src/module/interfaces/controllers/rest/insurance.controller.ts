import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { PurchaseInsuranceCommand } from '../../../application/commands/insurance/purchase-insurance.command.js';
import { ActivateInsuranceCommand } from '../../../application/commands/insurance/activate-insurance.command.js';
import { ExpireInsuranceCommand } from '../../../application/commands/insurance/expire-insurance.command.js';
import { CancelInsuranceCommand } from '../../../application/commands/insurance/cancel-insurance.command.js';
import { FileInsuranceClaimCommand } from '../../../application/commands/insurance/file-insurance-claim.command.js';
import { StartClaimReviewCommand } from '../../../application/commands/insurance/start-claim-review.command.js';
import { ApproveClaimCommand } from '../../../application/commands/insurance/approve-claim.command.js';
import { RejectClaimCommand } from '../../../application/commands/insurance/reject-claim.command.js';
import { PayClaimCommand } from '../../../application/commands/insurance/pay-claim.command.js';
import { AppealClaimCommand } from '../../../application/commands/insurance/appeal-claim.command.js';
import { GetInsuranceQuery } from '../../../application/queries/insurance/get-insurance.query.js';
import { GetInsuranceByShipmentQuery } from '../../../application/queries/insurance/get-insurance-by-shipment.query.js';
import { ListInsurancesQuery } from '../../../application/queries/insurance/list-insurances.query.js';
import {
  PurchaseInsuranceHttpDTO, FileClaimHttpDTO, ApproveClaimHttpDTO,
  RejectClaimHttpDTO, InsuranceReasonHttpDTO, ListInsurancesHttpQueryDTO,
} from '../../dtos/requests/insurance.request.dto.js';
import { InsuranceControllerMapper } from '../../mappers/insurance.controller.mapper.js';
import type { InsuranceResponseDTO, InsuranceListResponseDTO } from '../../../application/dtos/responses/insurance/insurance-response.dto.js';

@ApiTags('insurances')
@ApiBearerAuth('bearer')
@Controller('logistics/insurances')
@UseGuards(JwtAuthGuard)
export class InsuranceController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Purchase an insurance policy' })
  async purchase(@Body() dto: PurchaseInsuranceHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new PurchaseInsuranceCommand(InsuranceControllerMapper.toPurchaseDto(dto), user.userId));
  }
  @Patch(':id/activate') @ApiOperation({ summary: 'Activate insurance' })
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new ActivateInsuranceCommand(InsuranceControllerMapper.toActivateDto(id), user.userId));
  }
  @Patch(':id/expire') @ApiOperation({ summary: 'Expire insurance' })
  async expire(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new ExpireInsuranceCommand(InsuranceControllerMapper.toExpireDto(id), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel insurance' })
  async cancel(@Param('id') id: string, @Body() dto: InsuranceReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new CancelInsuranceCommand(InsuranceControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Post(':id/claim') @ApiOperation({ summary: 'File a claim' })
  async fileClaim(@Param('id') id: string, @Body() dto: FileClaimHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new FileInsuranceClaimCommand(InsuranceControllerMapper.toFileClaimDto(id, dto), user.userId));
  }
  @Patch(':id/claim/review') @ApiOperation({ summary: 'Start claim review' })
  async startReview(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new StartClaimReviewCommand(InsuranceControllerMapper.toStartReviewDto(id), user.userId));
  }
  @Patch(':id/claim/approve') @ApiOperation({ summary: 'Approve claim' })
  async approveClaim(@Param('id') id: string, @Body() dto: ApproveClaimHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new ApproveClaimCommand(InsuranceControllerMapper.toApproveClaimDto(id, dto), user.userId));
  }
  @Patch(':id/claim/reject') @ApiOperation({ summary: 'Reject claim' })
  async rejectClaim(@Param('id') id: string, @Body() dto: RejectClaimHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new RejectClaimCommand(InsuranceControllerMapper.toRejectClaimDto(id, dto), user.userId));
  }
  @Patch(':id/claim/pay') @ApiOperation({ summary: 'Pay claim' })
  async payClaim(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new PayClaimCommand(InsuranceControllerMapper.toPayClaimDto(id), user.userId));
  }
  @Patch(':id/claim/appeal') @ApiOperation({ summary: 'Appeal claim decision' })
  async appeal(@Param('id') id: string, @Body() dto: InsuranceReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<InsuranceResponseDTO> {
    return this.commandBus.execute(new AppealClaimCommand(InsuranceControllerMapper.toAppealDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List insurance policies' })
  async list(@Query() q: ListInsurancesHttpQueryDTO): Promise<InsuranceListResponseDTO> {
    return this.queryBus.execute(new ListInsurancesQuery(InsuranceControllerMapper.toListOptions(q)));
  }
  @Get('by-shipment/:shipmentId') @ApiOperation({ summary: 'Get insurance by shipment' })
  async getByShipment(@Param('shipmentId') sid: string): Promise<InsuranceResponseDTO | null> {
    return this.queryBus.execute(new GetInsuranceByShipmentQuery(sid));
  }
  @Get(':id') @ApiOperation({ summary: 'Get insurance by id' })
  async getById(@Param('id') id: string): Promise<InsuranceResponseDTO> {
    return this.queryBus.execute(new GetInsuranceQuery(id));
  }
}

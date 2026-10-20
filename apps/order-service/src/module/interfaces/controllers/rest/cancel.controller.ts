/**
 * CancelController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_CANCEL_SERVICE,
  type IOrderCancelService,
} from '../../../application/services/interfaces/order-cancel.service.interface.js';
import {
  RequestCancelHttpDTO,
  ApproveCancelHttpDTO,
  RejectCancelHttpDTO,
} from '../../dtos/requests/cancel.request.dto.js';
import type { CancelHttpResponseDTO } from '../../dtos/responses/cancel.response.dto.js';
import { CancelControllerMapper } from '../../mappers/cancel.controller.mapper.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiCancelTag,
  ApiRequestCancel,
  ApiApproveCancel,
  ApiRejectCancel,
} from '../../swagger/cancel.swagger.js';

@ApiCancelTag()
@ApiBearerAuth('bearer')
@Controller('cancels')
@UseGuards(JwtAuthGuard)
export class CancelController extends BaseController {
  constructor(
    @Inject(ORDER_CANCEL_SERVICE)
    private readonly service: IOrderCancelService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiRequestCancel()
  async request(
    @Body() dto: RequestCancelHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<CancelHttpResponseDTO> {
    const appDto = CancelControllerMapper.toRequestDto(
      { ...dto, idempotencyKey: idempotencyKey ?? dto.idempotencyKey },
      user.userId,
    );
    const app = await this.service.request(appDto, user.userId);
    return CancelControllerMapper.toHttpResponse(app);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CancelHttpResponseDTO> {
    const app = await this.service.getById(id);
    return CancelControllerMapper.toHttpResponse(app);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiApproveCancel()
  async approve(
    @Param('id') id: string,
    @Body() dto: ApproveCancelHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CancelHttpResponseDTO> {
    const appDto = CancelControllerMapper.toApproveDto(
      id,
      dto as never,
      dto,
      user.userId,
    );
    const app = await this.service.approve(appDto, user.userId);
    return CancelControllerMapper.toHttpResponse(app);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiRejectCancel()
  async reject(
    @Param('id') id: string,
    @Body() dto: RejectCancelHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CancelHttpResponseDTO> {
    const appDto = CancelControllerMapper.toRejectDto(
      id,
      dto as never,
      dto,
      user.userId,
    );
    const app = await this.service.reject(appDto, user.userId);
    return CancelControllerMapper.toHttpResponse(app);
  }
}

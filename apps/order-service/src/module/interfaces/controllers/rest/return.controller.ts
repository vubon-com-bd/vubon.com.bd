/**
 * ReturnController
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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_RETURN_SERVICE,
  type IOrderReturnService,
} from '../../../application/services/interfaces/order-return.service.interface.js';
import {
  RequestReturnHttpDTO,
  ApproveReturnHttpDTO,
  RejectReturnHttpDTO,
  CompleteReturnHttpDTO,
} from '../../dtos/requests/return.request.dto.js';
import type { ReturnHttpResponseDTO } from '../../dtos/responses/return.response.dto.js';
import { ReturnControllerMapper } from '../../mappers/return.controller.mapper.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiReturnTag,
  ApiRequestReturn,
  ApiCompleteReturn,
} from '../../swagger/return.swagger.js';

@ApiReturnTag()
@ApiBearerAuth('bearer')
@Controller('returns')
@UseGuards(JwtAuthGuard)
export class ReturnController extends BaseController {
  constructor(
    @Inject(ORDER_RETURN_SERVICE)
    private readonly service: IOrderReturnService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiRequestReturn()
  async request(
    @Body() dto: RequestReturnHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<ReturnHttpResponseDTO> {
    const appDto = ReturnControllerMapper.toRequestDto(
      { ...dto, idempotencyKey: idempotencyKey ?? dto.idempotencyKey },
      user.userId,
    );
    const app = await this.service.request(appDto, user.userId);
    return ReturnControllerMapper.toHttpResponse(app);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReturnHttpResponseDTO> {
    const app = await this.service.getById(id);
    return ReturnControllerMapper.toHttpResponse(app);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approve(
    @Param('id') id: string,
    @Body() dto: ApproveReturnHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const appDto = ReturnControllerMapper.toApproveDto(id, dto as never, dto, user.userId);
    const app = await this.service.approve(appDto, user.userId);
    return ReturnControllerMapper.toHttpResponse(app);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  async reject(
    @Param('id') id: string,
    @Body() dto: RejectReturnHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const appDto = ReturnControllerMapper.toRejectDto(id, dto as never, dto, user.userId);
    const app = await this.service.reject(appDto, user.userId);
    return ReturnControllerMapper.toHttpResponse(app);
  }

  @Post(':id/schedule-pickup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Schedule pickup for return' })
  async schedulePickup(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const result = await this.service.schedulePickup(id, user.userId);
    return result as unknown as ReturnHttpResponseDTO;
  }

  @Post(':id/picked-up')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark return picked up' })
  async markPickedUp(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const result = await this.service.markPickedUp(id, user.userId);
    return result as unknown as ReturnHttpResponseDTO;
  }

  @Post(':id/receive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark return received' })
  async receive(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const result = await this.service.receive(id, user.userId);
    return result as unknown as ReturnHttpResponseDTO;
  }

  @Post(':id/inspect')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark return inspected' })
  async inspect(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const result = await this.service.inspect(id, user.userId);
    return result as unknown as ReturnHttpResponseDTO;
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiCompleteReturn()
  async complete(
    @Param('id') id: string,
    @Body() dto: CompleteReturnHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnHttpResponseDTO> {
    const appDto = ReturnControllerMapper.toCompleteDto(id, dto as never, dto, user.userId);
    const app = await this.service.complete(appDto, user.userId);
    return ReturnControllerMapper.toHttpResponse(app);
  }
}

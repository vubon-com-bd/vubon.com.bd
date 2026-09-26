import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreatePromotionCommand } from '../../../application/commands/promotion/create-promotion.command';
import { ApplyPromotionCommand } from '../../../application/commands/promotion/apply-promotion.command';
import { GetPromotionQuery } from '../../../application/queries/promotion/get-promotion.query';
import {
  CreatePromotionRequestDTO,
  ApplyPromotionRequestDTO,
} from '../../dtos/requests/promotion.request.dto';
import { PromotionResponseDto } from '../../dtos/responses/promotion.response.dto';
import { PromotionSwagger } from '../../swagger/promotion.swagger';

@PromotionSwagger.Tag()
@Controller('promotions')
@UseGuards(JwtAuthGuard)
export class PromotionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @PromotionSwagger.Create()
  async create(
    @Body() body: CreatePromotionRequestDTO,
  ): Promise<PromotionResponseDto> {
    const result = await this.commandBus.execute(
      new CreatePromotionCommand(
        body.name,
        body.code,
        body.type,
        body.maxUsage,
        body.startDate,
        body.endDate,
      ),
    );
    return result as PromotionResponseDto;
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PromotionResponseDto | null> {
    const result = await this.queryBus.execute(new GetPromotionQuery(id));
    return result as PromotionResponseDto | null;
  }

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @PromotionSwagger.Apply()
  async apply(@Body() body: ApplyPromotionRequestDTO): Promise<{ amount: number }> {
    const amount = await this.commandBus.execute(
      new ApplyPromotionCommand(body.code, body.userId, body.orderAmount),
    );
    return { amount: amount as number };
  }
}

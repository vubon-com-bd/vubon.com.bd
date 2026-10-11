/**
 * DigestController — REST endpoints for notification digests
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateDigestCommand } from '../../../application/commands/digest/create-digest.command.js';
import { UpdateDigestCommand } from '../../../application/commands/digest/update-digest.command.js';
import { GenerateDigestCommand } from '../../../application/commands/digest/generate-digest.command.js';
import { SendDigestCommand } from '../../../application/commands/digest/send-digest.command.js';
import { CancelDigestCommand } from '../../../application/commands/digest/cancel-digest.command.js';

import { GetDigestQuery } from '../../../application/queries/digest/get-digest.query.js';
import { ListDigestsQuery } from '../../../application/queries/digest/list-digests.query.js';
import { PreviewDigestQuery } from '../../../application/queries/digest/preview-digest.query.js';

import {
  CreateDigestHttpDTO,
  UpdateDigestHttpDTO,
  GenerateDigestHttpDTO,
  SendDigestHttpDTO,
  DigestPreviewHttpQueryDTO,
  ListDigestsHttpQueryDTO,
} from '../../dtos/requests/digest/digest.http-dto.js';
import { DigestControllerMapper } from '../../mappers/digest.controller.mapper.js';

@ApiTags('digests')
@ApiBearerAuth('bearer')
@Controller('digests')
@UseGuards(JwtAuthGuard)
export class DigestController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a digest record' })
  async create(
    @Body() dto: CreateDigestHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateDigestCommand(DigestControllerMapper.toCreateAppDto(dto), user.userId),
    );
  }

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate a digest for a user' })
  async generate(
    @Body() dto: GenerateDigestHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateDigestCommand(DigestControllerMapper.toGenerateAppDto(dto), user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List digests (paginated)' })
  async list(@Query() q: ListDigestsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListDigestsQuery(DigestControllerMapper.toListAppDto(q)),
    );
  }

  @Get('preview')
  @ApiOperation({ summary: 'Preview a user digest' })
  async preview(@Query() q: DigestPreviewHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new PreviewDigestQuery(DigestControllerMapper.toPreviewAppDto(q)),
    );
  }

  @Get(':digestId')
  @ApiOperation({ summary: 'Get digest by id' })
  async getById(@Param('digestId') digestId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDigestQuery(digestId));
  }

  @Patch(':digestId')
  @ApiOperation({ summary: 'Update a pending digest' })
  async update(
    @Param('digestId') digestId: string,
    @Body() dto: UpdateDigestHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateDigestCommand(DigestControllerMapper.toUpdateAppDto(digestId, dto), user.userId),
    );
  }

  @Post(':digestId/send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a ready digest' })
  async send(
    @Param('digestId') digestId: string,
    @Body() dto: SendDigestHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SendDigestCommand(DigestControllerMapper.toSendAppDto(digestId, dto), user.userId),
    );
  }

  @Post(':digestId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a pending digest' })
  async cancel(
    @Param('digestId') digestId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new CancelDigestCommand(digestId, user.userId));
  }
}

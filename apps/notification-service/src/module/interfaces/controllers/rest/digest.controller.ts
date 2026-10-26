/**
 * DigestController
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { CreateDigestCommand } from '@application/commands/digest/create-digest.command.js';
import { SendDigestCommand } from '@application/commands/digest/send-digest.command.js';
import { GetDigestQuery } from '@application/queries/digest/get-digest.query.js';
import { ListDigestsQuery } from '@application/queries/digest/list-digests.query.js';

import type {
  DigestHttpResponseDTO,
  DigestListHttpResponseDTO,
} from '@interfaces/dtos/responses/digest.response.dto.js';

export interface CreateDigestHttpDTO {
  readonly userId: string;
  readonly frequency: string;
  readonly type: string;
  readonly categories: readonly string[];
  readonly sendHour: number;
  readonly timezone: string;
}

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
  async create(
    @Body() dto: CreateDigestHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateDigestCommand(dto as never, user.userId),
    );
  }

  @Post(':id/send')
  @HttpCode(HttpStatus.OK)
  async send(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<DigestHttpResponseDTO> {
    return this.commandBus.execute(
      new SendDigestCommand({ digestId: id }, user.userId),
    );
  }

  @Get()
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<DigestListHttpResponseDTO> {
    return this.queryBus.execute(
      new ListDigestsQuery({ page: page ?? 1, limit: limit ?? 20 }),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<DigestHttpResponseDTO> {
    return this.queryBus.execute(new GetDigestQuery(id));
  }
}

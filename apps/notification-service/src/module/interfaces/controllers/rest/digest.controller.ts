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
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateDigestCommand } from '../../../application/commands/digest/create-digest.command';
import { SendDigestCommand } from '../../../application/commands/digest/send-digest.command';
import { ListDigestsQuery } from '../../../application/queries/digest/list-digests.query';
import { GetDigestQuery } from '../../../application/queries/digest/get-digest.query';

interface CreateDigestBody {
  digestType: string;
  frequency: string;
  scheduledAt: string;
}

@Controller('notifications/digests')
@UseGuards(JwtAuthGuard)
export class DigestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateDigestBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateDigestCommand(
        user.userId,
        body.digestType,
        body.frequency,
        body.scheduledAt,
      ),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListDigestsQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDigestQuery(id));
  }

  @Post(':id/send')
  @HttpCode(HttpStatus.OK)
  async send(@Param('id') id: string): Promise<unknown> {
    return this.commandBus.execute(new SendDigestCommand(id));
  }
}

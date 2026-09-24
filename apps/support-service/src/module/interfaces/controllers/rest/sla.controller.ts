import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateSlaCommand } from '../../../application/commands/sla/create-sla.command';
import { UpdateSlaCommand } from '../../../application/commands/sla/update-sla.command';
import { GetSlaQuery } from '../../../application/queries/sla/get-sla.query';
import { ListSlasQuery } from '../../../application/queries/sla/list-slas.query';

@ApiTags('SLA')
@Controller('slas')
@UseGuards(JwtAuthGuard)
export class SlaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListSlasQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetSlaQuery(id));
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async create(
    @Body() body: {
      name: string;
      type: string;
      target: number;
      priority: string;
      businessHoursOnly?: boolean;
    },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSlaCommand(
        body.name,
        body.type,
        body.target,
        body.priority,
        body.businessHoursOnly ?? false,
      ),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; target?: number; status?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateSlaCommand(id, body.name, body.target, body.status),
    );
  }
}

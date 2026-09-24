import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateRuleCommand } from '../../../application/commands/rule/create-rule.command';
import { UpdateRuleCommand } from '../../../application/commands/rule/update-rule.command';

@ApiTags('Rules')
@Controller('rules')
@UseGuards(JwtAuthGuard)
export class RuleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async list(): Promise<unknown> {
    return { rules: [] };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return { id };
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async create(
    @Body() body: {
      name: string;
      type: string;
      condition: string;
      action: string;
      priority?: number;
    },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateRuleCommand(
        body.name,
        body.type,
        body.condition,
        body.action,
        body.priority ?? 50,
      ),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; priority?: number; isActive?: boolean },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateRuleCommand(id, body.name, body.priority, body.isActive),
    );
  }
}

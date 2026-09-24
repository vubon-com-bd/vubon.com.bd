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
import { CreateAutomationCommand } from '../../../application/commands/automation/create-automation.command';
import { UpdateAutomationCommand } from '../../../application/commands/automation/update-automation.command';

@ApiTags('Automations')
@Controller('automations')
@UseGuards(JwtAuthGuard)
export class AutomationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async list(): Promise<unknown> {
    return { automations: [] };
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
      trigger: string;
      action: string;
      config?: Record<string, unknown>;
    },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateAutomationCommand(
        body.name,
        body.type,
        body.trigger,
        body.action,
        body.config,
      ),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; status?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateAutomationCommand(id, body.name, body.status),
    );
  }
}

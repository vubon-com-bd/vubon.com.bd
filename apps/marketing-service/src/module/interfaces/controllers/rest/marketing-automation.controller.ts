import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateAutomationCommand } from '../../../application/commands/automation/create-automation.command';
import { TriggerAutomationCommand } from '../../../application/commands/automation/trigger-automation.command';

@Controller('automations')
@UseGuards(JwtAuthGuard)
export class MarketingAutomationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: { name: string; automationType: string; trigger: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateAutomationCommand(body.name, body.automationType, body.trigger),
    );
  }

  @Post('trigger')
  @HttpCode(HttpStatus.NO_CONTENT)
  async trigger(@Body() body: { automationId: string; userId: string }): Promise<void> {
    await this.commandBus.execute(
      new TriggerAutomationCommand(body.automationId, body.userId),
    );
  }

  @Get()
  async list(): Promise<readonly unknown[]> {
    void this.queryBus;
    return [];
  }
}

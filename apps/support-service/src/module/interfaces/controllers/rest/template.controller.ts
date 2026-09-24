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
import { CreateTemplateCommand } from '../../../application/commands/template/create-template.command';
import { UpdateTemplateCommand } from '../../../application/commands/template/update-template.command';

@ApiTags('Templates')
@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplateController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async list(): Promise<unknown> {
    return { templates: [] };
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
      content: string;
      variables?: string[];
    },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTemplateCommand(
        body.name,
        body.type,
        body.content,
        body.variables ?? [],
      ),
    );
  }

  @Patch(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; content?: string; isActive?: boolean },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateTemplateCommand(id, body.name, body.content, body.isActive),
    );
  }
}

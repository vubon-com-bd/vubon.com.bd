/**
 * User Contact Controller
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { AddContactCommand } from '../../../application/commands/user/add-contact.command.js';
import { UpdateContactCommand } from '../../../application/commands/user/update-contact.command.js';
import { DeleteContactCommand } from '../../../application/commands/user/delete-contact.command.js';
import { VerifyContactCommand } from '../../../application/commands/contact/verify-contact.command.js';

import { ListContactsQuery } from '../../../application/queries/contact/list-contacts.query.js';

import { AddContactHttpDTO } from '../../dtos/requests/add-contact.request.dto.js';
import { UpdateContactHttpDTO } from '../../dtos/requests/update-contact.request.dto.js';
import { VerifyContactHttpDTO } from '../../dtos/requests/verify-contact.request.dto.js';

import type { ContactHttpResponseDTO } from '../../dtos/responses/contact.response.dto.js';

import { ContactControllerMapper } from '../../mappers/contact.controller.mapper.js';

@ApiTags('user-contact')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/contacts')
export class UserContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List user contacts' })
  async list(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<readonly ContactHttpResponseDTO[]> {
    const result = await this.queryBus.execute(new ListContactsQuery(user.userId));
    return ContactControllerMapper.toHttpList(result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add contact' })
  async add(
    @Body() dto: AddContactHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ContactHttpResponseDTO> {
    const appDto = ContactControllerMapper.toAddAppDto(dto);
    const result = await this.commandBus.execute(
      new AddContactCommand(user.userId, appDto as never),
    );
    return ContactControllerMapper.toHttpResponse(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contact' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateContactHttpDTO,
  ): Promise<ContactHttpResponseDTO> {
    const appDto = ContactControllerMapper.toUpdateAppDto(dto);
    const result = await this.commandBus.execute(
      new UpdateContactCommand(id, appDto as never),
    );
    return ContactControllerMapper.toHttpResponse(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete contact' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteContactCommand({ contactId: id }));
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify contact' })
  async verify(
    @Param('id') id: string,
    @Body() dto: VerifyContactHttpDTO,
  ): Promise<{ success: true; verified: boolean }> {
    return this.commandBus.execute(new VerifyContactCommand(id, dto.code));
  }
}

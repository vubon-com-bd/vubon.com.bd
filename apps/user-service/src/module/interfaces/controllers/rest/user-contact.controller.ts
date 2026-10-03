/**
 * UserContactController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddContactCommand } from '@application/commands/contact/add-contact.command';
import { UpdateContactCommand } from '@application/commands/contact/update-contact.command';
import { DeleteContactCommand } from '@application/commands/contact/delete-contact.command';
import { VerifyContactCommand } from '@application/commands/contact/verify-contact.command';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query';
import { GetContactQuery } from '@application/queries/contact/get-contact.query';
import {
  AddContactRequestDto,
  UpdateContactRequestDto,
  VerifyContactRequestDto,
} from '../../dtos/requests/contact.request.dto.js';
import {
  ContactResponseDto,
  ContactListResponseDto,
} from '../../dtos/responses/contact.response.dto.js';
import { ContactControllerMapper } from '../../mappers/contact.controller.mapper.js';

@ApiTags('user-contact')
@Controller('users/:userId/contacts')
export class UserContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Param('userId') userId: string): Promise<ContactListResponseDto> {
    const result = await this.queryBus.execute(new ListContactsQuery(userId));
    return ContactControllerMapper.toListResponse(result.items);
  }

  @Get(':contactId')
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string
  ): Promise<ContactResponseDto> {
    const appDto = await this.queryBus.execute(new GetContactQuery(userId, contactId));
    return ContactControllerMapper.toResponse(appDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async add(
    @Param('userId') userId: string,
    @Body() body: AddContactRequestDto
  ): Promise<ContactResponseDto> {
    const appDto = ContactControllerMapper.toAddAppDto(userId, body);
    const result = await this.commandBus.execute(new AddContactCommand(appDto));
    return ContactControllerMapper.toResponse(result);
  }

  @Put(':contactId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string,
    @Body() body: UpdateContactRequestDto
  ): Promise<ContactResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateContactCommand(userId, contactId, body.value, body.label, body.isPrimary)
    );
    return ContactControllerMapper.toResponse(result);
  }

  @Delete(':contactId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string
  ): Promise<void> {
    await this.commandBus.execute(new DeleteContactCommand(userId, contactId));
  }

  @Post(':contactId/verify')
  @UseGuards(JwtAuthGuard)
  async verify(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string,
    @Body() body: VerifyContactRequestDto
  ): Promise<ContactResponseDto> {
    const result = await this.commandBus.execute(
      new VerifyContactCommand(userId, contactId, body.verificationCode)
    );
    return ContactControllerMapper.toResponse(result);
  }
}

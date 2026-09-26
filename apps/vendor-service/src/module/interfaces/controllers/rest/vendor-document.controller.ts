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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { UploadDocumentCommand } from '../../../application/commands/verification';
import { ListDocumentsQuery } from '../../../application/queries/verification';
import { UploadDocumentRequestDto } from '../../dtos/requests/verification.request.dto';

@ApiTags('Vendor Documents')
@ApiBearerAuth()
@Controller('vendors/documents')
@UseGuards(JwtAuthGuard)
export class VendorDocumentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new ListDocumentsQuery(vendorId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async upload(@Body() body: UploadDocumentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new UploadDocumentCommand(body.vendorId, body.type, body.url, body.number, body.expiresAt),
    );
  }
}

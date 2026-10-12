/**
 * VendorDocumentController — vendor document management
 * @module vendor-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

import { UploadVendorDocumentCommand } from '../../../application/commands/document/upload-vendor-document.command.js';
import { VerifyVendorDocumentCommand } from '../../../application/commands/document/verify-vendor-document.command.js';
import { RejectVendorDocumentCommand } from '../../../application/commands/document/reject-vendor-document.command.js';

import { GetVendorDocumentQuery } from '../../../application/queries/document/get-vendor-document.query.js';
import { ListVendorDocumentsQuery } from '../../../application/queries/document/list-vendor-documents.query.js';
import { ListPublicDocumentsQuery } from '../../../application/queries/document/list-public-documents.query.js';

import type { UploadVendorDocumentHttpDTO } from '../../dtos/requests/vendor.http-dto.js';

interface RejectDocumentBody {
  readonly reason: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_DOCUMENTS)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/documents')
export class VendorDocumentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Upload ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Upload a vendor document' })
  async upload(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: UploadVendorDocumentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toUploadDocumentAppDto(vendorId, dto);
    return this.commandBus.execute(new UploadVendorDocumentCommand(appDto, user.userId));
  }

  // ─── List ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List all documents for a vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListVendorDocumentsQuery(vendorId));
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: 'List public documents for a vendor' })
  async listPublic(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListPublicDocumentsQuery(vendorId));
  }

  @Get(':documentId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get a document by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('documentId', ParseUuidPipe) documentId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorDocumentQuery(documentId));
  }

  // ─── Verify / Reject (admin) ───
  @Post(':documentId/verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Verify a document (admin)' })
  async verify(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('documentId', ParseUuidPipe) documentId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new VerifyVendorDocumentCommand(documentId, user.userId, user.userId),
    );
  }

  @Post(':documentId/reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject a document (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('documentId', ParseUuidPipe) documentId: string,
    @Body() body: RejectDocumentBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RejectVendorDocumentCommand(documentId, body.reason, user.userId),
    );
  }
}

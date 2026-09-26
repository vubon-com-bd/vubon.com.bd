import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorDocumentController } from '../../interfaces/controllers/rest/vendor-document.controller';
import { UploadDocumentHandler } from '../../application/commands/verification';
import { ListDocumentsHandler } from '../../application/queries/verification';
import { VendorDocumentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-document.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorDocumentController],
  providers: [
    VendorDocumentPrismaRepository,
    UploadDocumentHandler,
    ListDocumentsHandler,
  ],
  exports: [VendorDocumentPrismaRepository],
})
export class VendorDocumentModule {}

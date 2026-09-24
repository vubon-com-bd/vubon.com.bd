import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { AttachmentStorageService } from './attachment-storage.service';

@Module({
  providers: [StorageService, AttachmentStorageService],
  exports: [StorageService, AttachmentStorageService],
})
export class StorageModule {}

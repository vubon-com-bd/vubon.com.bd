import { Injectable } from '@nestjs/common';
import { StorageService, type UploadResult } from './storage.service';

@Injectable()
export class AttachmentStorageService {
  constructor(private readonly storage: StorageService) {}

  async uploadAttachment(
    ticketId: string,
    fileName: string,
    contentType: string,
    body: Buffer,
  ): Promise<UploadResult> {
    const key = `attachments/${ticketId}/${Date.now()}-${fileName}`;
    return this.storage.upload({ key, contentType, body });
  }
}

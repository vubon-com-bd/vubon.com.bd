import { Injectable, Logger } from '@nestjs/common';

export interface StoredFile {
  readonly key: string;
  readonly url: string;
  readonly sizeBytes: number;
  readonly contentType: string;
}

@Injectable()
export class ReportStorageService {
  private readonly logger = new Logger(ReportStorageService.name);
  private readonly store = new Map<string, { content: string; contentType: string }>();

  async put(
    key: string,
    content: string,
    contentType = 'application/json',
  ): Promise<StoredFile> {
    this.store.set(key, { content, contentType });
    this.logger.debug(`Stored file: ${key} (${content.length} bytes)`);
    return {
      key,
      url: `storage://reports/${key}`,
      sizeBytes: content.length,
      contentType,
    };
  }

  async get(key: string): Promise<string | null> {
    return this.store.get(key)?.content ?? null;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

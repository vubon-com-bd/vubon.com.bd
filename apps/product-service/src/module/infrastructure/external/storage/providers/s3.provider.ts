import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Provider {
  async upload(path: string): Promise<string> {
    return `s3://bucket/${path}`;
  }

  async delete(_path: string): Promise<void> {
    void _path;
  }
}

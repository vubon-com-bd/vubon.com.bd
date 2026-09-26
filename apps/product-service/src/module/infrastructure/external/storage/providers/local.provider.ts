import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalProvider {
  async upload(path: string): Promise<string> {
    return `/uploads/${path}`;
  }

  async delete(_path: string): Promise<void> {
    void _path;
  }
}

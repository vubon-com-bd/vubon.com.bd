import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageOptimizerService {
  async optimize(url: string): Promise<string> {
    return url;
  }

  async resize(url: string, _width: number, _height: number): Promise<string> {
    void _width;
    void _height;
    return url;
  }
}

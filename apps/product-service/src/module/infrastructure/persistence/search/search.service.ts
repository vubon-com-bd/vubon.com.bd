import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  async index(_id: string, _document: unknown): Promise<void> {
    void _id;
    void _document;
  }

  async search<T>(_term: string): Promise<readonly T[]> {
    void _term;
    return [];
  }

  async remove(_id: string): Promise<void> {
    void _id;
  }
}

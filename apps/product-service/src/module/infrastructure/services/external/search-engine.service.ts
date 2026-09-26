import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchEngineService {
  async index(_indexName: string, _id: string, _document: unknown): Promise<void> {
    void _indexName;
    void _id;
    void _document;
  }

  async search<T>(_indexName: string, _term: string): Promise<readonly T[]> {
    void _indexName;
    void _term;
    return [];
  }

  async remove(_indexName: string, _id: string): Promise<void> {
    void _indexName;
    void _id;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

@Injectable()
export class SearchClient {
  private readonly logger = new Logger(SearchClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('SEARCH_SERVICE_URL', 'http://localhost:3006'),
      timeout: getOptionalEnvInt('SEARCH_SERVICE_TIMEOUT_MS', 3000),
    });
  }

  async indexDocument(documentId: string, payload: Record<string, unknown>): Promise<void> {
    try {
      await this.http.post(`/search/index`, { documentId, payload });
    } catch (error) {
      this.logger.warn(`Search index failed for ${documentId}`, error);
    }
  }

  async deleteDocument(documentId: string): Promise<void> {
    try {
      await this.http.delete(`/search/index/${documentId}`);
    } catch (error) {
      this.logger.warn(`Search delete failed for ${documentId}`, error);
    }
  }
}

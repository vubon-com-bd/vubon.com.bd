import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class FeastProvider {
  private readonly logger = new Logger(FeastProvider.name);
  private readonly feastUrl = getOptionalEnv('FEAST_URL', 'http://localhost:6566');

  async getOnlineFeatures(entityId: string, featureNames: readonly string[]): Promise<Readonly<Record<string, unknown>>> {
    this.logger.log(`Feast online fetch: ${entityId}`);
    void this.feastUrl;
    const result: Record<string, unknown> = {};
    for (const name of featureNames) result[name] = null;
    return result;
  }

  async pushFeatures(entityId: string, features: Readonly<Record<string, unknown>>): Promise<void> {
    this.logger.log(`Feast push: ${entityId} (${Object.keys(features).length} features)`);
  }
}

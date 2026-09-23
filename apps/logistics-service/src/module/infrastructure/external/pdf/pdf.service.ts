import { Injectable, Logger } from '@nestjs/common';

export interface LabelData {
  readonly trackingNumber: string;
  readonly recipientName: string;
  readonly recipientAddress: string;
  readonly recipientPhone: string;
  readonly weightKg: number;
}

export interface ManifestData {
  readonly courierId: string;
  readonly shipmentIds: readonly string[];
  readonly generatedAt: string;
}

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async generateLabel(data: LabelData): Promise<Buffer> {
    this.logger.log(`Generating label for ${data.trackingNumber}`);
    return Buffer.from(`LABEL:${data.trackingNumber}`);
  }

  async generateManifest(data: ManifestData): Promise<Buffer> {
    this.logger.log(`Generating manifest with ${data.shipmentIds.length} shipments`);
    return Buffer.from(`MANIFEST:${data.courierId}`);
  }
}

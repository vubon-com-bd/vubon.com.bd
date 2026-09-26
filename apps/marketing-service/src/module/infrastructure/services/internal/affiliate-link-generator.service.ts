import { Injectable } from '@nestjs/common';

const BASE_URL = 'https://vubon.com.bd/ref';

@Injectable()
export class AffiliateLinkGeneratorService {
  generate(affiliateId: string, productId?: string): string {
    const base = `${BASE_URL}/${affiliateId}`;
    return productId ? `${base}/${productId}` : base;
  }
}

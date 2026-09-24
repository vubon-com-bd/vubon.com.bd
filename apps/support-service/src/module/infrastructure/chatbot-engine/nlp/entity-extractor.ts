import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityExtractor {
  extract(text: string): Readonly<Record<string, string>> {
    const entities: Record<string, string> = {};

    const orderMatch = text.match(/(?:order|অর্ডার)[\s#-]*([A-Z0-9-]+)/i);
    if (orderMatch?.[1]) entities.orderId = orderMatch[1];

    const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    if (emailMatch?.[0]) entities.email = emailMatch[0];

    const phoneMatch = text.match(/(?:\+?88)?01[3-9]\d{8}/);
    if (phoneMatch?.[0]) entities.phone = phoneMatch[0];

    return entities;
  }
}

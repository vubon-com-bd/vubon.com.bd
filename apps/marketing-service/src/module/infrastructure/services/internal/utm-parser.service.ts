import { Injectable } from '@nestjs/common';

export interface UtmParams {
  readonly source?: string;
  readonly medium?: string;
  readonly campaign?: string;
  readonly term?: string;
  readonly content?: string;
}

@Injectable()
export class UtmParserService {
  parse(queryString: string): UtmParams {
    const params = new URLSearchParams(queryString);
    return {
      source: params.get('utm_source') ?? undefined,
      medium: params.get('utm_medium') ?? undefined,
      campaign: params.get('utm_campaign') ?? undefined,
      term: params.get('utm_term') ?? undefined,
      content: params.get('utm_content') ?? undefined,
    };
  }

  build(params: UtmParams): string {
    const search = new URLSearchParams();
    if (params.source) search.set('utm_source', params.source);
    if (params.medium) search.set('utm_medium', params.medium);
    if (params.campaign) search.set('utm_campaign', params.campaign);
    if (params.term) search.set('utm_term', params.term);
    if (params.content) search.set('utm_content', params.content);
    return search.toString();
  }
}

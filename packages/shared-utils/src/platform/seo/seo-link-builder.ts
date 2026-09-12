export interface SEOLinkData {
  linkId: string;
  seoId: string;
  type: string;
  url: string;
  anchor: string;
  rel: string;
  isActive: boolean;
  isFollow: boolean;
  isNoFollow: boolean;
  metadata: Record<string, unknown>;
}

export const buildSEOInternalLink = (text: string, url: string): SEOLinkData => {
  return {
    linkId: crypto.randomUUID(),
    seoId: '',
    type: 'internal',
    url,
    anchor: text,
    rel: 'dofollow',
    isActive: true,
    isFollow: true,
    isNoFollow: false,
    metadata: {},
  };
};

export const buildSEOExternalLink = (
  text: string,
  url: string,
  rel: string = 'nofollow'
): SEOLinkData => {
  return {
    linkId: crypto.randomUUID(),
    seoId: '',
    type: 'external',
    url,
    anchor: text,
    rel,
    isActive: true,
    isFollow: rel === 'dofollow',
    isNoFollow: rel === 'nofollow',
    metadata: {},
  };
};

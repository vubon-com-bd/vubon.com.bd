export interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots: string;
}

export class SEOMetaBuilder {
  private title = '';
  private description = '';
  private keywords: string[] = [];
  private canonicalUrl = '';
  private noindex = false;
  private nofollow = false;

  setTitle(title: string): this {
    this.title = title.slice(0, 60);
    return this;
  }

  setDescription(description: string): this {
    this.description = description.slice(0, 160);
    return this;
  }

  setKeywords(keywords: string[]): this {
    this.keywords = keywords.slice(0, 10);
    return this;
  }

  setCanonicalUrl(url: string): this {
    this.canonicalUrl = url;
    return this;
  }

  setNoindex(noindex: boolean): this {
    this.noindex = noindex;
    return this;
  }

  setNofollow(nofollow: boolean): this {
    this.nofollow = nofollow;
    return this;
  }

  build(): SEOMetaData {
    const robots: string[] = [];
    if (this.noindex) robots.push('noindex');
    if (this.nofollow) robots.push('nofollow');
    return {
      title: this.title,
      description: this.description,
      keywords: this.keywords,
      canonical: this.canonicalUrl,
      robots: robots.join(', ') || 'index, follow',
    };
  }
}

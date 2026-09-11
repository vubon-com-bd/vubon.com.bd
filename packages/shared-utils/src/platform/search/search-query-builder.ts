export class SearchQueryBuilder {
  private query = '';
  private operators: string[] = [];
  private phrases: string[] = [];
  private wildcards: string[] = [];
  private fuzzyTerms: string[] = [];

  addTerm(term: string): this {
    this.query += ` ${term}`;
    return this;
  }

  addPhrase(phrase: string): this {
    this.phrases.push(`"${phrase}"`);
    return this;
  }

  addWildcard(pattern: string): this {
    this.wildcards.push(pattern);
    return this;
  }

  addFuzzyTerm(term: string): this {
    this.fuzzyTerms.push(`${term}~`);
    return this;
  }

  and(): this {
    this.operators.push('AND');
    return this;
  }

  or(): this {
    this.operators.push('OR');
    return this;
  }

  not(): this {
    this.operators.push('NOT');
    return this;
  }

  build(): string {
    const parts = [
      this.query.trim(),
      ...this.phrases,
      ...this.wildcards.map((w) => `${w}*`),
      ...this.fuzzyTerms,
    ];
    return parts.filter(Boolean).join(' ');
  }
}

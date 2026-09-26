import { SearchResponseDTO, SearchMatchResponseDTO } from '../dtos/responses/search.response.dto';

export interface AppSearchDTO {
  readonly query: string;
  readonly matches: readonly {
    readonly documentId: string;
    readonly score: number;
    readonly snippet: string | null;
  }[];
  readonly totalHits: number;
  readonly tookMs: number;
}

export class SearchControllerMapper {
  static toResponse(dto: AppSearchDTO): SearchResponseDTO {
    return {
      query: dto.query,
      matches: dto.matches.map<SearchMatchResponseDTO>((m) => ({
        documentId: m.documentId,
        score: m.score,
        snippet: m.snippet,
      })),
      totalHits: dto.totalHits,
      tookMs: dto.tookMs,
    };
  }
}

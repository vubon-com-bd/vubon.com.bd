import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchResponseDTO } from '../dtos/responses/search.response.dto';

export const SearchSwagger = {
  Semantic: () =>
    applyDecorators(
      ApiOperation({ summary: 'Semantic search across documents' }),
      ApiResponse({ status: 200, type: SearchResponseDTO }),
    ),
  Autocomplete: () =>
    applyDecorators(
      ApiOperation({ summary: 'Autocomplete search prefix' }),
      ApiResponse({ status: 200, description: 'List of suggestions' }),
    ),
};

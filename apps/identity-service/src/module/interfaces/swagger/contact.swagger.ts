import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ContactHttpResponseDTO } from '../dtos/responses/contact.response.dto.js';

export const ApiContactTag = (): MethodDecorator & ClassDecorator => ApiTags('contact');

export function ApiAddContact(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Add contact' }),
    ApiResponse({ status: HttpStatus.CREATED, type: ContactHttpResponseDTO }),
  );
}

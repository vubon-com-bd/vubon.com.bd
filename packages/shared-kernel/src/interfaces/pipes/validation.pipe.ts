/**
 * Validation Pipe
 * @module shared-kernel/interfaces/pipes
 */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { HTTP_STATUS, ERROR_CODE } from '@vubon/shared-constants/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    if (value === undefined || value === null) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: 'Value is required',
      });
    }
    return value;
  }
}

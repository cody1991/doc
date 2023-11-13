import {
  PipeTransform,
  ArgumentMetadata,
  BadGatewayException,
} from '@nestjs/common';

import { ZodObject, z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadGatewayException('Validation failed');
    }
    return value;
  }
}

import { Injectable } from '@nestjs/common';
import { ValidateFunction } from 'ajv';
import { GenericValidator } from '../../validation/providers/generic.validator';
import { JsonSchemaService } from '../../validation/providers/json-schema.service';
import { IValidator } from '../interfaces/validator.interface';
import { SafeList } from './entities/safe-list.entity';
import { safeListSchema } from './entities/schemas/safe-list.schema';

@Injectable()
export class SafeListValidator implements IValidator<SafeList> {
  private readonly isValidSafesList: ValidateFunction<SafeList>;

  constructor(
    private readonly genericValidator: GenericValidator,
    private readonly jsonSchemaService: JsonSchemaService,
  ) {
    this.isValidSafesList = this.jsonSchemaService.getSchema(
      'https://safe-client.safe.global/schemas/safe/safe-list.json',
      safeListSchema,
    );
  }

  validate(data: unknown): SafeList {
    return this.genericValidator.validate(this.isValidSafesList, data);
  }
}

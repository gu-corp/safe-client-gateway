import { faker } from '@faker-js/faker';
import { HttpException } from '@nestjs/common';
import { JsonSchemaService } from '../schema/json-schema.service';
import { ValidationErrorFactory } from '../schema/validation-error-factory';
import backboneFactory from '../balances/entities/__tests__/backbone.factory';
import { ITransactionApi } from '../interfaces/transaction-api.interface';
import { ITransactionApiManager } from '../interfaces/transaction-api.manager.interface';
import { BackboneRepository } from './backbone.repository';
import { Backbone } from './entities/backbone.entity';

const BACKBONE: Backbone = backboneFactory();

const transactionApi = {
  getBackbone: jest.fn().mockResolvedValue(BACKBONE),
} as unknown as ITransactionApi;

const transactionApiManager = {
  getTransactionApi: jest.fn(),
} as unknown as ITransactionApiManager;

const validationErrorFactory = {
  from: jest.fn(),
} as unknown as ValidationErrorFactory;

const validationFunction = jest.fn();
validationFunction.mockImplementation(() => true);

const jsonSchemaService = {
  addSchema: jest.fn(),
  compile: jest.fn().mockImplementation(() => validationFunction),
} as unknown as JsonSchemaService;

const mockTransactionApiManager = jest.mocked(transactionApiManager);
const mockValidationErrorFactory = jest.mocked(validationErrorFactory);
const mockJsonSchemaService = jest.mocked(jsonSchemaService);

describe('Backbone Repository', () => {
  const repository = new BackboneRepository(
    mockTransactionApiManager,
    mockValidationErrorFactory,
    mockJsonSchemaService,
  );

  it('should return the data coming from the TransactionAPI', async () => {
    mockTransactionApiManager.getTransactionApi.mockResolvedValue(
      transactionApi,
    );
    mockValidationErrorFactory.from.mockReturnValue(
      new HttpException('testErr', 500),
    );

    const data = await repository.getBackbone(faker.random.word());

    expect(data).toBe(BACKBONE);
  });

  it('should throw a validation error when validation fails', async () => {
    mockTransactionApiManager.getTransactionApi.mockResolvedValue(
      transactionApi,
    );
    mockValidationErrorFactory.from.mockReturnValue(
      new HttpException('testErr', 500),
    );
    validationFunction.mockImplementationOnce(() => false);

    await expect(repository.getBackbone(faker.random.word())).rejects.toThrow();

    expect(mockValidationErrorFactory.from).toHaveBeenCalledTimes(1);
  });
});
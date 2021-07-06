import { Test, TestingModule } from '@nestjs/testing';
import { CsvCheckController } from './csv-check.controller';

describe('CsvCheckController', () => {
  let controller: CsvCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvCheckController],
    }).compile();

    controller = module.get<CsvCheckController>(CsvCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

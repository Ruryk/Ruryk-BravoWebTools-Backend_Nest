import { Test, TestingModule } from '@nestjs/testing';
import { CsvCheckService } from './csv-check.service';

describe('CsvCheckService', () => {
  let service: CsvCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvCheckService],
    }).compile();

    service = module.get<CsvCheckService>(CsvCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MimoService } from './mimo.service';

describe('MimoService', () => {
  let service: MimoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MimoService],
    }).compile();

    service = module.get<MimoService>(MimoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

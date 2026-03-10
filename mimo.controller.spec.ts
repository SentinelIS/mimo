import { Test, TestingModule } from '@nestjs/testing';
import { MimoController } from './mimo.controller';

describe('MimoController', () => {
  let controller: MimoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MimoController],
    }).compile();

    controller = module.get<MimoController>(MimoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

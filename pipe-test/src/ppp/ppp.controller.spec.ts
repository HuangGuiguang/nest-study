import { Test, TestingModule } from '@nestjs/testing';
import { PppController } from './ppp.controller';
import { PppService } from './ppp.service';

describe('PppController', () => {
  let controller: PppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PppController],
      providers: [PppService],
    }).compile();

    controller = module.get<PppController>(PppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

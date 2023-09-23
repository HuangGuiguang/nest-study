import { Test, TestingModule } from '@nestjs/testing';
import { PppService } from './ppp.service';

describe('PppService', () => {
  let service: PppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PppService],
    }).compile();

    service = module.get<PppService>(PppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

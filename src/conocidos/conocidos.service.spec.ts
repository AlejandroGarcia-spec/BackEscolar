import { Test, TestingModule } from '@nestjs/testing';
import { ConocidosService } from './conocidos.service';

describe('ConocidosService', () => {
  let service: ConocidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConocidosService],
    }).compile();

    service = module.get<ConocidosService>(ConocidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

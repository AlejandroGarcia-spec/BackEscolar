import { Test, TestingModule } from '@nestjs/testing';
import { ConocidosController } from './conocidos.controller';
import { ConocidosService } from './conocidos.service';

describe('ConocidosController', () => {
  let controller: ConocidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConocidosController],
      providers: [ConocidosService],
    }).compile();

    controller = module.get<ConocidosController>(ConocidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

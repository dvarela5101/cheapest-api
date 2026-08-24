import { Test, TestingModule } from '@nestjs/testing';
import { TiendaRepository } from '../repositories';
import { TiendaService } from './tienda.service';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: jest.Mocked<TiendaRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TiendaService,
        {
          provide: TiendaRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get(TiendaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO: describe('create', ...)
  // TODO: describe('findAll', ...)
  // TODO: describe('findById', ...)
  // TODO: describe('update', ...)
  // TODO: describe('delete', ...)
});

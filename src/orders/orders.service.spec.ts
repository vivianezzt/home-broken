import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './orders.service';

describe('OrdesService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderModel',
          useValue: {}, // mock value for OrderModel
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

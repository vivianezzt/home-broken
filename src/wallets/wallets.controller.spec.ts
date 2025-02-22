import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

describe('WalletsController', () => {
  let controller: WalletsController;
  let service: WalletsService;

  const mockWalletsService = {
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    createWalletAsset: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        {
          provide: WalletsService,
          useValue: mockWalletsService,
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call walletsService.create with correct data', async () => {
      const createWalletDto = { name: 'Test Wallet', symbol: 'TST', price: 100, image: 'test-image-url' };
      await controller.create(createWalletDto);
      expect(service.create).toHaveBeenCalledWith(createWalletDto);
    });
  });

  describe('findAll', () => {
    it('should call walletsService.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call walletsService.findOne with correct id', async () => {
      const id = '123';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('createWalletAsset', () => {
    it('should call walletsService.createWalletAsset with correct data', async () => {
      const id = '123';
      const body = { assetId: '456', shares: 10 };
      await controller.createWalletAsset(id, body);
      expect(service.createWalletAsset).toHaveBeenCalledWith({
        asset: body.assetId,
        shares: body.shares,
        wallet: id,
      });
    });
  });
});
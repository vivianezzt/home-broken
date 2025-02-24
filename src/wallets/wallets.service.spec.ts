import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { WalletAsset } from './entities/wallet-assets.entity';

describe('WalletsService', () => {
  let service: WalletsService;
  let walletModel: any;
  let walletAssetModel: any;

  const mockWalletModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({}),
    }),
    updateOne: jest.fn(),
  };

  const mockWalletAssetModel = {
    create: jest.fn().mockImplementation((docs) => Promise.resolve(docs)),
  };

  beforeEach(async () => {
    const mockConnection = {
      startSession: jest.fn().mockResolvedValue({
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletModel,
        },
        {
          provide: getModelToken(WalletAsset.name),
          useValue: mockWalletAssetModel,
        },
        {
          provide: 'DatabaseConnection',
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    walletModel = module.get(getModelToken(Wallet.name));
    walletAssetModel = module.get(getModelToken(WalletAsset.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a wallet', async () => {
      const createWalletDto = {};
      await service.create(createWalletDto);
      expect(walletModel.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all wallets', async () => {
      await service.findAll();
      expect(walletModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a wallet by id', async () => {
      const id = '123';
      await service.findOne(id);
      expect(walletModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('createWalletAsset', () => {
    it('should create a wallet asset', async () => {
      const data = { walletId: '123', assetId: '456', shares: 10 };
      await service.createWalletAsset(data);
      expect(walletAssetModel.create).toHaveBeenCalled();
      expect(walletModel.updateOne).toHaveBeenCalled();
    });
  });
});